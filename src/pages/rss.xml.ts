import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function GET(context: any) {
  return rss({
    title: 'TechHub | Blog',
    description: 'TechHub',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./content/articles/**/*.md')),
    customData: `<language>en-us</language>`,
  })
}
