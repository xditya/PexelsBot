import config from "./env.ts";
import modules from "./modules/mod.ts";

import { Bot, GrammyError, HttpError } from "grammy/mod.ts";
import {
  hydrateReply,
  parseMode,
} from "https://deno.land/x/grammy_parse_mode@1.4.0/mod.ts";
import type { ParseModeContext } from "https://deno.land/x/grammy_parse_mode@1.4.0/mod.ts";

console.log("Initialising...");

export const bot = new Bot<ParseModeContext>(config.BOT_TOKEN);
bot.use(modules);
bot.use(hydrateReply);

bot.api.config.use(parseMode("Markdown"));

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

await bot.init();
console.log(`\nStarted @${bot.botInfo.username}.\n(c) @xditya\n`);
