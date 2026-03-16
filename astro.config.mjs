import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alanifan.club',
  output: 'static',
  build: {
    format: 'directory',
  },
});
