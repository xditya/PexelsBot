/*
By Aditya < https://xditya.me >
*/

import { connect } from "redis";
import config from "../env.ts";

console.log("Connecting to Redis...");

export const db = await connect({
  hostname: config.REDIS_URI.split(":")[0],
  port: Number(config.REDIS_URI.split(":")[1]),
  password: config.REDIS_PASSWORD,
});
