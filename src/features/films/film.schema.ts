import { z } from "zod";

export const filmSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
  director: z.string(),
  releaseYear: z.number().int(),
  durationSeconds: z.number().int().positive(),
  videoUrl: z.string().url(),
  posterUrl: z.string().url(),
  coverUrl: z.string().url(),
  genres: z.array(z.string()).min(1),
  cast: z.array(z.string()).min(1),
  isActive: z.boolean(),
  isArchived: z.boolean(),
  publishedAt: z.string().datetime(),
  archivedAt: z.string().datetime().nullable(),
});

export type Film = z.infer<typeof filmSchema>;
