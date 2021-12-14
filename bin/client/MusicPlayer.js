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
const discord_music_player_1 = require("discord-music-player");
const discord_js_1 = require("discord.js");
const glob_1 = __importDefault(require("glob"));
const util_1 = require("util");
const globPromise = (0, util_1.promisify)(glob_1.default);
class MusicPlayer extends discord_music_player_1.Player {
    constructor(client, options) {
        super(client, options);
        this.playerEvents = new discord_js_1.Collection();
        this.setupPlaylist = async (playlist, interaction) => {
            console.log(interaction);
            // TODO: Fix interaction
            return playlist;
        };
        this.registerPlayerEvents();
    }
    async registerPlayerEvents() {
        const eventFiles = await globPromise(`${__dirname}/../events/player/**/*{.ts,.js}`);
        eventFiles.forEach(async (filepath) => {
            const event = await Promise.resolve().then(() => __importStar(require(filepath)));
            this.playerEvents.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }
    getGuildQueue(interaction) {
        return this.getQueue(interaction.guildId || '');
    }
    async play(request, interaction) {
        var _a;
        const queue = this.createQueue(interaction.guildId || '');
        await queue.join(interaction.member.voice.channel || '');
        if (request.includes('/playlist?list=')) {
            this.setupPlaylist(await queue.playlist(request), interaction);
        }
        const user = (_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user;
        const baseEmbed = new discord_js_1.MessageEmbed()
            .setColor('#000000')
            .setTimestamp(new Date())
            .setFooter(`Requested by ${user.username}`, user.avatarURL() || user.defaultAvatarURL);
        await queue
            .play(request)
            .then(song => {
            baseEmbed
                .setTitle(song.name)
                .setURL(song.url)
                .setThumbnail(song.thumbnail);
            song.setData({
                interaction,
                baseEmbed,
            });
            baseEmbed.setAuthor('Added to queue');
        })
            .catch(() => {
            baseEmbed.setAuthor('Song not found');
        });
        interaction.editReply({ embeds: [baseEmbed] });
        return interaction;
    }
}
exports.default = MusicPlayer;
