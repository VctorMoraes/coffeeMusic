import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Show current queue!');

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    const guildQueue = (interaction.client as Bot).player.getQueue(
        interaction.guildId || '',
    );
    const songs = guildQueue?.songs.map(song => `${song.name}\n`);
    await interaction.reply(`${songs}`);
};
