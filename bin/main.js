"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = __importDefault(require("./client/Bot"));
require("dotenv/config");
new Bot_1.default().start();
