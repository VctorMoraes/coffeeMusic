"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear current queue!');
const execute = async (interaction) => {
    const guildQueue = interaction.client.player.getGuildQueue(interaction);
    if (guildQueue) {
        guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.clearQueue();
        await interaction.reply('Queue has been cleared.');
    }
    else {
        await interaction.reply('Queue is already empty.');
    }
};
exports.execute = execute;
