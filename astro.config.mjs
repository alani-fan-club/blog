import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://alanifan.club',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [mdx()],
});
