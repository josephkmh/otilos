import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['./src/AbstractGameTile.ts'],
  format: ['esm'],
  ...options,
}));
