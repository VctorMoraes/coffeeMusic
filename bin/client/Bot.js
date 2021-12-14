"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const MusicPlayer_1 = __importDefault(require("./MusicPlayer"));
const globPromise = (0, util_1.promisify)(glob_1.glob);
class Bot extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.Intents.FLAGS.GUILDS,
                discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
                discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES,
            ],
        });
        this.events = new discord_js_1.Collection();
        this.commands = new discord_js_1.Collection();
        this.player = {};
    }
    async start() {
        this.player = new MusicPlayer_1.default(this, {
            timeout: 30000,
        });
        this.login(process.env.APP_TOKEN);
        await this.registerEvents();
        await this.registerCommands();
    }
    async registerEvents() {
        const eventFiles = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
        eventFiles.forEach(async (filepath) => {
            const event = await Promise.resolve().then(() => __importStar(require(filepath)));
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }
    async registerCommands() {
        const commandFiles = await globPromise(`${__dirname}/../commands/**/*{.ts,.js}`);
        commandFiles.forEach(async (filepath) => {
            const command = await Promise.resolve().then(() => __importStar(require(filepath)));
            this.commands.set(command.data.name, command);
        });
    }
}
exports.default = Bot;
