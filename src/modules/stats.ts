/*
By Aditya < https://xditya.me >
*/

import { getUsers } from "../database/users_db.ts";
import { Composer } from "grammy/mod.ts";

const composer = new Composer();

composer
  .filter((ctx) => ctx.from?.id === 719195224)
  .chatType("private")
  .command("stats", async (ctx) => {
    const users = await getUsers();
    await ctx.reply(`Total Users: ${users.length}`);
  });

export default composer;
