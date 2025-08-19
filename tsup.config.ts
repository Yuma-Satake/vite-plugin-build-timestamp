import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: false,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  outDir: 'dist',
  target: 'node14',
  external: ['vite'],
});