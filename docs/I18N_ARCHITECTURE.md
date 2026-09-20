# i18n アーキテクチャ設計書

Parent Issue: #35

## 概要

vision-products サイト（Astro + Starlight）に日本語（デフォルト）+ 英語（`/en/`）の多言語対応を導入する。

## 検証した前提

### 1. Starlight の root locale 機能

**検証方法**: Starlight 公式 i18n ドキュメント（https://starlight.astro.build/guides/i18n/）を確認

**結果**: `root` locale を使えば、デフォルト言語のコンテンツを `src/content/docs/` 直下に置いたまま（現行構造を維持）、英語コンテンツだけ `src/content/docs/en/` に配置できる。URL は日本語が `/`（パスプレフィックスなし）、英語が `/en/` になる。

### 2. Starlight の i18n コレクション

**検証方法**: 公式ドキュメント確認

**結果**: `@astrojs/starlight/loaders` から `i18nLoader`、`@astrojs/starlight/schema` から `i18nSchema` をインポートし、`src/content/i18n/en.json` に UI 文字列の翻訳を配置することで、Starlight 組み込み UI（目次、サイドバー、検索 UI など）を英語化できる。

### 3. カスタムコンポーネント内の日本語文字列

**検証方法**: ソースコード全ファイルを調査

**結果**: 以下のコンポーネントにハードコードされた日本語文字列がある:
- `Footer.astro` — フッターのタグライン、リンクラベル
- `Search.astro`（SiteTitle 兼ナビ）— ナビリンクラベル、aria-label、テーマラベル
- `PageTitle.astro` — ProductNav リンクラベル
- `ArticleHeader.astro` — 「記事一覧へ」、日付フォーマット（`ja-JP`）
- `ArticleNav.astro` — 「前の記事」「次の記事」、aria-label
- `ArticleCta.astro` — CTA テキスト全体
- `VisionFocusPricing.astro` — 料金表の全テキスト
- `HeroSection.astro` — コンポーネント自体は props 経由なので OK、呼び出し元の MDX に日本語

### 4. ArticleList のロケールフィルタリング

**検証方法**: `ArticleList.astro` のソースコード確認

**結果**: 現在 `getCollection('docs')` で全ドキュメントを取得し `publishedAt` でフィルタしている。Starlight の root locale 構成では、英語記事は `en/articles/xxx` という id を持つため、`doc.id` のプレフィックスでロケールを判定してフィルタリングできる。

### 5. サイドバーの多言語対応

**検証方法**: Starlight ドキュメント確認

**結果**: `sidebar` 配列の `label` プロパティはオブジェクト `{ root: '日本語', en: 'English' }` の形式でロケール別に指定可能。`slug` は共通で、Starlight が自動的にロケールプレフィックスを付与する。

## 設計方針

### ハイブリッドアプローチ

| カテゴリ | 方式 | 理由 |
|---------|------|------|
| Starlight 設定 | 組み込み i18n（root locale） | 公式サポート。URL 構造・言語切替 UI が自動 |
| UI コンポーネント | `Astro.currentLocale` で条件分岐 | カスタムコンポーネントは Starlight の翻訳キーを使えないため |
| ドキュメント（docs） | `src/content/docs/en/docs/` に英語版配置 | Starlight の標準 i18n フロー |
| 記事（articles） | `src/content/docs/en/articles/` に独立ファイル | 1:1 対訳不要。各言語で独立した記事セット |
| LP ページ | `src/content/docs/en/vision-focus.mdx` に英語版 | props で英語テキストを渡す |

### URL 構造

| ページ | 日本語 | 英語 |
|--------|--------|------|
| トップ | `/` | `/en/` |
| VisionFocus LP | `/vision-focus/` | `/en/vision-focus/` |
| ドキュメント | `/docs/vision-focus/getting-started/` | `/en/docs/vision-focus/getting-started/` |
| 記事一覧 | `/articles/` | `/en/articles/` |
| 個別記事 | `/articles/deep-work-introduction/` | `/en/articles/focus-techniques-guide/`（独立） |
| Legal | `/legal/privacy/` | `/en/legal/privacy/` |

### ディレクトリ構造（変更後）

