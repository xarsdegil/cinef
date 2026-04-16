import { z } from "zod";

export const postFilmReviewSchema = z.object({
  id: z.string(),
  filmId: z.string(),
  userId: z.string(),
  body: z.string().min(1).max(2000),
  isSpoiler: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isDeleted: z.boolean(),
});

export type PostFilmReview = z.infer<typeof postFilmReviewSchema>;
