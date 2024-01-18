import { type CollectionEntry, getCollection, getEntries } from 'astro:content';
import { shuffle } from '@utils/shuffle.ts';

const authorMapper = (author: CollectionEntry<'authors'>) => ({
  ...author,
  slug: `/authors/${author.slug}`,
});

export const getAuthorCollection = async () => (await getCollection('authors')).map(authorMapper);

export const getAuthors = async () => shuffle(await getAuthorCollection());

// TODO: Check if the as can be avoided
export const getAuthorEntries = async <T>(authors: T) =>
  (await getEntries(authors as CollectionEntry<'authors'>[])).map(authorMapper);

export type Authors = Awaited<ReturnType<typeof getAuthors>>;

export type Author = Authors[number];
