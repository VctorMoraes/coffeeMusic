import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume current song!');

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    const guildQueue = (interaction.client as Bot).player.getQueue(
        interaction.guildId || '',
    );
    const song = guildQueue?.nowPlaying;
    guildQueue?.setPaused(false);
    await interaction.reply(`\`${song?.name}\` resumed`);
};
