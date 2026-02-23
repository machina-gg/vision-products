import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        // 記事専用フィールド（通常のドキュメントページでは undefined）
        publishedAt: z.date().optional(),
        products: z.array(z.string()).optional(),
      }),
    }),
  }),
};
