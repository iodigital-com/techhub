import { getEntry, type CollectionEntry } from 'astro:content';

export async function getSeries(
  articles: CollectionEntry<'articles'>[],
  article: CollectionEntry<'articles'>
) {
  if (!article.data.serie) return [];

  const filteredArticles = articles.filter((x) => article.data.serie === x.data.serie);
  const serieInformation = await getEntry('series', article.data.serie);

  return {
    articles: filteredArticles,
    serie: article.data.serie,
    ...serieInformation?.data,
  };
}
