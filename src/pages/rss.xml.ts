import rss from '@astrojs/rss';
import { getArticles } from '@utils/articles.ts';

export async function GET(context: any) {
  const articles = await getArticles();

  const items = articles
    .sort((a, b) => Date.parse(b.data.date) - Date.parse(a.data.date))
    .map(({ data: { date, title, summary }, slug }) => ({
      title,
      description: summary,
      link: slug,
      pubDate: new Date(date),
    }));

  return rss({
    title: 'TechHub | Blog',
    description: 'TechHub',
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}
