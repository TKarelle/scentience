import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

const STATIC_ORIGIN_TOKEN = "__SITE_ORIGIN__";

function injectStaticSiteOrigin(siteOrigin) {
  return {
    name: "inject-static-site-origin",
    closeBundle() {
      const dist = path.resolve(process.cwd(), "dist");
      for (const fileName of ["sitemap.xml", "robots.txt"]) {
        const filePath = path.join(dist, fileName);
        if (!fs.existsSync(filePath)) continue;
        let text = fs.readFileSync(filePath, "utf8");
        text = text.replaceAll(STATIC_ORIGIN_TOKEN, siteOrigin);
        fs.writeFileSync(filePath, text);
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
