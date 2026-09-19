// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import rehypeBaseLinks from "./src/plugins/rehype-base-links.mjs";
import { normalizeBase } from "./src/utils/base-path.mjs";

// 配信先は環境変数で上書きできる。既定値は GitHub Pages のサブパス配信
// （https://machina-gg.github.io/vision-products/）。
// deploy.yml が actions/configure-pages の出力（origin / base_path）を渡すため、
// Pages にカスタムドメインを設定すればコード変更なしでドメイン直下配信へ切り替わる。
const site = process.env.SITE_URL || "https://machina-gg.github.io";

// configure-pages の base_path はカスタムドメイン時に空文字になる。
// Astro の base はルート配信を "/" で表すため読み替える。
// ⚠ `??` で受けるのは「未設定」と「空文字（＝ルート配信）」を区別するため。
const basePath = process.env.BASE_PATH ?? "/vision-products";
const base = basePath === "" ? "/" : basePath;

// OGP 画像は public/og-image.png。配信先が変わっても追随するよう site + base から組み立てる
const ogImageUrl = new URL(`${normalizeBase(base)}/og-image.png`, site).href;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  markdown: {
    // 本文の「/ 始まりリンク」に base を前置する（Astro は自動では付けない）。
    // ⚠ `rehypePlugins` は非推奨で、Astro は起動時に警告を出す。後継の
    //   `markdown.processor: unified({...})` は `@astrojs/markdown-remark` の import が要るが、
    //   同パッケージは直接依存ではない（依存追加＝ lockfile 変更になる）ため今は使わない。
    rehypePlugins: [[rehypeBaseLinks, { base }]],
  },
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
        Hero: "./src/components/overrides/Hero.astro",
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
            content: ogImageUrl,
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content: ogImageUrl,
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
