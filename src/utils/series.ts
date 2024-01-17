import { type CollectionEntry, getCollection } from 'astro:content';
import { getDateTime } from '@utils/getDateTime.ts';
import { getAuthorEntries } from '@utils/authors.ts';
import { getArticleCollection } from '@utils/articles.ts';

const seriesMapper = (series: CollectionEntry<'series'>) => ({
  ...series,
  slug: `/series/${series.slug}`,
});

export const getSeriesCollection = async () => (await getCollection('series')).map(seriesMapper);

export const getSeries = async () => {
  const seriesCollection = await getSeriesCollection();

  const series = await Promise.all(
    seriesCollection.map(async (series) => {
      const seriesSlug = series.slug.replace('/series/', '');

      const articles = (await getArticleCollection()).filter(
        ({ data }) => data.series === seriesSlug
      );

      const sortedArticles = articles.toSorted(
        (a, b) => getDateTime(a.data.date) - getDateTime(b.data.date)
      );

      // TODO: Correct type
      const authors = await getAuthorEntries(series.data.authors as any);

      return {
        ...series,
        articles: sortedArticles,
        authors,
      };
    })
  );

  return series.toSorted((a, b) => getDateTime(b.data.date) - getDateTime(a.data.date));
};

export type Series = Awaited<ReturnType<typeof getSeries>>;

export type Serie = Series[number];
