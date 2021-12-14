"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');
const execute = async (interaction) => {
    await interaction.reply('Pong!');
};
exports.execute = execute;
