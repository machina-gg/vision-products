# 設計書

> 機能要件は [PRD.md](./PRD.md) を参照

---

## 1. 技術スタック（SSOT）

| カテゴリ | 技術 | 選定理由 |
|----------|------|----------|
| フレームワーク | Astro v5 | ゼロJS出力・高パフォーマンス・静的サイト生成に最適 |
| ドキュメントテーマ | Starlight v0.37 | i18n・アクセシビリティ・サイドバーナビを標準装備 |
| 言語 | TypeScript | 型安全なコンテンツスキーマ管理 |
| コンテンツ管理 | Astro Content Collections | Markdown/MDX + 型付きスキーマでコンテンツを管理 |
| スタイリング | カスタム CSS（Starlight CSS変数） | Starlightのデザインシステムを拡張してリッチデザインを実現 |
| カスタムコンポーネント | Astro コンポーネント（.astro） | LP・記事一覧など Starlight 外のUIを構築 |
| パッケージ管理 | pnpm | 既存環境 |
| ホスティング | GitHub Pages | 無料・ゼロ運用コスト |
| CI/CD | GitHub Actions | main push で自動ビルド・デプロイ |
| サイトマップ | @astrojs/sitemap | SEO対応 |

---

## 2. ディレクトリ構成（SSOT）

```
src/
├── assets/                        # 静的アセット（画像・アイコン）
├── components/                    # カスタム Astro コンポーネント
│   ├── hub/
│   │   └── ProductCard.astro      # プロダクトカード（ハブページ用）
│   ├── lp/
│   │   ├── HeroSection.astro      # LP ヒーローセクション
│   │   ├── FeatureGrid.astro      # 機能紹介グリッド
│   │   ├── FeatureCard.astro      # 機能カード（FeatureGrid 内）
│   │   ├── ScreenshotGallery.astro # スクリーンショットギャラリー
│   │   └── DownloadButtons.astro  # App Store / ダウンロードリンク
│   ├── articles/
│   │   ├── ArticleCard.astro      # 記事カード
│   │   ├── ArticleList.astro      # 記事一覧（product タグでフィルタリング）
│   │   └── TagBadge.astro         # プロダクトタグバッジ
│   └── changelog/
│       └── ChangelogEntry.astro   # リリースノート1エントリ
├── content/
│   └── docs/                      # Starlight コンテンツ（全ページ）
│       ├── index.mdx              # ハブトップ（プロダクト一覧）
│       ├── articles/              # サイト全体のコンテンツ記事
│       │   └── {slug}.mdx        # 個別記事（products タグ付き）
│       └── {product}/             # プロダクトごと（例: vision-focus/）
│           ├── index.mdx          # プロダクト LP
│           ├── articles/
│           │   └── index.mdx      # プロダクト別記事フィルターページ
│           ├── docs/              # ヘルプ/ドキュメント
│           │   └── *.md
│           ├── changelog.mdx      # リリースノート
│           └── legal/
│               ├── privacy.md     # プライバシーポリシー
│               └── terms.md       # 利用規約
├── styles/
│   └── custom.css                 # グローバルスタイル・CSS変数オーバーライド
└── content.config.ts              # Content Collections スキーマ定義
```

### コンテンツスキーマ（content.config.ts）

```typescript
// 記事のフロントマタースキーマ
// articles/{slug}.mdx に適用
{
  title: string
  description: string
  publishedAt: Date
  products: string[]   // ['vision-focus', 'product-b'] — 複数タグ付け可能
}
```

### 新プロダクト追加手順

1. `src/content/docs/{product-name}/` ディレクトリを作成
2. 所定の構成でファイルを追加（index.mdx, docs/, changelog.mdx, legal/）
3. `astro.config.mjs` の `sidebar` に追加
4. ハブトップ（index.mdx）にプロダクトカードを追加

---

## 3. 状態管理

静的サイトのため、クライアントサイドの状態管理は不要。

Starlight が提供する以下の機能を活用：
- ダークモード切替（Starlight 組み込み）
- i18n 言語切替（Starlight 組み込み）
- サイドバー開閉（Starlight 組み込み）

---

## 4. データストレージ

### 方針

**なし（静的サイト）**

全コンテンツは Markdown/MDX ファイルで管理。DB・外部ストレージは使用しない。

### 理由

- GitHub Pages ホスティングのためサーバーサイド処理が不可
- コンテンツは開発者本人が Markdown/MDX で直接編集・コミットする運用
- ゼロ運用コストを維持するため外部サービスを使わない

---

## 5. データ通信方針

### 方針

**なし（静的サイト）**

ビルド時に全ページを静的生成。実行時のデータフェッチは行わない。

### 選定理由

- GitHub Pages は静的ファイルのホスティングのみ対応
- コンテンツは Astro Content Collections でビルド時に解決
- 記事のプロダクトタグフィルタリングもビルド時に処理

---

## 6. 外部連携

| サービス | 用途 | 備考 |
|----------|------|------|
| GitHub Actions | ビルド・デプロイ自動化 | main push でトリガー |
| @astrojs/sitemap | sitemap.xml 自動生成 | SEO対応 |
| （将来）Pagefind | 全文検索 | ビルド時インデックス生成 |
| （将来）Plausible / GA | アクセス解析 | プライバシーフレンドリーな選択肢を優先 |

---

## 7. i18n 設計

Starlight の組み込み i18n を使用。

| ロケール | パス | 備考 |
|----------|------|------|
| 日本語（デフォルト） | `/` | ルートロケール |
| 英語 | `/en/` | サブロケール |

```
src/content/docs/
├── index.mdx          # 日本語（デフォルト）
├── en/
│   └── index.mdx      # 英語
└── {product}/
    ├── index.mdx       # 日本語
    └── en/
        └── index.mdx   # 英語（将来対応）
```

> MVP では日本語コンテンツのみ実装し、英語は将来対応とする。
> ただし Starlight の i18n 設定は初期から有効にしておく。

---

※ コンポーネント設計は [COMPONENT.md](./COMPONENT.md)、画面設計は [SCREEN.md](./SCREEN.md) を参照
