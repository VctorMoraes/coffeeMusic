import { glob } from 'glob';
import { Client, Collection, Intents } from 'discord.js';
import { promisify } from 'util';
import { Command } from '../contracts/Command';
import { BotEvent } from '../contracts/Event';
import MusicPlayer from './MusicPlayer';

const globPromise = promisify(glob);

export default class Bot extends Client {
    public events = new Collection<string, BotEvent>();

    public commands = new Collection<string, Command>();

    public player: MusicPlayer = <MusicPlayer>{};

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
        this.player = new MusicPlayer(this, {
            timeout: 180000,
        });

        this.login(process.env.APP_TOKEN);

        await this.registerEvents();
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
