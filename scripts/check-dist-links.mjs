#!/usr/bin/env node
/**
 * ビルド生成物（dist）の内部リンク・アセット参照を検査する。
 *
 * 検査するのは 2 点:
 *   1. すべての内部リンクが配信サブパス（base）で始まっていること
 *   2. そのリンクが dist 内の実ファイル（ページ / アセット）に解決できること
 *
 * base を前置し忘れると「リンクは存在するが 404」になり、ビルドは成功したまま
 * 公開サイトだけが壊れる。ビルド結果そのものを見ることで、どの経路
 * （Markdown 本文 / コンポーネント / frontmatter）で漏れても検出できる。
 *
 * 外部サービス・ネットワークには一切依存しない（dist を読むだけ）。
 *
 * 使い方:
 *   node scripts/check-dist-links.mjs --dist dist --base /vision-products
 *   node scripts/check-dist-links.mjs --dist dist --base /
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

/** @param {string[]} argv */
function parseArgs(argv) {
  /** @type {Record<string, string>} */
  const args = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i];
    const value = argv[i + 1];
    if (!key?.startsWith("--") || value === undefined) {
      throw new Error(`引数の形が不正です: ${argv.join(" ")}`);
    }
    args[key.slice(2)] = value;
  }
  return args;
}

/** dist 配下のすべてのファイルを、dist からの相対パスで列挙する。 */
async function listFiles(dir, root = dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(full, root)));
    } else {
      files.push(path.relative(root, full));
    }
  }
  return files;
}

/**
 * HTML から href / src の値を取り出す。
 * script / style の中身は URL ではないコードを含むため除外する。
 */
function extractUrls(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
  /** @type {string[]} */
  const urls = [];
  const pattern = /\s(?:href|src)\s*=\s*"([^"]*)"/gi;
  let match;
  while ((match = pattern.exec(stripped)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

/** HTML の実体参照を戻す（&amp; で連結されたクエリ等） */
function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

/**
 * base を除いた URL パスが dist 内の何に対応するかを試す。
 * ⚠ dist の中身は base の下にネストされない（base は URL にだけ現れる）ため、
 *   呼び出し側で base を取り除いたパスを渡すこと。
 * ディレクトリ出力（`path/index.html`）と拡張子つきファイルの両方を見る。
 */
function resolves(pathWithoutBase, files) {
  const rel = pathWithoutBase.replace(/^\/+/, "");
  // ルート（"/"）は dist 直下の index.html を指すので、ディレクトリ部分は空になる
  const dir = rel.replace(/\/+$/, "");
  const candidates = [rel, dir === "" ? "index.html" : `${dir}/index.html`];
  if (dir !== "") candidates.push(`${dir}.html`);
  return candidates.some((candidate) => files.has(candidate));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const distDir = path.resolve(args.dist ?? "dist");
  // 末尾スラッシュを落として接頭辞の形に揃える（"/" は "" になる＝ルート配信）
  const basePrefix = (args.base ?? "/").replace(/\/+$/, "");

  const fileList = await listFiles(distDir);
  const files = new Set(fileList.map((f) => f.split(path.sep).join("/")));
  const htmlFiles = fileList.filter((f) => f.endsWith(".html"));

  if (htmlFiles.length === 0) {
    console.error(`[check-dist-links] ${distDir} に HTML がありません`);
    process.exit(1);
  }

  /** @type {string[]} */
  const errors = [];
  let checked = 0;

  for (const htmlFile of htmlFiles) {
    const html = await readFile(path.join(distDir, htmlFile), "utf8");
    for (const raw of extractUrls(html)) {
      const value = decodeEntities(raw.trim());
      // 内部リンクだけを見る。絶対 URL・スキーム付き・アンカー・相対リンクは対象外
      if (!value.startsWith("/") || value.startsWith("//")) continue;
      const urlPath = value.split("#")[0].split("?")[0];
      if (urlPath === "") continue;
      checked += 1;

      if (basePrefix !== "" && !urlPath.startsWith(`${basePrefix}/`)) {
        errors.push(
          `${htmlFile}: base(${basePrefix}) が前置されていない — ${value}`,
        );
        continue;
      }
      if (!resolves(urlPath.slice(basePrefix.length), files)) {
        errors.push(`${htmlFile}: dist 内に解決先が無い — ${value}`);
      }
    }
  }

  const label = basePrefix === "" ? "/" : basePrefix;
  if (errors.length > 0) {
    // 同じ壊れ方が全ページに出るため、種類ごとに 1 件へまとめて出す
    const unique = [...new Set(errors.map((e) => e.replace(/^[^:]+: /, "")))];
    console.error(
      `[check-dist-links] base=${label} で内部リンクの検査に失敗しました`,
    );
    for (const message of unique) console.error(`  - ${message}`);
    console.error(
      `  （延べ ${errors.length} 件 / 検査した内部リンク ${checked} 件）`,
    );
    console.error(`  最初の検出箇所: ${errors[0]}`);
    process.exit(1);
  }

  console.log(
    `[check-dist-links] base=${label} OK — HTML ${htmlFiles.length} ページ / 内部リンク ${checked} 件を検査`,
  );
}

main().catch((error) => {
  console.error(`[check-dist-links] ${error.message}`);
  process.exit(1);
});
