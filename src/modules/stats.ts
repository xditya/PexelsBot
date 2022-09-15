/*
By Aditya < https://xditya.me >
*/

import { getUsers } from "../database/usersDb.ts";
import { Composer } from "grammy";

const composer = new Composer();

composer.command("stats", async (ctx) => {
    if (ctx.chat?.type != "private" && ctx.from?.id != 719195224)
        return;
    const users = await getUsers();
    await ctx.reply(`Total Users: ${users.length}`);
});

export default composer;