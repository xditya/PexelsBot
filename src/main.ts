import config from "./env.ts";
import modules from "./modules/mod.ts"

import { Bot, ErrorHandler } from "grammy";

const error: ErrorHandler = (error) => {
  console.error("ERROR:\n", JSON.stringify({
    context: error.ctx,
    error,
  }));
};

console.log("Initialising...");

const bot = new Bot(config.botToken);
bot.use(modules);
bot.catch(error);

const me = await bot.api.getMe();

console.log(`Started @${me.username}.\n(c) @xditya\n`);

export default bot;