import { type CollectionEntry } from 'astro:content';

export function getSeries(
  articles: CollectionEntry<'articles'>[],
  article: CollectionEntry<'articles'>
) {
  if (!article.data.serie) return [];

  return articles.filter((x) => {
    if (article.id === x.id) {
      return false;
    }

    if (article.data.serie === x.data.serie) {
      return true;
    }

    return false;
  });
}
