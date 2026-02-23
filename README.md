# プロダクトハブサイト

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

個人開発者が複数のプロダクトを一箇所にまとめて管理・公開できるプロダクトハブサイト。

**Live Site**: [https://machina-gg.github.io/vision-products/](https://machina-gg.github.io/vision-products/)

## About

自分が作ったプロダクトを増やすたびに、LP・ヘルプ・法的ページを別々のサービスで作り直す手間をなくすためのサイト。1 つのサイトに追加するだけで、統一されたリッチなデザインで各プロダクトのページ一式を公開できる。

プロダクトごとに以下のページを提供：

- **LP（ランディングページ）** — 機能紹介・スクリーンショット・ダウンロードリンク
- **ヘルプ/ドキュメント** — 使い方ガイド・FAQ
- **リリースノート** — バージョン更新履歴
- **法的ページ** — プライバシーポリシー・利用規約（App Store 申請対応）

## 背景・課題

プロダクトを新しく作るたびに：

- プロダクトサイト・ヘルプサイトを別々に用意するのが大変
- デプロイ・ホスティング設定を毎回行う必要がある
- 複数サイトに分散して管理が煩雑になる

これらを解消するため、1 つのサイトで全プロダクトのページ・ドキュメントをまとめて管理する。

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5
- **Theme**: [Starlight](https://starlight.astro.build) v0.37
- **Package Manager**: pnpm
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images and media
│   ├── content/
│   │   └── docs/               # Markdown/MDX content
│   │       ├── index.mdx       # Homepage (product hub)
│   │       ├── {product-name}.mdx      # Product LP
│   │       ├── legal/          # Legal documents (per product)
│   │       └── docs/
│   │           └── {product-name}/     # Product documentation
│   ├── styles/
│   │   └── custom.css          # Custom styles
│   └── content.config.ts
├── docs/                       # Project documentation
│   ├── PRD.md                  # 要件定義
│   └── INPUT.md                # ヒアリングシート
├── reports/                    # Research reports
│   └── COMPETITIVE_ANALYSIS.md
├── astro.config.mjs            # Astro configuration
├── package.json
└── tsconfig.json
```

## Development

### Prerequisites

- Node.js 20+
- pnpm 9+

### Setup

```bash
# Clone the repository
git clone git@github.com:machina-gg/vision-products.git
cd vision-products

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

The site will be available at `http://localhost:4321/vision-products/`

### Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start local dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro ...` | Run Astro CLI commands |

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

**Deployment workflow**:
1. Push to `main` branch
2. GitHub Actions builds the site (`pnpm build`)
3. Deploys to GitHub Pages
4. Site is live at [https://machina-gg.github.io/vision-products/](https://machina-gg.github.io/vision-products/)

## Adding a New Product

1. Create a product LP: `src/content/docs/{product-name}.mdx`
2. Create documentation directory: `src/content/docs/docs/{product-name}/`
3. Create legal pages: `src/content/docs/legal/{product-name}/`
4. Update sidebar configuration in `astro.config.mjs`
5. Add product card to homepage `src/content/docs/index.mdx`

## Links

- GitHub: [machina-gg](https://github.com/machina-gg)
- Starlight Documentation: [starlight.astro.build](https://starlight.astro.build/)

## License

© 2026 machina.gg. All rights reserved.
