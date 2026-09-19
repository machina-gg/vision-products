/**
 * コンポーネントから使う URL ヘルパー。
 *
 * `import.meta.env.BASE_URL`（Astro が `base` 設定から与える値）を束ねて、
 * 判定規則そのものは src/utils/base-path.mjs に委ねる。
 * ⚠ `<a href>` を出力するコンポーネントは、呼び出し側の作法に頼らず
 *   ここを通してから href に渡すこと（プロパティで渡ってくる内部リンクも同じ）。
 */
import { joinBase, stripBaseFrom } from "./base-path.mjs";

const BASE = import.meta.env.BASE_URL;

/** 内部リンクに配信サブパスを前置する。外部リンク・アンカーはそのまま返す。 */
export function withBase(path: string): string {
  return joinBase(BASE, path);
}

/** ページ種別の判定用に、`Astro.url.pathname` から配信サブパスを取り除く。 */
export function stripBase(pathname: string): string {
  return stripBaseFrom(BASE, pathname);
}
