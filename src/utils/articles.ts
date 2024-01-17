import { type CollectionEntry, getCollection } from 'astro:content';
import { getDateTime } from '@utils/getDateTime.ts';

const articleMapper = (article: CollectionEntry<'articles'>) => ({
  ...article,
  slug: `/articles/${article.slug}`,
});

export const getArticleCollection = async () =>
  (await getCollection('articles', ({ data }) => !data.hideInArticleList)).map(articleMapper);

export const getArticles = async () =>
  (await getArticleCollection()).toSorted(
    (a, b) => getDateTime(b.data.date) - getDateTime(a.data.date)
  );

export const getLatestArticles = async (num = 5) => (await getArticles()).slice(0, num);

export type Articles = Awaited<ReturnType<typeof getArticles>>;

export type Article = Articles[number];
