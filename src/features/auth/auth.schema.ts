import { z } from "zod";

export const userRoleSchema = z.enum(["user", "moderator", "admin"]);

export const userSchema = z.object({
  id: z.string(),
  twitchId: z.string(),
  username: z.string(),
  displayName: z.string(),
  avatarUrl: z.string().url(),
  role: userRoleSchema,
  createdAt: z.string().datetime(),
  lastLoginAt: z.string().datetime().nullable(),
  isMuted: z.boolean(),
  isBanned: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
