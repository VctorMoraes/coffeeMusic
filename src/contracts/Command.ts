import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export interface Command {
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction): Promise<void>;
}

export interface CommandJSON {
    name: string;
    description: string;
    options: unknown;
    default_permission: boolean | undefined;
}
