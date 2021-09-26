import { SlashCommandBuilder } from '@discordjs/builders';
import {
    CommandInteraction,
    GuildMember,
    User,
    MessageEmbed,
} from 'discord.js';
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
    const queue = bot.player.createQueue(interaction.guildId || '');

    await queue.join((interaction.member as GuildMember).voice.channel || '');

    const song = await queue.play(request || '');

    const user = interaction.member?.user as User;
    const baseEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(song.name)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .setTimestamp(new Date())
        .setFooter(
            `Requested by ${user.username}`,
            user.avatarURL() || user.defaultAvatarURL,
        );

    song.setData({
        interaction,
        baseEmbed,
    });

    baseEmbed.setAuthor('Added to queue');
    interaction.editReply({ embeds: [baseEmbed] });
};
