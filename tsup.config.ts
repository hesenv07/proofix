import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'string/index': 'src/string/index.ts',
    'document/index': 'src/document/index.ts',
    'date/index': 'src/date/index.ts',
    'number/index': 'src/number/index.ts',
    'network/index': 'src/network/index.ts',
  },
  format: ['esm'],
  dts: {
    resolve: true,
    compilerOptions: {
      moduleResolution: 'node10',
      skipLibCheck: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
    },
  },
  clean: true,
  minify: true,
  outDir: 'dist',
  splitting: false,
  keepNames: true,
  treeshake: true,
  external: ['zod'],
  target: 'es2020',
});
