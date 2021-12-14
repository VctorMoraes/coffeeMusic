"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle queue!');
const execute = async (interaction) => {
    const guildQueue = interaction.client.player.getQueue(interaction.guildId || '');
    guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.shuffle();
    await interaction.reply('Queue shuffled.');
};
exports.execute = execute;
