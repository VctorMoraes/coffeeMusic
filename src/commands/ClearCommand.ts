import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear current queue!');

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    const guildQueue = (interaction.client as Bot).player.getGuildQueue(
        interaction,
    );

    if (guildQueue) {
        guildQueue?.clearQueue();
        await interaction.reply('Queue has been cleared.');
    } else {
        await interaction.reply('Queue is already empty.');
    }
};
