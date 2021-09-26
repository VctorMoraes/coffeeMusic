import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Bot from '../client/Bot';

export const data = new SlashCommandBuilder()
    .setName('seek')
    .setDescription('Goes to seconds duration on current song!')
    .addIntegerOption(option =>
        option.setName('seconds').setDescription('Seconds').setRequired(true),
    );

export const execute = async (
    interaction: CommandInteraction,
): Promise<void> => {
    const time = interaction.options.getInteger('seconds');
    const guildQueue = (interaction.client as Bot).player.getQueue(
        interaction.guildId || '',
    );

    guildQueue?.seek((time || 0) * 1000);

    await interaction.reply('sei la');
};
