import { Composer } from "grammy/mod.ts";

import start from "./start.ts";
import inline from "./inline.ts";
import stats from "./stats.ts";
import broadcast from "./broadcast.ts";

const composer = new Composer();

composer.use(start, inline, stats, broadcast);

export default composer;
