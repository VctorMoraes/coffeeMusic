import { Player } from 'discord-music-player';
import Bot from '../client/Bot';

export interface RunFunction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (client: Bot, ...args: any): Promise<void>;
}

export interface BotEvent {
    name: string;
    run: RunFunction;
}

export interface RunPlayerFunction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (player: Player, ...args: any): Promise<void>;
}

export interface PlayerEvent {
    name: string;
    run: RunPlayerFunction;
}
