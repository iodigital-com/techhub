import { getCollection } from 'astro:content';
import { getDateTime } from '@utils/getDateTime.ts';

export const getAllArticles = async () =>
  (await getCollection('articles', ({ data }) => !data.hideInArticleList))
    .map((article) => ({
      ...article,
      slug: `/articles/${article.slug}`,
    }))
    .toSorted((a, b) => getDateTime(b.data.date) - getDateTime(a.data.date));

export const getLatestArticles = async (num = 5) => (await getAllArticles()).slice(0, num);
