import { z } from "zod";

export const moderationStatusSchema = z.enum(["visible", "flagged", "hidden"]);

export const timedCommentSchema = z.object({
  id: z.string(),
  filmId: z.string(),
  userId: z.string(),
  timestampSeconds: z.number().int().nonnegative(),
  body: z.string().min(1).max(280),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isDeleted: z.boolean(),
  moderationStatus: moderationStatusSchema,
});

export type TimedComment = z.infer<typeof timedCommentSchema>;
export type ModerationStatus = z.infer<typeof moderationStatusSchema>;
