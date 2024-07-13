import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["cjs"],
  clean: true,
  dts: false,
  treeshake: true,
  bundle: true,
  noExternal: ["@actions/core"],
  skipNodeModulesBundle: true,
});
