/*
By Aditya < https://xditya.me >
*/

import { addUser } from "../database/usersDb.ts";
import { Composer, InlineKeyboard } from "grammy";

const composer = new Composer();

composer.command("start", async(ctx) => {
    ctx.reply(`Hello ${ctx.from!.first_name}!\nI am a [Pexels](https://pexels.com) Searcher Bot.\n\nUse me _inline_, by *clicking* the below _button_!`,
        {
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
                .switchInlineCurrent("Search Pexels", "").row()
                .url("Updates", "https://t.me/BotzHub")
                .url("Source", "https://github.com/xditya/PexelsBot")
        });
    await addUser(ctx.from!.id);
})

export default composer;