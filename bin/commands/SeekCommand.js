"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('seek')
    .setDescription('Goes to seconds duration on current song!')
    .addIntegerOption(option => option.setName('seconds').setDescription('Seconds').setRequired(true));
const execute = async (interaction) => {
    const time = interaction.options.getInteger('seconds');
    const guildQueue = interaction.client.player.getQueue(interaction.guildId || '');
    // TODO: Fix reply
    guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.seek((time || 0) * 1000);
    await interaction.reply(`${guildQueue === null || guildQueue === void 0 ? void 0 : guildQueue.createProgressBar().prettier}`);
};
exports.execute = execute;
