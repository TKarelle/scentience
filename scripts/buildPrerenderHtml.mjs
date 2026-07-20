/**
 * Niveau 1 SEO — génère un index.html par route publique avec le <head> correct.
 * S'exécute après `vite build` ; réutilise le bundle et le manifest Vite.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";
import { writeSeoStaticFiles } from "./sitemapUtils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** Remplace une balise meta (single ou multi-ligne) par attribut name ou property. */
function replaceMetaTag(html, { name, property, content }) {
  if (content == null || content === "") return html;
  const attr = name ? "name" : "property";
  const key = name || property;
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta\\s+(?:[^>\\n]*\\n\\s*)*${attr}="${escapedKey}"\\s*(?:\\n\\s*)*content="[^"]*"\\s*(?:\\n\\s*)*/>`,
  );
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function replaceLinkTag(html, rel, href) {
  const escapedRel = rel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<link\\s+(?:[^>\\n]*\\n\\s*)*rel="${escapedRel}"\\s*(?:\\n\\s*)*href="[^"]*"\\s*(?:\\n\\s*)*/>`,
  );
  const tag = `<link rel="${rel}" href="${escapeAttr(href)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertMetaProperty(html, property, content) {
  return replaceMetaTag(html, { property, content });
}

function applyPageSeo(template, page) {
  const canonicalUrl = page.canonicalUrl;
  const ogImage = page.ogImage;
  const ogImageAlt = page.ogImageAlt || page.title;
  const ogType = page.ogType || "website";

  let html = template.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeAttr(page.title)}</title>`,
  );

  html = replaceMetaTag(html, { name: "title", content: page.title });
  html = replaceMetaTag(html, {
    name: "description",
    content: page.description,
  });
  html = replaceMetaTag(html, {
    name: "keywords",
    content: page.keywords || "",
  });
  html = replaceMetaTag(html, {
    name: "robots",
    content: page.noindex ? "noindex, nofollow" : "index, follow",
  });
  html = replaceMetaTag(html, { property: "og:type", content: ogType });
  html = replaceMetaTag(html, { property: "og:url", content: canonicalUrl });
  html = replaceMetaTag(html, { property: "og:title", content: page.title });
  html = replaceMetaTag(html, {
    property: "og:description",
    content: page.description,
  });
  html = replaceMetaTag(html, { property: "og:image", content: ogImage });
  html = replaceMetaTag(html, {
    property: "og:image:alt",
    content: ogImageAlt,
  });
  html = replaceMetaTag(html, { name: "twitter:url", content: canonicalUrl });
  html = replaceMetaTag(html, { name: "twitter:title", content: page.title });
  html = replaceMetaTag(html, {
    name: "twitter:description",
    content: page.description,
  });
  html = replaceMetaTag(html, { name: "twitter:image", content: ogImage });
  html = replaceMetaTag(html, {
    name: "twitter:image:alt",
    content: ogImageAlt,
  });
  html = replaceLinkTag(html, "canonical", canonicalUrl);

  if (ogType === "article") {
    html = upsertMetaProperty(
      html,
      "article:published_time",
      page.articlePublishedTime,
    );
    html = upsertMetaProperty(html, "article:author", page.articleAuthor);
    html = upsertMetaProperty(html, "article:section", page.articleSection);
  }

  return html;
}

async function main() {
  const siteOrigin = (
    process.env.VITE_SITE_ORIGIN || "https://madeleine.uk"
  ).replace(/\/$/, "");
  const distDir = path.join(root, "dist");
  const templatePath = path.join(distDir, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error("dist/index.html introuvable — lancez vite build d'abord.");
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf8");

  let manifest = {};
  const manifestPath = path.join(distDir, ".vite/manifest.json");
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  }

  const vite = await createServer({
    configFile: path.join(root, "vite.config.js"),
    server: { middlewareMode: true },
    appType: "custom",
  });

  const { getPrerenderPages } = await vite.ssrLoadModule(
    "/src/config/prerenderPages.js",
  );
  const pages = getPrerenderPages({ siteOrigin, manifest }).map((page) => ({
    ...page,
    canonicalUrl: `${siteOrigin}${page.canonicalPath.startsWith("/") ? page.canonicalPath : `/${page.canonicalPath}`}`,
  }));
  await vite.close();

  writeSeoStaticFiles(distDir, siteOrigin);

  for (const page of pages) {
    const html = applyPageSeo(template, page);
    const relativeDir =
      page.canonicalPath === "/"
        ? ""
        : page.canonicalPath.replace(/^\//, "");
    const outDir = path.join(distDir, relativeDir);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
  }

  console.log(
    `Prerender SEO: ${pages.length} HTML shells + sitemap/robots written to dist/`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
