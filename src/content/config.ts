import { defineCollection, reference, z } from "astro:content";

const articlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    images: z.array(z.string()).default([]),
    summary: z.string(),
    authors: z.array(reference("authors")),
    theme: z.string().optional(),
    serie: z.string().optional(),
    canonicalUrl: z.string().optional(),
  }),
});

const authorsCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional().nullable(),
    occupation: z.string().optional().nullable(),
    twitter: z.string().optional().nullable(),
    linkedin: z.string().optional().nullable(),
    github: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
    medium: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
  }),
});

export const collections = {
  articles: articlesCollection,
  authors: authorsCollection,
};
