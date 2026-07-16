import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function inlineEntryCssPlugin() {
  return {
    name: 'inline-entry-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx?.bundle) {
        return html;
      }

      const cssAsset = Object.values(ctx.bundle).find(
        (chunk) =>
          chunk.type === 'asset' &&
          typeof chunk.fileName === 'string' &&
          /^assets\/index-.*\.css$/.test(chunk.fileName),
      );

      if (!cssAsset || typeof cssAsset.source !== 'string') {
        return html;
      }

      const safeCss = cssAsset.source.replace(/<\/style/gi, '<\\/style');

      return html
        .replace(
          /<link rel="stylesheet"[^>]*href="\/assets\/index-[^"]+\.css"[^>]*>/,
          `<style>${safeCss}</style>`,
        );
    },
  };
}

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(resolve(__dirname, './package.json'), 'utf-8'));

export default defineConfig({
  plugins: [react(), inlineEntryCssPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  assetsInclude: ['**/*.wp2'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router/') ||
            id.includes('/react-router-dom/') ||
            id.includes('/scheduler/')
          ) {
            return 'react-vendor';
          }
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('lucide-react')) return 'lucide-react';
        },
      },
    },
  },
});
