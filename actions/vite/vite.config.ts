import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
    target: "node20",
    ssr: true,
    rollupOptions: {
      input: ["src/index.ts"],
      output: {
        entryFileNames: "index.cjs",
        format: "cjs",
        exports: "auto",
      },
    },
  },
  ssr: {
    // Anything NOT 'node:' will be bundled.
    noExternal: /^(?!node:)/,
  },
});
