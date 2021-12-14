"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('progress')
    .setDescription('Shows progress bar!');
const execute = async (interaction) => {
    const guildQueue = interaction.client.player.getQueue(interaction.guildId || '');
    const baseEmbed = new discord_js_1.MessageEmbed()
        .setColor('#0099ff')
        .setTitle((guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.createProgressBar().prettier) || '')
        .setThumbnail('https://c.tenor.com/Sq_ZkjCNM1AAAAAd/catjam.gif')
        .setAuthor('Progress');
    await interaction.reply({ embeds: [baseEmbed] });
};
exports.execute = execute;
