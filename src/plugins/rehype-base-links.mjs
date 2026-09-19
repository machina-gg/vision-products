/**
 * Markdown / MDX 本文の「/ 始まりリンク」に配信サブパス（Astro の `base`）を前置する
 * rehype プラグイン。
 *
 * Astro は本文のリンクへ `base` を自動で付けないため、これが無いとサブパス配信で
 * 本文中のリンクがすべて 404 になる。書き手は従来どおり `/docs/...` と書けばよく、
 * 変換はここに集約する。
 *
 * ⚠ `base` は引数で受け取る。プラグインは Astro の設定読み込み時（Node 側）で
 *   評価されるため `import.meta.env.BASE_URL` は使えない。
 */
import { joinBase, normalizeBase } from "../utils/base-path.mjs";

/** URL を値に持つ属性。タグ名ではなく属性名で見るので、要素の種類が増えても追随不要。 */
const URL_ATTRIBUTES = ["href", "src"];

/**
 * @param {{ base?: string }} [options]
 */
export default function rehypeBaseLinks(options = {}) {
  const base = normalizeBase(options.base);

  return function transformer(tree) {
    // ルート配信（base なし）では書き換える必要が無いので何もしない
    if (base === "") return;
    visit(tree);
  };

  /** @param {any} node */
  function visit(node) {
    if (node == null || typeof node !== "object") return;

    // 通常の HTML 要素（Markdown のリンク・画像はここに来る）
    if (node.properties) {
      for (const attr of URL_ATTRIBUTES) {
        const value = node.properties[attr];
        if (typeof value === "string") {
          node.properties[attr] = joinBase(base, value);
        }
      }
    }

    // MDX の JSX 要素（`<a href="/articles/">` は element ではなくこちらになる）。
    // ⚠ 対象は小文字始まりの素の HTML タグだけ。大文字始まりはコンポーネントで、
    //   href はそのコンポーネント側の withBase() が前置するため、ここで触ると二重になる。
    // 式で渡す属性（`href={...}`）はビルド時に値が確定しないためそもそも対象外。
    if (isIntrinsicJsxElement(node) && Array.isArray(node.attributes)) {
      for (const attribute of node.attributes) {
        if (
          attribute?.type === "mdxJsxAttribute" &&
          URL_ATTRIBUTES.includes(attribute.name) &&
          typeof attribute.value === "string"
        ) {
          attribute.value = joinBase(base, attribute.value);
        }
      }
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) visit(child);
    }
  }
}

/**
 * JSX ノードが素の HTML タグ（`<a>` 等）かどうか。
 * JSX の規約どおり、小文字始まりを HTML タグ、それ以外をコンポーネントとして扱う。
 *
 * @param {any} node
 */
function isIntrinsicJsxElement(node) {
  return typeof node.name === "string" && /^[a-z]/.test(node.name);
}