```
src/content/
  docs/                          # 日本語（root locale）
    index.mdx                    # 既存
    vision-focus.mdx             # 既存
    articles/                    # 既存の日本語記事
      index.mdx
      deep-work-introduction.mdx
      ...
    docs/vision-focus/           # 既存のドキュメント
      getting-started.md
      ...
    legal/                       # 既存
      privacy.md
      terms.md
    en/                          # 英語ロケール（新規）
      index.mdx
      vision-focus.mdx
      articles/
        index.mdx
        (英語記事 x3)
      docs/vision-focus/
        getting-started.md
        blocking-websites.md
        timers.md
        vision-statements.md
        troubleshooting.md
        faq.md
      legal/
        privacy.md
        terms.md
  i18n/                          # Starlight UI 翻訳（新規）
    en.json
```

## コンポーネントの i18n 対応方針

### ロケール判定ユーティリティ

`Astro.currentLocale` を使用（Starlight i18n 有効時に自動で利用可能）。

### 翻訳辞書パターン

カスタムコンポーネントでは、コンポーネント内に翻訳辞書を持つ最小構成を採用:

```astro
---
const locale = Astro.currentLocale ?? 'ja';
const t = {
  ja: { backToArticles: '記事一覧へ', olderArticle: '前の記事', newerArticle: '次の記事' },
  en: { backToArticles: 'Back to Articles', olderArticle: 'Older', newerArticle: 'Newer' },
}[locale] ?? { ... };
---
```

将来的にコンポーネント数が増えた場合は `src/lib/i18n.ts` に集約できるが、現時点では各コンポーネント内にインラインで持つのが最もシンプル。

### 影響コンポーネント一覧

| コンポーネント | 変更内容 |
|---------------|---------|
| `Footer.astro` | タグライン・リンクラベルを翻訳辞書化。`href` にロケールプレフィックス追加 |
| `Search.astro` | ナビリンクラベル・aria-label・テーマラベルを翻訳辞書化 |
| `PageTitle.astro` | ProductNav リンクラベルを翻訳辞書化 |
| `ArticleHeader.astro` | 「記事一覧へ」翻訳。日付フォーマットのロケール切替。`/articles/` リンクにプレフィックス |
| `ArticleNav.astro` | 「前の記事」「次の記事」翻訳。ロケール別記事フィルタ |
| `ArticleCta.astro` | CTA テキスト全体を翻訳辞書化 |
| `ArticleList.astro` | ロケール別に記事をフィルタリング |
| `SiteTitle.astro` | ロケールに応じた `href` プレフィックス |
| `ArticleCard.astro` | 日付フォーマットのロケール切替 |

## 検討した代替案

### 案 A: Astro i18n routing（Starlight 外）

Astro 本体の `i18n` routing を直接使い、ページごとにルーティングを手動設定する。
**却下理由**: Starlight が独自の i18n 機構を持っているため競合する。Starlight の言語切替 UI・サイドバー翻訳が使えなくなる。

### 案 B: 全コンテンツを i18n キーベースで管理

MDX ファイル内のテキストもすべて翻訳キーに置き換える。
**却下理由**: 記事は 1:1 対訳不要という要件に反する。記事は独立ファイルで管理するのがシンプル。

### 案 C（採用）: Starlight root locale + 記事ファイル分離

Starlight の組み込み i18n を root locale で使い、カスタムコンポーネントはインライン翻訳辞書、記事は独立ファイルで管理。
**採用理由**: 既存構造の変更が最小。Starlight の言語切替 UI が自動で有効になる。記事の独立管理が自然にできる。

## 実装順序と依存関係

```
Issue 1: Starlight i18n 基盤設定
  ↓
Issue 2: コンポーネント i18n 対応（Issue 1 に依存）
  ↓
Issue 3: 英語ドキュメント作成（Issue 1 に依存）
  ↓  （Issue 2, 3 は並行可能）
Issue 4: 英語 LP・トップページ作成（Issue 1 に依存）
  ↓
Issue 5: 英語記事作成（Issue 1, 2 に依存）
```

## リスク

| リスク | 影響度 | 対策 |
|--------|--------|------|
| Starlight v0.37 の i18n に未知のバグ | 中 | ビルド確認を各 Issue の PR で実施 |
| カスタムコンポーネントで `Astro.currentLocale` が undefined | 低 | フォールバックを `'ja'` に設定 |
| サイドバーのロケール別ラベルが正しく表示されない | 低 | 公式ドキュメント通りの設定で回避可能 |
| 既存の日本語 URL が変わってしまう | 高 | root locale を使うことで既存 URL は不変 |
| 記事のロケールフィルタリングが正しく動作しない | 中 | `doc.id` プレフィックスで判定。ビルド時テストで確認 |
