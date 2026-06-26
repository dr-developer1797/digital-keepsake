import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  galleryPhotos: defineTable({
    storageId: v.id("_storage"),
    label: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),
});
