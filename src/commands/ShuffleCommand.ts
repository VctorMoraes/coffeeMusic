import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle queue!');

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    const guildQueue = (interaction.client as Bot).player.getQueue(
        interaction.guildId || '',
    );
    guildQueue?.shuffle();
    await interaction.reply('Queue shuffled.');
};
