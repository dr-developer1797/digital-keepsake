/**
 * Seed script — uploads 17 gallery photos to Convex storage and
 * creates galleryPhotos records in the specified display order.
 *
 * Usage:  npx tsx scripts/seed-gallery.mts
 */
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const CONVEX_URL = process.env.VITE_CONVEX_URL ?? "https://sensible-koala-316.convex.cloud";

const client = new ConvexHttpClient(CONVEX_URL);

/** Photos in the exact display order the user specified. */
const PHOTO_ORDER: string[] = [
  "K1", "K2", "K16", "K3", "K4", "K5", "K6",
  "K10", "K11", "K12", "K7", "K8", "K9",
  "K17", "K14", "K15", "K13",
];

async function main() {
  console.log(`Uploading ${PHOTO_ORDER.length} photos to Convex…`);
  console.log(`Convex URL: ${CONVEX_URL}\n`);

  for (let i = 0; i < PHOTO_ORDER.length; i++) {
    const label = PHOTO_ORDER[i];
    const filePath = resolve("assets", `${label}.jpg`);
    const fileBytes = readFileSync(filePath);

    // 1. Get an upload URL from Convex
    const uploadUrl: string = await client.mutation(api.gallery.generateUploadUrl);

    // 2. Upload the file
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": "image/jpeg" },
      body: fileBytes,
    });

    if (!res.ok) {
      throw new Error(`Upload failed for ${label}: ${res.status} ${res.statusText}`);
    }

    const { storageId } = (await res.json()) as { storageId: string };

    // 3. Save the gallery record
    await client.mutation(api.gallery.savePhoto, {
      storageId: storageId as any,
      label,
      order: i,
    });

    console.log(`  ✓ [${i + 1}/${PHOTO_ORDER.length}] ${label}`);
  }

  console.log("\n✅ All photos uploaded successfully!");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
