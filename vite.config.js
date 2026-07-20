import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { buildSitemapXml } from "./scripts/sitemapUtils.mjs";

const STATIC_ORIGIN_TOKEN = "__SITE_ORIGIN__";

function injectStaticSiteOrigin(siteOrigin) {
  const publicDir = path.resolve(process.cwd(), "public");

  function withSiteOrigin(content) {
    return content.replaceAll(STATIC_ORIGIN_TOKEN, siteOrigin);
  }

  return {
    name: "inject-static-site-origin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0];
        if (pathname === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml");
          res.end(buildSitemapXml(siteOrigin));
          return;
        }
        if (pathname === "/robots.txt") {
          const filePath = path.join(publicDir, "robots.txt");
          if (!fs.existsSync(filePath)) {
            next();
            return;
          }
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(withSiteOrigin(fs.readFileSync(filePath, "utf8")));
          return;
        }
        next();
      });
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
