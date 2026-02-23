import { defineCollection, z } from "astro:content";
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

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
  // Starlight 組み込み UI の翻訳コレクション（src/content/i18n/ に配置）
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema(),
  }),
};
