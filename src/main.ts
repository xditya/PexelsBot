import config from "./env.ts";
import modules from "./modules/mod.ts"

import { Bot, ErrorHandler } from "grammy";

import { connect } from "redis";

const error: ErrorHandler = (error) => {
  console.error("ERROR:\n", JSON.stringify({
    context: error.ctx,
    error,
  }));
};

console.log("Initialising...");

console.log("Connecting to Redis...");

export const db = await connect({
  hostname: config.redisUri.split(":")[0],
  port: Number(config.redisUri.split(":")[1]),
  password: config.redisPassword,
});

export const bot = new Bot(config.botToken);
bot.use(modules);
bot.catch(error);

const me = await bot.api.getMe();

console.log(`Started @${me.username}.\n(c) @xditya\n`);
