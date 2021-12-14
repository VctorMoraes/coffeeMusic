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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const glob_1 = require("glob");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const util_1 = require("util");
const globPromise = (0, util_1.promisify)(glob_1.glob);
const loadCommands = async () => {
    const commandFiles = await globPromise(`${__dirname}/commands/**/*{.ts,.js}`);
    return Promise.all(commandFiles.map(async (filepath) => {
        const command = await Promise.resolve().then(() => __importStar(require(filepath)));
        return command.data.toJSON();
    }));
};
(async () => {
    const rest = new rest_1.REST({ version: '9' }).setToken(process.env.APP_TOKEN || '');
    rest.put(v9_1.Routes.applicationCommands(process.env.APP_CLIENT_ID || ''), {
        body: await loadCommands(),
    })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
})();
