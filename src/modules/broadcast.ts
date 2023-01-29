// /*
// By Aditya < https://xditya.me >
// */

// import { getUsers, removeUser } from "../database/users_db.ts";
// import { Composer } from "grammy/mod.ts";

// import PQueue from "https://deno.land/x/p_queue@1.0.1/mod.ts";

// const queue = new PQueue({
//   concurrency: 1,
// });

// const composer = new Composer();

// composer
//   .filter((ctx) => ctx.from?.id === 719195224)
//   .chatType("private")
//   .command("broadcast", async (ctx) => {
//     if (!ctx.match) {
//       return await ctx.reply("Please use `/broadcast <a message here>`.", {
//         parse_mode: "Markdown",
//       });
//     }
//       console.log("yes")
//     const users = await getUsers();
//     const stat = await ctx.reply(
//       `Please wait, broadcasting to ${users.length} users...`,
//     );
//     let f = 0, blocked = 0;
//     await queue.add(async () => {
//       for (const user of users) {
//         try {
//           await ctx.api.sendMessage(user, ctx.match);
//         } catch (error) {
//           if (error.error_code == 403 || error.error_code == 400) {
//             blocked++;
//             f++;
//             await removeUser(user);
//           } else {
//             console.log(
//               `Broadcast to ${user} threw error : ${error.description}`,
//             );
//             f++;
//           }
//         }
//       }
//       await ctx.api.editMessageText(
//         ctx.chat.id,
//         stat.message_id,
//         `Broadcasted to ${
//           users.length - f
//         } users.\nFailed for ${f} users.\n${blocked} users blocked the bot.`,
//       );
//     });
//   });

// export default composer;

import { getUsers } from "../database/users_db.ts";
import { Composer } from "grammy/mod.ts";

import { delay } from "https://deno.land/std@0.121.0/async/delay.ts";

const composer = new Composer();

let isBroadcasting = false;

composer
  .filter((ctx) => ctx.from?.id === 719195224)
  .chatType("private")
  .command("broadcast", async (ctx) => {
    if (isBroadcasting == true) {
      return await ctx.reply("Already broadcasting.");
    }
    const text = ctx.message?.text.split(" ").slice(1).join(" ");
    if (!text) return await ctx.reply("Please provide a message to broadcast.");
    isBroadcasting = true;
    let done = 0;
    const reply = await ctx.reply("Please wait, in progress...");
    const users = await getUsers();
    for (const user of users) {
      try {
        await ctx.api.sendMessage(user, text);
        done++;
        await delay(1000);
      } catch (err) {
        console.log(`Failed to send message to ${user}. Error: ${err.message}`);
      }
    }
    await ctx.api.editMessageText(
      ctx.chat!.id,
      reply.message_id,
      "Broadcast complete. Sent to " + done + "/" + users.length + "users.",
    );
    isBroadcasting = false;
  });

export default composer;
