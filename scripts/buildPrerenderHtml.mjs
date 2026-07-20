/**
 * Niveau 1 SEO — génère un index.html par route publique avec le <head> correct.
 * S'exécute après `vite build` ; réutilise le bundle et le manifest Vite.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function upsertMetaProperty(html, property, content) {
  if (!content) return html;
  const tag = `<meta property="${property}" content="${escapeAttr(content)}" />`;
  const pattern = new RegExp(
    `<meta property="${property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}" content="[^"]*"\\s*/>`,
  );
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function applyPageSeo(template, page) {
  const canonicalUrl = page.canonicalUrl;
  const ogImage = page.ogImage;
  const ogImageAlt = page.ogImageAlt || page.title;
  const ogType = page.ogType || "website";
  const robots = page.noindex ? "noindex, nofollow" : "index, follow";

  let html = template;
  const replacements = [
    [/<title>[^<]*<\/title>/, `<title>${escapeAttr(page.title)}</title>`],
    [
      /name="title" content="[^"]*"/,
      `name="title" content="${escapeAttr(page.title)}"`,
    ],
    [
      /name="description" content="[^"]*"/,
      `name="description" content="${escapeAttr(page.description)}"`,
    ],
    [
      /name="keywords" content="[^"]*"/,
      `name="keywords" content="${escapeAttr(page.keywords || "")}"`,
    ],
    [/name="robots" content="[^"]*"/, `name="robots" content="${robots}"`],
    [
      /property="og:type" content="[^"]*"/,
      `property="og:type" content="${escapeAttr(ogType)}"`,
    ],
    [
      /property="og:url" content="[^"]*"/,
      `property="og:url" content="${escapeAttr(canonicalUrl)}"`,
    ],
    [
      /property="og:title" content="[^"]*"/,
      `property="og:title" content="${escapeAttr(page.title)}"`,
    ],
    [
      /property="og:description" content="[^"]*"/,
      `property="og:description" content="${escapeAttr(page.description)}"`,
    ],
    [
      /property="og:image" content="[^"]*"/,
      `property="og:image" content="${escapeAttr(ogImage)}"`,
    ],
    [
      /property="og:image:alt" content="[^"]*"/,
      `property="og:image:alt" content="${escapeAttr(ogImageAlt)}"`,
    ],
    [
      /name="twitter:url" content="[^"]*"/,
      `name="twitter:url" content="${escapeAttr(canonicalUrl)}"`,
    ],
    [
      /name="twitter:title" content="[^"]*"/,
      `name="twitter:title" content="${escapeAttr(page.title)}"`,
    ],
    [
      /name="twitter:description" content="[^"]*"/,
      `name="twitter:description" content="${escapeAttr(page.description)}"`,
    ],
    [
      /name="twitter:image" content="[^"]*"/,
      `name="twitter:image" content="${escapeAttr(ogImage)}"`,
    ],
    [
      /name="twitter:image:alt" content="[^"]*"/,
      `name="twitter:image:alt" content="${escapeAttr(ogImageAlt)}"`,
    ],
    [
      /rel="canonical" href="[^"]*"/,
      `rel="canonical" href="${escapeAttr(canonicalUrl)}"`,
    ],
  ];

  for (const [pattern, replacement] of replacements) {
    html = html.replace(pattern, replacement);
  }

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

  console.log(`Prerender SEO: ${pages.length} HTML shells written to dist/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
