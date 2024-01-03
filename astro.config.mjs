import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), react()],
  adapter: vercel(),
  output: 'hybrid',
  site: 'https://techhub.iodigital.com/',
})
