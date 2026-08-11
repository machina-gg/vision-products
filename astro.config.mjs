// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://vision-products.app",
  integrations: [
    starlight({
      // ロケール別サイトタイトル（キーは lang コード: root locale は "ja"）
      title: {
        ja: "Vision Products",
        en: "Vision Products",
      },
      description:
        "Apps and tools built for focus, productivity, and digital wellbeing.",
      // i18n: 日本語を root locale（URL プレフィックスなし）、英語を /en/ で配信
      defaultLocale: "root",
      locales: {
        root: {
          label: "日本語",
          lang: "ja",
        },
        en: {
          label: "English",
        },
      },
      components: {
        SiteTitle: "./src/components/overrides/SiteTitle.astro",
        PageTitle: "./src/components/overrides/PageTitle.astro",
        Search: "./src/components/overrides/Search.astro",
        Footer: "./src/components/overrides/Footer.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/machina-gg",
        },
      ],
      head: [
        // OGP 画像設定（TODO: Replace with actual brand image）
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://vision-products.app/og-image.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content: "https://vision-products.app/og-image.png",
          },
        },
      ],
      sidebar: [
        {
          // セクション: プロダクト一覧
          label: "Products",
          translations: { en: "Products" },
          items: [{ label: "VisionFocus", slug: "vision-focus" }],
        },
        {
          // セクション: VisionFocus ドキュメント
          label: "VisionFocus Documentation",
          translations: { en: "VisionFocus Documentation" },
          items: [
            {
              label: "はじめかた",
              translations: { en: "Getting Started" },
              slug: "docs/vision-focus/getting-started",
            },
            {
              label: "ウェブサイトブロック",
              translations: { en: "Blocking Websites" },
              slug: "docs/vision-focus/blocking-websites",
            },
            {
              label: "タイマー機能",
              translations: { en: "Timers" },
              slug: "docs/vision-focus/timers",
            },
            {
              label: "ビジョンステートメント",
              translations: { en: "Vision Statements" },
              slug: "docs/vision-focus/vision-statements",
            },
            {
              label: "トラブルシューティング",
              translations: { en: "Troubleshooting" },
              slug: "docs/vision-focus/troubleshooting",
            },
            {
              label: "よくある質問",
              translations: { en: "FAQ" },
              slug: "docs/vision-focus/faq",
            },
          ],
        },
        {
          // セクション: VisionFocus 変更履歴
          label: "VisionFocus",
          translations: { en: "VisionFocus" },
          items: [
            {
              label: "リリースノート",
              translations: { en: "Release Notes" },
              slug: "vision-focus/changelog",
            },
          ],
        },
        {
          // セクション: 法的情報
          label: "Legal",
          translations: { en: "Legal" },
          items: [
            {
              label: "プライバシーポリシー",
              translations: { en: "Privacy Policy" },
              slug: "legal/privacy",
            },
            {
              label: "利用規約",
              translations: { en: "Terms of Service" },
              slug: "legal/terms",
            },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
    sitemap(),
  ],
});
