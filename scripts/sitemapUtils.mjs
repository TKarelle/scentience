import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const PROUST_ARTICLE_SLUG =
  "the-proust-project-how-scent-encodes-memory-forever";

const STATIC_SITEMAP_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: "2026-07-20" },
  {
    path: "/product/original-bespoke",
    priority: "0.95",
    changefreq: "weekly",
    lastmod: "2026-06-08",
  },
  {
    path: "/the-process",
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-05-06",
  },
  {
    path: "/journal",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-05-06",
  },
  {
    path: "/the-science",
    priority: "0.82",
    changefreq: "monthly",
    lastmod: "2026-05-06",
  },
  {
    path: "/science/what-is-your-proust-madeleine",
    priority: "0.78",
    changefreq: "monthly",
    lastmod: "2026-05-19",
  },
  {
    path: "/contact",
    priority: "0.4",
    changefreq: "yearly",
    lastmod: "2026-06-11",
  },
  {
    path: "/terms",
    priority: "0.35",
    changefreq: "yearly",
    lastmod: "2026-05-06",
  },
];

function getArticlePath(slug) {
  if (slug === PROUST_ARTICLE_SLUG) return "/journal/the-proust-project";
  return `/article/${slug}`;
}

function parseJournalArticlesFromSource() {
  const sourcePath = path.join(root, "src/config/journalArticles.js");
  const source = fs.readFileSync(sourcePath, "utf8");
  const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  const dates = [...source.matchAll(/datePublished:\s*"([^"]+)"/g)].map(
    (match) => match[1],
  );

  return slugs.map((slug, index) => ({
    path: getArticlePath(slug),
    priority: slug === PROUST_ARTICLE_SLUG ? "0.72" : "0.68",
    changefreq: "monthly",
    lastmod: dates[index] ?? "2026-05-06",
  }));
}

export function buildSitemapXml(siteOrigin) {
  const urls = [...STATIC_SITEMAP_ROUTES, ...parseJournalArticlesFromSource()];
  const body = urls
    .map(
      (entry) => `  <url>
    <loc>${siteOrigin}${entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${body}
</urlset>
`;
}

export function writeSeoStaticFiles(distDir, siteOrigin) {
  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(
    path.join(distDir, "sitemap.xml"),
    buildSitemapXml(siteOrigin),
  );

  const robotsTemplate = fs.readFileSync(
    path.join(root, "public/robots.txt"),
    "utf8",
  );
  fs.writeFileSync(
    path.join(distDir, "robots.txt"),
    robotsTemplate.replaceAll("__SITE_ORIGIN__", siteOrigin),
  );
}
