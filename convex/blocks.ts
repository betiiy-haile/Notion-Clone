// import { v } from "convex/values";

// import { mutation, query } from "./_generated/server";
// import { Doc, Id } from "./_generated/dataModel";
// // import { update } from "./documents";

// export const getBlocks = query({ 
//     handler: async (ctx) => {
//         const blocks = await ctx.db.query("blocks").collect();
//         return blocks;
//     }
// })

// export const getBlockbyId = query({
//     args: {
//         id: v.id('blocks'),
//     },
//     handler: async (ctx, args) => {
//         const block = await ctx.db.get(args.id);
//         return block;
//     },
// });

// export const create = mutation({
//     args: {
//         id: v.id('blocks'),
//         text: v.string(),
//         tags: v.array(v.string()),
//         createdAt: v.string(),
//         updatedAt: v.string(),
//     },
//     handler: async (ctx, args) => {
//         const now = new Date().toISOString();
//         const block = await ctx.db.insert("blocks", {
//             text: args.text,
//             id: args.id,
//             tags: args.tags,
//             createdAt: now,
//             updatedAt: now,
//         });

//         return block;
//     },
// });

// export const updateBlock = mutation({
//     args: {
//         id: v.id('blocks'),
//         text: v.optional(v.string()),
//         tags: v.optional(v.array(v.string())),
//     },
//     handler: async (ctx, args) => {
//         const now = new Date().toISOString();
//         const { id, ...rest } = args;
//         const existingBlock = await ctx.db.get(args.id);
//         const block = await ctx.db.patch(args.id, {
//             ...rest,
//             updatedAt: now,
//         })

//         return block;
//     },
// });



// export const deleteBlock = mutation({
//     args: {
//         id: v.id('blocks'),
//     },
//     handler: async (ctx, args) => {
//         const existingBlock = await ctx.db.get(args.id);
//         if (!existingBlock) {
//             throw new Error("Not found");
//         }
//         const block = await ctx.db.delete(args.id);
//         return block;
//     },
// })