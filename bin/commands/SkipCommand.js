"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip current song!');
const execute = async (interaction) => {
    const guildQueue = interaction.client.player.getQueue(interaction.guildId || '');
    const song = guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.skip();
    await interaction.reply(`\`${song === null || song === void 0 ? void 0 : song.name}\` skipped.`);
};
exports.execute = execute;
