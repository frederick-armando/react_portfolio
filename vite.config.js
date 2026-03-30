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

export default defineConfig({
  plugins: [react(), inlineEntryCssPlugin()],
  assetsInclude: ['**/*.wp2'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('lucide-react')) return 'lucide-react';
        },
      },
    },
  },
});
