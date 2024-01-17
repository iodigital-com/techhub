import { type CollectionEntry, getCollection } from 'astro:content';

const talkMapper = (talk: CollectionEntry<'talks'>) => ({
  ...talk,
  slug: `/talks/${talk.slug}`,
});

export const getTalks = async () => (await getCollection('talks')).map(talkMapper);

export type Talks = Awaited<ReturnType<typeof getTalks>>;

export type Talk = Talks[number];
