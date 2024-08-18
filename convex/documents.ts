import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";


export const getAll = query({
  handler: async (ctx) => {
    try {
      const documents = await ctx.db.query("documents").collect();
      return documents;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw new Error("Failed to fetch documents");
    }
  },
});

export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    return document;
  },
});



export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.array(
      v.object({
        children: v.array(v.any()),
        content: v.array(
          v.object({
            styles: v.object({}),
            text: v.string(),
            type: v.string(),
          })
        ),
        createdAt: v.string(),
        id: v.string(),
        props: v.object({
          backgroundColor: v.string(),
          textAlignment: v.string(),
          textColor: v.string(),
        }),
        tags: v.array(v.string()),
        type: v.string(),
        updatedAt: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    const document = await ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
    });

    return document;
  },
});



