/// <reference types="vitest" />
import camelCase from "camelcase";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

const packageName = packageJson.name.split("/").pop() || packageJson.name;

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      name: camelCase(packageName, { pascalCase: true }),
      fileName: packageName,
    },
  },
  plugins: [dts({ rollupTypes: true })],
  test: {},
});
