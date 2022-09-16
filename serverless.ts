import { serve } from "server";
import { webhookCallback } from "grammy/mod.ts";
import { bot } from "./src/main.ts";

serve(webhookCallback(bot, "std/http"));
