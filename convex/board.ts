import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { error } from "console";

const images = [
  "/placeholders/download.jpg",
  "/placeholders/wepik-export-20240207071501scP2.png",
  "/placeholders/wepik-export-20240207071832qKR4.png",
  "/placeholders/wepik-export-20240207072046A6uN.png",
  "/placeholders/wepik-export-20240207072214cSHs.png",
  "/placeholders/download.jpg",
  "/placeholders/wepik-export-20240207071501scP2.png",
  "/placeholders/wepik-export-20240207071832qKR4.png",
  "/placeholders/wepik-export-20240207072046A6uN.png",
  "/placeholders/wepik-export-20240207072214cSHs.png",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(), // Corrected typo: 'titlle' -> 'title'
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Ensure images array is properly defined and contains URLs
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    console.log("randomImage", randomImage);

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage, // Corrected property name from 'imgUrl' to 'imageUrl'
    });

    // Return the newly created board
    return board;
  },
});

export const favourite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },

  handler: async (ctx, args) => {
    console.log("args", args);
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavourite = await ctx.db
      .query("userFavourite")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .unique();

    if (existingFavourite) {
      throw new Error("Board already favorited");
    }

    await ctx.db.insert("userFavourite", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unfavourite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavourite = await ctx.db
      .query("userFavourite")
      .withIndex(
        "by_user_board",
        (q) => q.eq("userId", userId).eq("boardId", board._id)
        //TODO:check if orgId needed
      )
      .unique();

    if (!existingFavourite) {
      throw new Error("Favourited board not found ");
    }

    await ctx.db.delete(existingFavourite._id);

    return board;
  },
});





export const get = query({
  args: { id: v.id("boards") },

  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);

    return board;
  },
});
