import { z } from "zod";

export const reactionTypeSchema = z.enum([
  "laugh",
  "shock",
  "cry",
  "love",
  "fire",
  "eyes",
]);

export const timedReactionSchema = z.object({
  id: z.string(),
  filmId: z.string(),
  userId: z.string(),
  timestampSeconds: z.number().int().nonnegative(),
  reactionType: reactionTypeSchema,
  emoji: z.string(),
  createdAt: z.string().datetime(),
});

export type TimedReaction = z.infer<typeof timedReactionSchema>;
export type ReactionType = z.infer<typeof reactionTypeSchema>;
