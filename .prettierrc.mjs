// Prettier の設定。
// オプションは一切指定しない（既定のまま）。指定すると .md / .yml の整形結果が
// 変わり、.astro の導入と無関係な差分が混ざるため。
// 整形対象の拡張子は package.json の format / format:check スクリプトが持つ。
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  // parser を明示するのは prettier-plugin-astro の README の推奨設定。
  // パッケージマネージャや他プラグインとの組み合わせで parser の自動解決が
  // 外れることがあるため、*.astro には astro parser を固定で割り当てる。
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
