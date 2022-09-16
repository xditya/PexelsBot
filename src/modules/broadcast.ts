/*
By Aditya < https://xditya.me >
*/

import { getUsers, removeUser } from "../database/users_db.ts";
import { Composer } from "grammy/mod.ts";

const composer = new Composer();

composer
  .filter((ctx) => ctx.from?.id === 719195224)
  .chatType("private")
  .command("broadcast", async (ctx) => {
    if (!ctx.match) {
      return await ctx.reply("Please use `/broadcast <a message here>`.", {
        parse_mode: "Markdown",
      });
    }
    const users = await getUsers();
    const stat = await ctx.reply(
      `Please wait, broadcasting to ${users.length} users...`,
    );
    let f = 0, blocked = 0;
    for (const user of users) {
      try {
        await ctx.api.sendMessage(user, ctx.match);
      } catch (error) {
        if (error.error_code == 403 || error.error_code == 400) {
          blocked++;
          f++;
          await removeUser(user);
        } else {
          console.log(
            `Broadcast to ${user} threw error : ${error.description}`,
          );
          f++;
        }
      }
    }
    await ctx.api.editMessageText(
      ctx.chat.id,
      stat.message_id,
      `Broadcasted to ${
        users.length - f
      } users.\nFailed for ${f} users.\n${blocked} users blocked the bot.`,
    );
  });

export default composer;
