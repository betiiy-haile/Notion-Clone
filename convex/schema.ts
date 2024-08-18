import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// export default defineSchema({
//   documents: defineTable({
//     title: v.string(),
//     userId: v.string(),
//     isArchived: v.boolean(),
//     parentDocument: v.optional(v.id("documents")),
//     content: v.optional(v.string()),
//     coverImage: v.optional(v.string()),
//     icon: v.optional(v.string()),
//     isPublished: v.boolean(),
//   })
//     .index("by_user", ["userId"])
//     .index("by_user_parent", ["userId", "parentDocument"]),
// });


export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.array(
      v.object({
        id: v.id("blocks"),
        type: v.string(),
        props: v.object({
          textColor: v.string(),
          backgroundColor: v.string(),
          textAlignment: v.string(),
        }),
        tags: v.array(v.string()),
        createdAt: v.string(),
        updatedAt: v.string(),
        content: v.array(v.string()),
        children: v.array(v.id("blocks")),
      })
    ),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});



// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";

// export default defineSchema({
//   blocks: defineTable({
//     id: v.id('blocks'), 
//     text: v.string(), 
//     createdAt: v.string(), 
//     updatedAt: v.string(), 
//     tags: v.array(v.string()), 
//   })
//     .index("by_tags", ["tags"])
//     .index("by_created_at", ["createdAt"])
//     .index("by_updated_at", ["updatedAt"]),
//   documents: defineTable({
//       title: v.string(),
//       userId: v.string(),
//       isArchived: v.boolean(),
//       parentDocument: v.optional(v.id("documents")),
//       content: v.optional(v.string()),
//       coverImage: v.optional(v.string()),
//       icon: v.optional(v.string()),
//       isPublished: v.boolean(),
//     })
//       .index("by_user", ["userId"])
//       .index("by_user_parent", ["userId", "parentDocument"]),
// });

