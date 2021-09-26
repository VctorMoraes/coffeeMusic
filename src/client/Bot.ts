import { glob } from 'glob';
import { Client, Collection, Intents } from 'discord.js';
import { promisify } from 'util';
import { Player, PlayerEvents } from 'discord-music-player';
import { Command } from '../contracts/Command';
import { BotEvent, PlayerEvent } from '../contracts/Event';

const globPromise = promisify(glob);

export default class Bot extends Client {
    public events = new Collection<string, BotEvent>();

    public commands = new Collection<string, Command>();

    public player: Player = new Player(this);

    public playerEvents = new Collection<string, PlayerEvent>();

    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES,
            ],
        });
    }

    public async start(): Promise<void> {
        const player = new Player(this, {
            leaveOnEmpty: false,
        });
        this.player = player;

        this.login(process.env.APP_TOKEN);

        await this.registerEvents();
        await this.registerPlayerEvents();
        await this.registerCommands();
    }

    private async registerEvents() {
        const eventFiles = await globPromise(
            `${__dirname}/../events/**/*{.ts,.js}`,
        );

        eventFiles.forEach(async (filepath: string) => {
            const event: BotEvent = await import(filepath);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }

    private async registerPlayerEvents() {
        const eventFiles = await globPromise(
            `${__dirname}/../events/player/**/*{.ts,.js}`,
        );

        eventFiles.forEach(async (filepath: string) => {
            const event: PlayerEvent = await import(filepath);
            this.playerEvents.set(event.name, event);
            this.player.on(
                event.name as keyof PlayerEvents,
                event.run.bind(null, this.player),
            );
        });
    }

    private async registerCommands() {
        const commandFiles = await globPromise(
            `${__dirname}/../commands/**/*{.ts,.js}`,
        );

        commandFiles.forEach(async (filepath: string) => {
            const command: Command = await import(filepath);
            this.commands.set(command.data.name, command);
        });
    }
}
