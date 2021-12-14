"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause current song!');
const execute = async (interaction) => {
    const guildQueue = interaction.client.player.getQueue(interaction.guildId || '');
    const song = guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.nowPlaying;
    if (song) {
        guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.setPaused(true);
        await interaction.reply(`\`${song === null || song === void 0 ? void 0 : song.name}\` paused.`);
    }
    else {
        await interaction.reply('Queue is empty.');
    }
};
exports.execute = execute;
