/*
By Aditya < https://xditya.me >
*/

import { Pexels } from "pexels";
import config from "../env.ts";

const pexelsClient = new Pexels(config.PEXELS_API);

async function imageSearch(img: string) {
  let res;
  try {
    res = await pexelsClient.searchPhotos({ query: img }, 1, 30);
  } catch (err) {
    console.error(err);
    return;
  }
  return res;
}

export default imageSearch;
