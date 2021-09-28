import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('progress')
    .setDescription('Shows progress bar!');

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    const guildQueue = (interaction.client as Bot).player.getQueue(
        interaction.guildId || '',
    );
    const baseEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(guildQueue?.createProgressBar().prettier || '')
        .setThumbnail('https://c.tenor.com/Sq_ZkjCNM1AAAAAd/catjam.gif')
        .setAuthor('Progress');

    await interaction.reply({ embeds: [baseEmbed] });
};
