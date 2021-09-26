import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('current')
    .setDescription('Return current song!');

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    const guildQueue = (interaction.client as Bot).player.getQueue(
        interaction.guildId || '',
    );
    const { baseEmbed } = guildQueue?.nowPlaying.data;

    console.log(baseEmbed);

    baseEmbed.setAuthor('Now playing');
    interaction.reply({ embeds: [baseEmbed] });
};
