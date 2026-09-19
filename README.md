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

| カテゴリ | 技術 |
|----------|------|
| Framework | [Astro](https://astro.build) |
| Theme | [Starlight](https://starlight.astro.build) |
| Language | TypeScript |
| Content | Astro Content Collections (Markdown/MDX) |
| Package Manager | pnpm |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

## Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Build + internal link check (both base paths)
│       └── deploy.yml              # GitHub Pages deployment
├── public/                         # Static assets
├── src/
│   ├── assets/                     # Images and media
│   ├── components/                 # Custom Astro components
│   │   ├── hub/                    # Hub top components
│   │   ├── lp/                     # Landing page components
│   │   ├── articles/               # Article list/card components
│   │   └── changelog/              # Release note components
│   ├── content/
│   │   └── docs/                   # Starlight content (all pages)
│   │       ├── index.mdx           # Hub top (product list)
│   │       ├── articles/           # Site-wide articles
│   │       │   └── {slug}.mdx
│   │       └── {product}/          # Per-product pages
│   │           ├── index.mdx       # Product LP
│   │           ├── articles/       # Product-filtered article list
│   │           ├── docs/           # Help / documentation
│   │           ├── changelog.mdx   # Release notes
│   │           └── legal/          # Privacy policy & terms
│   ├── plugins/
│   │   └── rehype-base-links.mjs   # Prefix `base` onto links in Markdown/MDX bodies
│   ├── utils/
│   │   ├── base-path.mjs           # Shared base-path rules (used by config & components)
│   │   └── url.ts                  # withBase() / stripBase() for components
│   ├── styles/
│   │   └── custom.css              # Global styles / CSS variable overrides
│   └── content.config.ts           # Content Collections schema
├── scripts/
│   └── check-dist-links.mjs        # Verify built links resolve under a given base
├── docs/                           # Project documentation
│   ├── PRD.md                      # 要件定義
│   ├── DESIGN.md                   # 設計書
│   ├── SCREEN.md                   # 画面設計
│   ├── COMPONENT.md                # コンポーネント設計
│   └── INPUT.md                    # ヒアリングシート
├── reports/
│   └── COMPETITIVE_ANALYSIS.md     # 競合調査レポート
├── astro.config.mjs                # Astro configuration
├── package.json
└── tsconfig.json
```

## Development

### Prerequisites

- Node.js — `.github/workflows/ci.yml` の `node-version` に合わせる
- pnpm — `package.json` の `packageManager` に合わせる（`corepack enable` で自動追従）

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
| `node scripts/check-dist-links.mjs --dist dist --base /vision-products` | Verify that every internal link in `./dist/` starts with the base and resolves |

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

**Deployment workflow**:
1. Push to `main` branch
2. `actions/configure-pages` が Pages の実際の配信先（`origin` / `base_path`）を取得する
3. GitHub Actions builds the site (`pnpm build`) — 配信先は環境変数で渡される
4. `actions/upload-pages-artifact` → `actions/deploy-pages` で公開
5. Site is live at [https://machina-gg.github.io/vision-products/](https://machina-gg.github.io/vision-products/)

### 配信先（`site` / `base`）の切り替え

サイトは `https://machina-gg.github.io/vision-products/` のようなサブパスで配信されるため、
ビルド時に配信サブパス（Astro の `base`）を知っている必要がある。値は環境変数で上書きできる。

| 環境変数 | 意味 | 既定値 |
|----------|------|--------|
| `SITE_URL` | 配信オリジン（Astro の `site`） | `https://machina-gg.github.io` |
| `BASE_PATH` | 配信サブパス（Astro の `base`。ドメイン直下配信は `/`） | `/vision-products` |

```bash
# ドメイン直下配信の形でビルドする（カスタムドメイン移行後の確認用）
BASE_PATH=/ pnpm build
```

**カスタムドメインへ移るとき**: GitHub Pages の設定でカスタムドメインを入れるだけでよい。
`deploy.yml` が `actions/configure-pages` の出力をそのままビルドへ渡すので、
次のデプロイから `base` が `/` に、`site` がそのドメインに切り替わる（コード変更は不要）。

内部リンクは Astro が自動で `base` を付けないため、次の経路で前置している。
リンクを追加するときも `/docs/...` のように `/` 始まりで書けばよい。

- **Markdown / MDX 本文**: `src/plugins/rehype-base-links.mjs`（rehype プラグイン）
- **コンポーネント**: `src/utils/url.ts` の `withBase()`（`<a href>` を出力する側で適用する）
- **frontmatter の `hero.actions[].link`**: `src/components/overrides/Hero.astro`

両方の配信形で壊れていないことは CI（`.github/workflows/ci.yml`）が
`scripts/check-dist-links.mjs` で機械的に検査する。

## Adding a New Product

1. Create `src/content/docs/{product-name}/index.mdx` — Product LP
2. Create `src/content/docs/{product-name}/docs/` — Help docs
3. Create `src/content/docs/{product-name}/changelog.mdx` — Release notes
4. Create `src/content/docs/{product-name}/legal/` — Privacy policy & terms
5. Create `src/content/docs/{product-name}/articles/index.mdx` — Article filter page
6. Update sidebar in `astro.config.mjs`
7. Add product card to `src/content/docs/index.mdx`

## Documents

| ドキュメント | 内容 |
|-------------|------|
| [docs/PRD.md](./docs/PRD.md) | 要件定義 |
| [docs/DESIGN.md](./docs/DESIGN.md) | 技術スタック・ディレクトリ構成・設計方針 |
| [docs/SCREEN.md](./docs/SCREEN.md) | 画面一覧・画面遷移図 |
| [docs/COMPONENT.md](./docs/COMPONENT.md) | コンポーネント一覧・Props定義 |
| [reports/COMPETITIVE_ANALYSIS.md](./reports/COMPETITIVE_ANALYSIS.md) | 競合調査レポート |

## Links

- GitHub: [machina-gg](https://github.com/machina-gg)
- Starlight Documentation: [starlight.astro.build](https://starlight.astro.build/)

## License

© 2026 machina.gg. All rights reserved.
