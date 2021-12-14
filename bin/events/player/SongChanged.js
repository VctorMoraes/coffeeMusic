"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const consola_1 = __importDefault(require("consola"));
const run = async (player, queue, newSong) => {
    var _a;
    const { interaction, baseEmbed } = newSong.data;
    baseEmbed.setAuthor('Now playing');
    (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({ embeds: [baseEmbed] });
    consola_1.default.success(`${newSong} is now playing.`);
};
exports.run = run;
exports.name = 'songChanged';
