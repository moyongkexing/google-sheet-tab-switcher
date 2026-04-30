import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
  },
  lint: {
    ignorePatterns: ['.output/**', '.wxt/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
