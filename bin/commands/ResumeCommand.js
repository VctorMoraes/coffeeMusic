"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume current song!');
const execute = async (interaction) => {
    const guildQueue = interaction.client.player.getQueue(interaction.guildId || '');
    const song = guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.nowPlaying;
    guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.setPaused(false);
    await interaction.reply(`\`${song === null || song === void 0 ? void 0 : song.name}\` resumed`);
};
exports.execute = execute;
