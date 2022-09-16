/*
By Aditya < https://xditya.me >
*/

import { addUser } from "../database/users_db.ts";
import { Composer, InlineKeyboard } from "grammy/mod.ts";

const composer = new Composer();

composer.command("start", async (ctx) => {
  ctx.reply(
    `Hello ${
      ctx.from!.first_name
    }! I am a [Pexels](https://pexels.com) Searcher Bot.\n\nUse me _inline_, by *clicking* the below _button_!`,
    {
      reply_markup: new InlineKeyboard()
        .switchInlineCurrent("Search Pexels", "").row()
        .url("Updates", "https://t.me/BotzHub")
        .url("Source", "https://github.com/xditya/PexelsBot"),
    },
  );
  if (ctx.from) await addUser(ctx.from!.id);
});

export default composer;
