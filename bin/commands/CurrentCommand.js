"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('current')
    .setDescription('Return current song!');
const execute = async (interaction) => {
    const guildQueue = interaction.client.player.getGuildQueue(interaction);
    const nowPlaying = guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.nowPlaying;
    if (nowPlaying) {
        const { baseEmbed } = nowPlaying.data;
        baseEmbed.setDescription((guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.createProgressBar().prettier) || '');
        baseEmbed.setAuthor('Now playing');
        interaction.reply({ embeds: [baseEmbed] });
    }
    else {
        interaction.reply('Queue is empty.');
    }
};
exports.execute = execute;
