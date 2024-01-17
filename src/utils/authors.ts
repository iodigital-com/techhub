import { getCollection } from 'astro:content';
import { shuffle } from '@utils/shuffle.ts';

export const getAllAuthors = async () => shuffle(await getCollection('authors'));
