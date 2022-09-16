/*
By Aditya < https://xditya.me >
*/

import { Composer } from "grammy/mod.ts";
import { InlineQueryResultPhoto } from "grammy/types.ts";

import imageSearch from "../helpers/pexel.ts";

const composer = new Composer();

composer.on("inline_query", async (ctx) => {
  const query = ctx.inlineQuery.query;
  if (!query) {
    return await ctx.answerInlineQuery(
      [
        {
          type: "article",
          id: "null",
          title: "Pexel Search",
          input_message_content: {
            message_text:
              "Please enter a search query!\n\nJoin @BotzHub for more cool bots!",
          },
          description: "Enter a query to search!",
        },
      ],
      { cache_time: 30 * 60 },
    );
  }
  const res = await imageSearch(query);
  const pics = res?.photos;
  if (pics == undefined || pics.length == 0) {
    return await ctx.answerInlineQuery(
      [
        {
          type: "article",
          id: "Not Found",
          title: "Pexel Search - No Results!",
          input_message_content: {
            message_text:
              "Please enter a search query.\nJoin @BotzHub for more cool bots!",
          },
          description: "No results found!",
        },
      ],
    );
  }
  const results: InlineQueryResultPhoto[] = pics.map((pic) => ({
    type: "photo",
    id: pic.id.toString(),
    photo_url: pic.src.original,
    thumb_url: pic.src.tiny,
    caption:
      `Photo by [${pic.photographer}](${pic.photographer_url}) on [Pexel](${pic.url})`,
    parse_mode: "Markdown",
  }));

  await ctx.answerInlineQuery(results, { cache_time: 30 * 60 });
});

export default composer;
