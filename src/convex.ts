import {config} from "./config.ts";
import { ConvexClient } from "convex/browser";
import {api} from "../convex/_generated/api";



const client = new ConvexClient(config.convex.url);

export async function getMessages() {
    return await client.query(api.messages.getMessages, {})
}

export async function addMessage(role: "user" | "assistant", content: string) {
    await client.mutation(api.messages.addMessage, {
        role,
        content,
        timestamp: Date.now()
    })
}