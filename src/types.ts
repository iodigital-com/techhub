import type { CollectionEntry } from "astro:content"

export type SerieInformation = CollectionEntry<'articles'>['data']

export interface Serie extends SerieInformation {
  articles: CollectionEntry<'articles'>[]
}
