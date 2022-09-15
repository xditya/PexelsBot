import { Composer } from "grammy";

import start from "./start.ts";
import inline from "./inline.ts";

const composer = new Composer();

composer.use(start, inline);

export default composer;