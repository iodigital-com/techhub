import { getCollection } from 'astro:content';
import { getDateTime } from '@utils/getDateTime.ts';

export const getAllSeries = async () =>
  (await getCollection('series'))
    .map((series) => ({
      ...series,
      slug: `/series/${series.slug}`,
    }))
    .toSorted((a, b) => getDateTime(b.data.date) - getDateTime(a.data.date));

export const getLatestSeries = async (num = 5) => (await getAllSeries()).slice(0, num);
