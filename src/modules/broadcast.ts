/*
By Aditya < https://xditya.me >
*/

import { getUsers } from "../database/usersDb.ts";
import { Composer } from "grammy";

const composer = new Composer();

composer.command("broadcast", async (ctx) => {
    if (ctx.chat?.type != "private" && ctx.from?.id != 719195224)
        return;
    if (!ctx.match)
        return await ctx.reply("Please use `/broadcast <a message here>`.", {parse_mode: "Markdown"});
    const stat = await ctx.reply("Please wait, broadcasting...")
    const users = await getUsers();
    let f = 0;
    for (const user of users)
        try {
            await ctx.api.sendMessage(user, ctx.match);
        } catch (error) {
            console.log(error);
            f++;
        }
    await ctx.api.editMessageText(
        ctx.chat.id,
        stat.message_id,
        `Broadcasted to ${users.length - f} users.\nFailed for ${f} users.`,
    );
});

export default composer;