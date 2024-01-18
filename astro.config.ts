import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import { remarkReadingTime } from './src/utils/remark-reading-time';
import remarkToc from 'remark-toc';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    tailwind({
      // Allow writing nested CSS declarations alongside Tailwind's syntax
      nesting: true,
    }),
    react(),
    sitemap(),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    icon(),
    pagefind(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkToc],
  },
  adapter: vercel(),
  output: 'hybrid',
  site: 'https://techhub.iodigital.com/',
});
