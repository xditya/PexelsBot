/*
By Aditya < https://xditya.me >
*/

import { Composer, InlineKeyboard } from "grammy";

const composer = new Composer();

composer.command("start", (ctx) => {
    ctx.reply(`Hello ${ctx.from!.first_name}!\nI am a [Pexels](https://pexels.com) Searcher Bot.\n\nUse me _inline_, by *clicking* the below _button_!`,
        {
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
                .switchInlineCurrent("Search Pexels", "").row()
                .url("Updates", "https://t.me/BotzHub")
                .url("Source", "https://github.com/xditya/PexelsBot")
        });
})

export default composer;