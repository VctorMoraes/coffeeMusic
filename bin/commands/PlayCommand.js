"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('play')
    .setDescription('Adds a song to queue!')
    .addStringOption(option => option
    .setName('song')
    .setDescription('Song to be added (name / link)')
    .setRequired(true));
const execute = async (interaction) => {
    await interaction.deferReply();
    const request = interaction.options.getString('song');
    const bot = interaction.client;
    await bot.player.play(request || '', interaction);
};
exports.execute = execute;
