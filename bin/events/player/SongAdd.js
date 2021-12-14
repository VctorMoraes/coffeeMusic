"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const consola_1 = __importDefault(require("consola"));
const run = async (player, queue, song) => {
    consola_1.default.success(`${song.name} added to queue.`);
};
exports.run = run;
exports.name = 'songAdd';
