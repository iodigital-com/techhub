import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'
import sitemap from '@astrojs/sitemap'

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
  ],
  adapter: vercel(),
  output: 'hybrid',
  site: 'https://techhub.iodigital.com/',
})
