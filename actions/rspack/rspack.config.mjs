// @ts-check
import { resolve } from "node:path";

/** @type {import("@rspack/core").Configuration} */
export default {
  target: "node",
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: resolve(import.meta.dirname, "dist"),
    filename: "index.cjs",
    library: {
      type: "commonjs2",
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
