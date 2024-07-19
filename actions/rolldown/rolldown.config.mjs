// @ts-check
import { builtinModules } from "node:module";
import { defineConfig } from "rolldown";

export default defineConfig({
  input: "./src/index.ts",
  output: {
    format: "cjs",
    exports: "named",
    entryFileNames: "index.cjs",
  },
  resolve: {
    conditionNames: ["import"],
  },
  external: [
    ...builtinModules,
    ...builtinModules.map((m) => `node:${m}`),
  ],
});
