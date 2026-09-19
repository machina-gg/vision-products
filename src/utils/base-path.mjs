/**
 * 配信サブパス（Astro の `base`）を内部リンクへ前置するための純粋関数群。
 *
 * Astro は Markdown / HTML に直書きされたリンクへ `base` を自動で付けない
 * （公式: Configuration Reference の `base`）。そのため「どこに base を足すか」の
 * 判断をこのモジュール 1 箇所に集約し、ビルド設定（rehype プラグイン）と
 * コンポーネント（src/utils/url.ts）の両方から同じ規則を使う。
 *
 * ⚠ このファイルは astro.config.mjs からも読まれるため、Vite 固有の機能
 *   （`import.meta.env` 等）に依存しない。base は必ず引数で受け取る。
 */

/**
 * base を「前置用の接頭辞」に正規化する。
 *
 * `import.meta.env.BASE_URL` の末尾スラッシュの有無は `trailingSlash` 設定で変わり、
 * `actions/configure-pages` の `base_path` はカスタムドメイン時に空文字になる。
 * どちらの形で渡ってきても同じ結果になるよう、末尾スラッシュを落として揃える。
 *
 * @param {string | undefined} base 例: "/vision-products/" | "/vision-products" | "/" | ""
 * @returns {string} 例: "/vision-products" | ""（ルート配信）
 */
export function normalizeBase(base) {
  return (base ?? "").replace(/\/+$/, "");
}

/**
 * base を前置すべき内部リンクかどうかを判定する。
 *
 * 「/ で始まる」ものだけを対象にする。絶対 URL（http: など）・スキーム付き
 * （mailto: / tel:）・ページ内アンカー（#）・相対リンクは呼び出し側の意図どおり
 * 動くため触らない。`//example.com` はプロトコル相対の外部 URL なので除外する。
 *
 * @param {unknown} path
 * @returns {path is string}
 */
export function isInternalPath(path) {
  return (
    typeof path === "string" && path.startsWith("/") && !path.startsWith("//")
  );
}

/**
 * 内部リンクに base を前置する。外部リンク・アンカーはそのまま返す。
 *
 * @param {string | undefined} base
 * @param {string} path
 * @returns {string}
 */
export function joinBase(base, path) {
  if (!isInternalPath(path)) return path;
  return `${normalizeBase(base)}${path}`;
}

/**
 * base 配下の URL パスから base を取り除き、base なしの形に戻す。
 *
 * ページ種別の判定（`pathname.startsWith("/articles/")` 等）は base の有無で
 * 結果が変わってはいけないため、判定前にこの関数を通す。
 *
 * @param {string | undefined} base
 * @param {string} pathname `Astro.url.pathname`
 * @returns {string} 必ず "/" で始まる
 */
export function stripBaseFrom(base, pathname) {
  const prefix = normalizeBase(base);
  if (prefix === "" || !pathname.startsWith(prefix)) return pathname;
  const stripped = pathname.slice(prefix.length);
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}
