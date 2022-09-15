import { serve } from "server";
import { webhookCallback } from "grammy";
import { bot } from "./src/main.ts";

serve(webhookCallback(bot, "std/http"));