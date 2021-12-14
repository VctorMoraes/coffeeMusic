import {
    Player,
    PlayerEvents,
    PlayerOptions,
    Playlist,
    Queue,
} from 'discord-music-player';
import {
    Client,
    Collection,
    CommandInteraction,
    GuildMember,
    Interaction,
    MessageEmbed,
    User,
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import { PlayerEvent } from '../contracts/Event';

const globPromise = promisify(glob);

export default class MusicPlayer extends Player {
    public playerEvents = new Collection<string, PlayerEvent>();

    constructor(client: Client, options?: PlayerOptions) {
        super(client, options);
        this.registerPlayerEvents();
    }

    private async registerPlayerEvents() {
        const eventFiles = await globPromise(
            `${__dirname}/../events/player/**/*{.ts,.js}`,
        );

        eventFiles.forEach(async (filepath: string) => {
            const event: PlayerEvent = await import(filepath);
            this.playerEvents.set(event.name, event);
            this.on(
                event.name as keyof PlayerEvents,
                event.run.bind(null, this),
            );
        });
    }

    public getGuildQueue(interaction: Interaction): Queue | undefined {
        return this.getQueue(interaction.guildId || '');
    }

    public async play(
        request: string,
        interaction: CommandInteraction,
    ): Promise<CommandInteraction> {
        const queue = this.createQueue(interaction.guildId || '');
        await queue.join(
            (interaction.member as GuildMember).voice.channel || '',
        );

        if (request.includes('/playlist?list=')) {
            this.setupPlaylist(await queue.playlist(request), interaction);
        }
        const user = interaction.member?.user as User;
        const baseEmbed = new MessageEmbed()
            .setColor('#000000')
            .setTimestamp(new Date())
            .setFooter(
                `Requested by ${user.username}`,
                user.avatarURL() || user.defaultAvatarURL,
            );

        await queue
            .play(request)
            .then(song => {
                baseEmbed
                    .setTitle(song.name)
                    .setURL(song.url)
                    .setThumbnail(song.thumbnail);

                song.setData({
                    interaction,
                    baseEmbed,
                });

                baseEmbed.setAuthor('Added to queue');
            })
            .catch(() => {
                baseEmbed.setAuthor('Song not found');
            });
        interaction.editReply({ embeds: [baseEmbed] });
        return interaction;
    }

    private setupPlaylist = async (
        playlist: Playlist,
        interaction: Interaction,
    ): Promise<Playlist> => {
        console.log(interaction);
        // TODO: Fix interaction
        return playlist;
    };
}
