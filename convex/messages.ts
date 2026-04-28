import {mutation, query} from "./_generated/server";
import {v} from "convex/values";


export const getMessages = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("messages")
            .order("asc")
            .collect()
    }
})

export const addMessage = mutation({
    args: { role: v.union(v.literal("user"), v.literal("assistant")), content: v.string(), timestamp: v.number() },

    handler: async (ctx, args) => {
       return await ctx.db.insert("messages", { role: args.role, content: args.content, timestamp: args.timestamp } );
    }
})