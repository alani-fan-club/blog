import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().default('ALANI'),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.string(),
    targets: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { posts, projects };
