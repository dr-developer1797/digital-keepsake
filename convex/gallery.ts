import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Generate a short-lived upload URL for the client / seed script.
 */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * After uploading a file, save a gallery-photo record that
 * links the storage ID with a label and display order.
 */
export const savePhoto = mutation({
  args: {
    storageId: v.id("_storage"),
    label: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("galleryPhotos", {
      storageId: args.storageId,
      label: args.label,
      order: args.order,
    });
  },
});

/**
 * Return every gallery photo with its signed URL, sorted by `order`.
 */
export const listPhotos = query({
  args: {},
  handler: async (ctx) => {
    const photos = await ctx.db
      .query("galleryPhotos")
      .withIndex("by_order")
      .order("asc")
      .collect();

    return Promise.all(
      photos.map(async (photo) => ({
        _id: photo._id,
        label: photo.label,
        order: photo.order,
        url: await ctx.storage.getUrl(photo.storageId),
      })),
    );
  },
});
