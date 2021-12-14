import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Adds a song to queue!')
    .addStringOption(option =>
        option
            .setName('song')
            .setDescription('Song to be added (name / link)')
            .setRequired(true),
    );

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    await interaction.deferReply();

    const request = interaction.options.getString('song');
    const bot = interaction.client as Bot;
    await bot.player.play(request || '', interaction);
};
