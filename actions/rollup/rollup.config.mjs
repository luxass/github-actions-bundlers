// @ts-check
import { builtinModules } from "node:module";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

/**
 * @type {import("rollup").RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.cjs",
    format: "cjs",
    exports: "auto",
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
  ],
  external: [
    ...builtinModules,
    ...builtinModules.map((module) => `node:${module}`),
  ],
};
