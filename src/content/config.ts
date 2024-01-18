import { ALLOWED_TAGS, ALLOWED_THEMES } from '@constants/constants.ts';
import { defineCollection, reference, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.string(),
      images: z.array(image()).default([]),
      summary: z.string(),
      authors: z.array(reference('authors')),
      theme: z.enum(ALLOWED_THEMES).optional(),
      tags: z.array(z.enum(ALLOWED_TAGS)).optional(),
      series: z.string().optional(),
      canonicalUrl: z.string().optional(),
      hideInArticleList: z.boolean().optional(),
    }),
});

const authorsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      occupation: z.string().optional().nullable(),
      twitter: z.string().optional().nullable(),
      linkedin: z.string().optional().nullable(),
      github: z.string().optional().nullable(),
      website: z.string().optional().nullable(),
      medium: z.string().optional().nullable(),
      email: z.string().optional().nullable(),
    }),
});

const talksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    authors: z.array(reference('authors')),
    video: z.string().optional(),
    slides: z.string().optional(),
  }),
});

const seriesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.string(),
      summary: z.string(),
      authors: z.array(reference('authors')),
      theme: z.enum(ALLOWED_THEMES).optional(),
      images: z.array(image()).default([]),
    }),
});

export const collections = {
  articles: articlesCollection,
  authors: authorsCollection,
  talks: talksCollection,
  series: seriesCollection,
};
