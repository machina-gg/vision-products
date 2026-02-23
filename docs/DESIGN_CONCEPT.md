# デザインコンセプト

> **SSOT**: このファイルはデザインコンセプト・ビジュアル方針の単一の情報源です

---

## 1. コンセプト

**"Clean Tech Hub"** — テック系インディー開発者のための、クリーンでプロフェッショナルなプロダクトハブ。

- **トーン**: モダン・プロフェッショナル・信頼感
- **雰囲気**: ダークモード主体（Starlight のデフォルト）、Teal アクセントで生き生きとした印象
- **価値観**: シンプル・高品質・プライバシーファースト
- **ターゲット印象**: 「個人開発でもここまでリッチなサイトが作れる」

---

## 2. カラーパレット

| 用途 | カラー | CSS 変数 | 使用箇所 |
|------|--------|----------|----------|
| Primary Accent | `#14B8A6` | `--sl-color-accent` | ボタン・リンク・バッジ・ボーダーハイライト |
| Accent High | `#0d9488` | `--sl-color-accent-high` | ホバー状態 |
| Accent Low | `#ccfbf1` | `--sl-color-accent-low` | タグバッジ背景（ライトモード） |
| Dark Accent Low | `#134e4a` | ダークモード用 | タグバッジ背景（ダークモード） |
| Background | Starlight 既定 | `--sl-color-bg` | ページ背景 |
| Surface / Nav | Starlight 既定 | `--sl-color-bg-nav` | カード背景 |
| Text Primary | Starlight 既定 | `--sl-color-white` | 見出し |
| Text Secondary | Starlight 既定 | `--sl-color-gray-3` | 本文・説明テキスト |
| Border | Starlight 既定 | `--sl-color-gray-5` | カードボーダー（通常時） |

### ブランドカラー補足

| 用途 | カラー | 変数名 |
|------|--------|--------|
| Success / 特典色 | `#06B6D4` | `--vf-success` |
| Danger / 警告色 | `#F43F5E` | `--vf-danger` |
| Premium / プレミアム | `#8B5CF6` | `--vf-premium` |

---

## 3. タイポグラフィ

Starlight のシステムフォントスタックをそのまま使用。

| 要素 | サイズ | ウェイト | 備考 |
|------|--------|----------|------|
| Hero Title | `clamp(1.75rem, 4vw, 2.75rem)` | 800 | HeroSection コンポーネント |
| H1（ページ） | Starlight 既定 | Bold | Starlight 自動スタイル |
| H2（セクション） | 1.5rem | 700 | .hub-section-title など |
| H3（カード） | 1.125rem | 700 | ProductCard / FeatureCard |
| Body | 1rem | Normal | Starlight 既定 |
| Small / 説明 | 0.875rem | Normal | カード説明・メタ情報 |
| Caption / バッジ | 0.75rem | 500–600 | TagBadge / Badge ラベル |

---

## 4. スペーシング

| 用途 | サイズ | 備考 |
|------|--------|------|
| セクション間（hub） | 3rem | `.hub-section` margin |
| セクション間（LP） | 4rem | `.lp-section` margin |
| カード内余白 | 1.5rem | 全カードコンポーネント |
| カードグリッド gap | 1.5rem | Grid gap |
| コンポーネント内要素間 | 0.75rem | flex gap |

---

## 5. コンポーネントスタイル

### カード共通スタイル

- 背景: `--sl-color-bg-nav`
- ボーダー: `1px solid --sl-color-gray-5`（通常）→ `--sl-color-accent`（ホバー）
- 角丸: `0.75rem`（12px）
- ホバー: `transform: translateY(-2px)` + アクセントボーダー + teal 光彩

### ボタン

- Primary（filled）: `background: --sl-color-accent`、白文字、ホバーで `--sl-color-accent-high`
- Secondary（outline）: `border: 2px solid --sl-color-accent`、アクセント文字、ホバーで背景が teal に
- 角丸: `0.5rem`（8px）

### バッジ

