"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('queue')
    .setDescription('Show current queue!');
const execute = async (interaction) => {
    const guildQueue = interaction.client.player.getQueue(interaction.guildId || '');
    const songs = guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.songs.map(song => `${song.name}\n`);
    await interaction.reply(`${songs}`);
};
exports.execute = execute;
