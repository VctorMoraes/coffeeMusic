import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause current song!');

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    const guildQueue = (interaction.client as Bot).player.getQueue(
        interaction.guildId || '',
    );
    const song = guildQueue?.nowPlaying;

    if (song) {
        guildQueue?.setPaused(true);
        await interaction.reply(`\`${song?.name}\` paused.`);
    } else {
        await interaction.reply('Queue is empty.');
    }
};
