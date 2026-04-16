import { PrismaClient, ReactionType, UserRole, ModerationStatus } from "@prisma/client";
import {
  mockFilms,
  mockPostFilmReviews,
  mockTimedComments,
  mockTimedReactions,
  mockUsers,
} from "../src/lib/mock/data";

const prisma = new PrismaClient();

async function main() {
  await prisma.timedReaction.deleteMany();
  await prisma.timedComment.deleteMany();
  await prisma.postFilmReview.deleteMany();
  await prisma.film.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: mockUsers.map((user) => ({
      ...user,
      role: user.role as UserRole,
      createdAt: new Date(user.createdAt),
      lastLoginAt: user.lastLoginAt ? new Date(user.lastLoginAt) : null,
    })),
  });

  await prisma.film.createMany({
    data: mockFilms.map((film) => ({
      ...film,
      genres: JSON.stringify(film.genres),
      cast: JSON.stringify(film.cast),
      publishedAt: new Date(film.publishedAt),
      archivedAt: film.archivedAt ? new Date(film.archivedAt) : null,
    })),
  });

  for (const comment of mockTimedComments) {
    await prisma.timedComment.create({
      data: {
        ...comment,
        moderationStatus: comment.moderationStatus as ModerationStatus,
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.updatedAt),
      },
    });
  }

  for (const reaction of mockTimedReactions) {
    await prisma.timedReaction.create({
      data: {
        ...reaction,
        reactionType: reaction.reactionType as ReactionType,
        createdAt: new Date(reaction.createdAt),
      },
    });
  }

  for (const review of mockPostFilmReviews) {
    await prisma.postFilmReview.create({
      data: {
        ...review,
        createdAt: new Date(review.createdAt),
        updatedAt: new Date(review.updatedAt),
      },
    });
  }
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
