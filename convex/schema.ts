import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  documents: defineTable({
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
        createdAt: v.optional(v.string()),
        id: v.string(),
        props: v.object({
          backgroundColor: v.string(),
          textAlignment: v.string(),
          textColor: v.string(),
        }),
        tags: v.array(v.string()),
        type: v.optional(v.string()),
        updatedAt: v.optional(v.string()),
      })
    ),
    title: v.string(),
  }),
});

