import type { CollectionEntry } from 'astro:content';

type SerieInformation = CollectionEntry<'articles'>['data'];

export interface Serie extends SerieInformation {
  articles: CollectionEntry<'articles'>[];
}
