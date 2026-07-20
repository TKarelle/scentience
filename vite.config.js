import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

const STATIC_ORIGIN_TOKEN = "__SITE_ORIGIN__";
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
  const sourcePath = path.resolve(process.cwd(), "src/config/journalArticles.js");
  const source = fs.readFileSync(sourcePath, "utf8");
  const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  const dates = [
    ...source.matchAll(/datePublished:\s*"([^"]+)"/g),
  ].map((match) => match[1]);

  return slugs.map((slug, index) => ({
    path: getArticlePath(slug),
    priority: slug === PROUST_ARTICLE_SLUG ? "0.72" : "0.68",
    changefreq: "monthly",
    lastmod: dates[index] ?? "2026-05-06",
  }));
}

function buildSitemapXml(siteOrigin) {
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

function injectStaticSiteOrigin(siteOrigin) {
  const publicDir = path.resolve(process.cwd(), "public");
  const staticSeoFiles = ["sitemap.xml", "robots.txt"];

  function withSiteOrigin(content) {
    return content.replaceAll(STATIC_ORIGIN_TOKEN, siteOrigin);
  }

  return {
    name: "inject-static-site-origin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0];
        if (!staticSeoFiles.some((fileName) => pathname === `/${fileName}`)) {
          next();
          return;
        }

        const filePath = path.join(publicDir, pathname.slice(1));
        if (!fs.existsSync(filePath)) {
          next();
          return;
        }

        const text = withSiteOrigin(fs.readFileSync(filePath, "utf8"));
        res.setHeader(
          "Content-Type",
          pathname.endsWith(".xml") ? "application/xml" : "text/plain; charset=utf-8",
        );
        res.end(text);
      });
    },
    closeBundle() {
      const dist = path.resolve(process.cwd(), "dist");
      const sitemapPath = path.join(publicDir, "sitemap.xml");
      fs.writeFileSync(sitemapPath, buildSitemapXml(siteOrigin));
      fs.writeFileSync(path.join(dist, "sitemap.xml"), buildSitemapXml(siteOrigin));

      for (const fileName of staticSeoFiles) {
        const filePath = path.join(dist, fileName);
        if (!fs.existsSync(filePath)) continue;
        fs.writeFileSync(filePath, withSiteOrigin(fs.readFileSync(filePath, "utf8")));
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteOrigin = (
    env.VITE_SITE_ORIGIN || "https://madeleine.uk"
  ).replace(/\/$/, "");

  return {
    plugins: [react(), injectStaticSiteOrigin(siteOrigin)],
    build: {
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:4242",
          changeOrigin: true,
        },
      },
    },
  };
});
