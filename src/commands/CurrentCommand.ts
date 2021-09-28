import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('current')
    .setDescription('Return current song!');

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    const guildQueue = (interaction.client as Bot).player.getGuildQueue(
        interaction,
    );
    const nowPlaying = guildQueue?.nowPlaying;

    if (nowPlaying) {
        const { baseEmbed } = nowPlaying.data;

        baseEmbed.setDescription(
            guildQueue?.createProgressBar().prettier || '',
        );
        baseEmbed.setAuthor('Now playing');
        interaction.reply({ embeds: [baseEmbed] });
    } else {
        interaction.reply('Queue is empty.');
    }
};
