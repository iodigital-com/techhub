import { defineCollection, z } from "astro:content";

const articlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    images: z.array(z.string()).default([]),
    summary: z.string(),
    authors: z.array(z.string()),
    theme: z.string().optional(),
    serie: z.string().optional(),
    canonicalUrl: z.string().optional(),
  }),
});

export const collections = {
  articles: articlesCollection,
};
