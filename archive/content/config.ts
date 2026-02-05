import { defineCollection, z } from 'astro:content';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

const rpgSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  system: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

const workSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  organization: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

const poetrySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
});

export const collections = {
  'ars-veritatis': defineCollection({ type: 'content', schema: blogSchema }),
  'blog': defineCollection({ type: 'content', schema: blogSchema }),
  'poetry': defineCollection({ type: 'content', schema: poetrySchema }),
  'rpg': defineCollection({ type: 'content', schema: rpgSchema }),
  'work': defineCollection({ type: 'content', schema: workSchema }),
};
