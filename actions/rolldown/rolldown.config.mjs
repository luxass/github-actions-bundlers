import { builtinModules } from "node:module";
import { defineConfig } from "rolldown";

export default defineConfig({
  input: "./src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    exports: "auto",
  },
  resolve: {
    conditionNames: ["import"],
  },
  external: [
    ...builtinModules,
    ...builtinModules.map((m) => `node:${m}`),
  ],
});