- 背景: `--sl-color-accent-low`（薄い teal）
- 文字: `--sl-color-accent-high`
- ボーダー: `1px solid --sl-color-accent`
- 角丸: `9999px`（pill 形状）

---

## 6. 必要な画像一覧

### 画像スタイルガイド

- **スタイル**: フラット UI スクリーンショット + アイコン（実物の拡張機能 UI を使用）
- **トーン**: クリーン・ミニマル・ダークモード対応
- **配色**: Teal (#14B8A6) アクセントを基調に
- **テイスト**: テック・プロフェッショナル・信頼感

---

### プロトタイプ必須（TOP・LP 画面用）

#### ブランド

| ファイル名 | パス | サイズ | 背景 | プロンプト |
|-----------|------|--------|------|-----------|
| logo.svg | `/public/logo.svg` | 180x40 | 透過 | "machina.gg" text logo, minimal sans-serif, teal (#14B8A6) accent dot or gear, dark background variant |
| favicon.ico | `/public/favicon.ico` | 32x32 | 透過 | Minimal "m" or gear icon in teal, works at 32px |
| og-image.png | `/public/og-image.png` | 1200x630 | あり | Dark background (#0f172a), "machina.gg" large title, subtitle "indie developer product hub", teal accent lines, clean tech aesthetic |

#### ハブトップ ヒーロー

| ファイル名 | パス | サイズ | 背景 | プロンプト |
|-----------|------|--------|------|-----------|
| hub-hero.png | `/src/assets/hub-hero.png` | 1200x600 | 透過 | Abstract tech illustration: multiple app windows/cards connected by lines, teal (#14B8A6) on dark background, minimal flat style, representing a "product hub" concept |

#### VisionFocus プロダクト

| ファイル名 | パス | サイズ | 背景 | プロンプト |
|-----------|------|--------|------|-----------|
| vision-focus-icon.png | `/src/assets/vision-focus-icon.png` | 128x128 | 透過 | Chrome extension icon: stylized eye with focus ring, teal/cyan color scheme, minimal flat design, rounded square shape |
| vision-focus-hero.png | `/src/assets/vision-focus-hero.png` | 1200x750 | あり | Chrome browser with VisionFocus extension popup open, showing website block list and timer, dark mode UI, teal accent colors, realistic screenshot style |
| screenshot-popup.png | `/src/assets/vision-focus/screenshot-popup.png` | 400x600 | あり | Chrome extension popup UI screenshot: clean dark interface with "VisionFocus" header, blocked sites list, 20-20-20 timer countdown, teal accents |
| screenshot-options.png | `/src/assets/vision-focus/screenshot-options.png` | 800x500 | あり | Chrome extension options page: settings for website blocking, timer intervals, daily vision statement input, dark theme with teal highlights |
| screenshot-newtab.png | `/src/assets/vision-focus/screenshot-newtab.png` | 1200x750 | あり | New tab page replacement: clean dark background, user's vision statement displayed prominently, time, minimal and motivating design with teal accent |

---

### 本実装で追加

| ファイル名 | パス | サイズ | 背景 | プロンプト |
|-----------|------|--------|------|-----------|
| social-banner.png | `/public/social-banner.png` | 1200x628 | あり | Twitter/X card image for machina.gg, dark background, product card grid visualization, teal branding |

---

### 画像生成時の注意

- **背景列の凡例**: `透過` = PNG 透過必須 / `あり` = 背景あり（JPEG または PNG）
- ダークモード対応を意識してダーク背景で生成する
- Teal (#14B8A6) を統一アクセントカラーとして使用
- Chrome 拡張機能のスクリーンショットは実際の UI に合わせる

---

## 7. 参考サイト・イメージ

- [Linear.app](https://linear.app) — ダークテーマ・カード grid・クリーンな LP 構成
- [Raycast.com](https://raycast.com) — テック系インディーツール・teal/purple アクセント
- [Starlight（公式サイト）](https://starlight.astro.build) — 同じ技術スタック・ドキュメント+LP の両立
