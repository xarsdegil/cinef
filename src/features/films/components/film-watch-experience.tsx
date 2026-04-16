"use client";

import { startTransition, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/features/auth/auth.schema";
import { TimedCommentsPanel } from "@/features/comments/components/timed-comments-panel";
import type { TimedComment } from "@/features/comments/timed-comment.schema";
import type { Film } from "@/features/films/film.schema";
import { EmoteBar } from "@/features/reactions/components/emote-bar";
import { TimelineStrip } from "@/features/reactions/components/timeline-strip";
import type { TimedReaction } from "@/features/reactions/timed-reaction.schema";
import { PostFilmReviewTabs } from "@/features/reviews/components/post-film-review-tabs";
import type { PostFilmReview } from "@/features/reviews/post-film-review.schema";
import { formatRuntime, formatTimestamp } from "@/lib/utils/format";
import { css } from "styled-system/css";

type Mode = "weekly" | "archive";

export const FilmWatchExperience = ({
  film,
  participants,
  viewer,
  initialComments,
  initialReactions,
  initialReviews,
  mode = "weekly",
}: {
  film: Film;
  participants: User[];
  viewer: User;
  initialComments: TimedComment[];
  initialReactions: TimedReaction[];
  initialReviews: PostFilmReview[];
  mode?: Mode;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [comments, setComments] = useState(initialComments);
  const [reactions, setReactions] = useState(initialReactions);
  const [reviews, setReviews] = useState(initialReviews);
  const [commentDraft, setCommentDraft] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  const handleSeek = (seconds: number) => {
    const video = videoRef.current;
    setCurrentTime(seconds);

    if (video) {
      video.currentTime = seconds;
    }
  };

  const handleAddComment = () => {
    const body = commentDraft.trim();

    if (!body) {
      return;
    }

    startTransition(() => {
      setComments((previous) =>
        [...previous, createComment({ filmId: film.id, userId: viewer.id, timestampSeconds: Math.round(currentTime), body })].toSorted(
          (left, right) => left.timestampSeconds - right.timestampSeconds,
        ),
      );
      setCommentDraft("");
    });
  };

  const handleAddReaction = (reactionType: TimedReaction["reactionType"], emoji: string) => {
    startTransition(() => {
      setReactions((previous) =>
        [...previous, createReaction({ filmId: film.id, userId: viewer.id, timestampSeconds: Math.round(currentTime), reactionType, emoji })].toSorted(
          (left, right) => left.timestampSeconds - right.timestampSeconds,
        ),
      );
    });
  };

  const handleAddReview = ({ body, isSpoiler }: { body: string; isSpoiler: boolean }) => {
    startTransition(() => {
      setReviews((previous) => [
        ...previous,
        createReview({ filmId: film.id, userId: viewer.id, body, isSpoiler }),
      ]);
    });
  };

  return (
    <section className={css({ display: "grid", gap: "6" })}>
      <header
        className={css({
          display: "grid",
          gap: "5",
          rounded: "l3",
          borderWidth: "1px",
          borderColor: "border",
          bg: "rgba(15, 23, 42, 0.72)",
          p: { base: "5", md: "6" },
        })}
      >
        <div className={css({ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2" })}>
          <Badge colorPalette={mode === "weekly" ? "amber" : "gray"} variant="solid">
            {mode === "weekly" ? "Canlı haftalık akış" : "Arşiv replay"}
          </Badge>
          {film.genres.map((genre) => (
            <Badge key={genre} variant="surface" colorPalette="gray">
              {genre}
            </Badge>
          ))}
        </div>
        <div className={css({ display: "grid", gap: "3", gridTemplateColumns: { base: "1fr", lg: "1.2fr 0.8fr" } })}>
          <div>
            <h1
              className={css({
                fontSize: { base: "3xl", md: "5xl" },
                lineHeight: "1.05",
                fontWeight: "semibold",
                letterSpacing: "-0.03em",
              })}
            >
              {film.title}
            </h1>
            <p className={css({ mt: "3", maxW: "2xl", color: "fg.muted", fontSize: "md", lineHeight: "1.7" })}>
              {film.description}
            </p>
          </div>
          <div className={css({ display: "grid", gap: "2", alignContent: "start", color: "fg.muted", fontSize: "sm" })}>
            <span>Yönetmen: {film.director}</span>
            <span>Yıl: {film.releaseYear}</span>
            <span>Süre: {formatRuntime(film.durationSeconds)}</span>
            <span>Oyuncular: {film.cast.join(" · ")}</span>
          </div>
        </div>
      </header>

      <div className={css({ display: "grid", gap: "6", gridTemplateColumns: { base: "1fr", xl: "minmax(0, 2fr) minmax(22rem, 0.95fr)" } })}>
        <div className={css({ display: "grid", gap: "4" })}>
          <section
            className={css({
              position: "relative",
              overflow: "hidden",
              rounded: "l3",
              borderWidth: "1px",
              borderColor: "border",
              bg: "black",
            })}
          >
            {/* Rationale: the stage keeps a clean overlay-safe frame so fullscreen comments can later reuse the same structure. */}
            <video
              ref={videoRef}
              controls
              playsInline
              poster={film.coverUrl}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              className={css({ aspectRatio: "16 / 9", w: "full", bg: "black", objectFit: "cover" })}
            >
              <source src={film.videoUrl} type="video/mp4" />
            </video>

            <div
              className={css({
                pointerEvents: "none",
                position: "absolute",
                insetX: "0",
                top: "0",
                display: "flex",
                justifyContent: "space-between",
                bg: "linear-gradient(180deg, rgba(2, 6, 23, 0.78), transparent)",
                p: { base: "4", md: "5" },
              })}
            >
              <div>
                <div
                  className={css({
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "xs",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  })}
                >
                  player stage
                </div>
                <div className={css({ mt: "1", fontSize: { base: "lg", md: "xl" }, fontWeight: "semibold" })}>
                  {film.title}
                </div>
              </div>
              <Badge colorPalette="amber" variant="solid">
                {formatTimestamp(currentTime)}
              </Badge>
            </div>
          </section>

          <TimelineStrip
            durationSeconds={film.durationSeconds}
            currentTime={currentTime}
            comments={comments}
            reactions={reactions}
            onSeek={handleSeek}
          />

          <EmoteBar currentTime={currentTime} reactions={reactions} onReact={handleAddReaction} />

          <PostFilmReviewTabs reviews={reviews} users={participants} onAddReview={handleAddReview} />
        </div>

        <div className={css({ display: "grid", gap: "4", alignContent: "start" })}>
          <TimedCommentsPanel
            comments={comments}
            currentTime={currentTime}
            users={participants}
            draft={commentDraft}
            onDraftChange={setCommentDraft}
            onSubmit={handleAddComment}
            onJump={handleSeek}
          />

          <section
            className={css({
              rounded: "l3",
              borderWidth: "1px",
              borderColor: "border",
              bg: "rgba(15, 23, 42, 0.72)",
              p: "4",
            })}
          >
            <div className={css({ color: "fg.muted", fontSize: "xs", textTransform: "uppercase", letterSpacing: "0.08em" })}>
              İzleme odası
            </div>
            <div className={css({ mt: "1", fontSize: "lg", fontWeight: "semibold" })}>Aktif katılımcılar</div>
            <div className={css({ mt: "4", display: "grid", gap: "2" })}>
              {participants.map((person) => (
                <div
                  key={person.id}
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    rounded: "l2",
                    borderWidth: "1px",
                    borderColor: "border",
                    bg: "bg.panel",
                    px: "3",
                    py: "2.5",
                  })}
                >
                  <span>{person.displayName}</span>
                  <Badge variant="surface" colorPalette={person.role === "admin" ? "amber" : "gray"}>
                    {person.role}
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

const createComment = ({
  filmId,
  userId,
  timestampSeconds,
  body,
}: Pick<TimedComment, "filmId" | "userId" | "timestampSeconds" | "body">): TimedComment => {
  const now = new Date().toISOString();

  return {
    id: `comment-${Math.random().toString(36).slice(2, 10)}`,
    filmId,
    userId,
    timestampSeconds,
    body,
    createdAt: now,
    updatedAt: now,
    isDeleted: false,
    moderationStatus: "visible",
  };
};

const createReaction = ({
  filmId,
  userId,
  timestampSeconds,
  reactionType,
  emoji,
}: Pick<TimedReaction, "filmId" | "userId" | "timestampSeconds" | "reactionType" | "emoji">): TimedReaction => ({
  id: `reaction-${Math.random().toString(36).slice(2, 10)}`,
  filmId,
  userId,
  timestampSeconds,
  reactionType,
  emoji,
  createdAt: new Date().toISOString(),
});

const createReview = ({
  filmId,
  userId,
  body,
  isSpoiler,
}: Pick<PostFilmReview, "filmId" | "userId" | "body" | "isSpoiler">): PostFilmReview => {
  const now = new Date().toISOString();

  return {
    id: `review-${Math.random().toString(36).slice(2, 10)}`,
    filmId,
    userId,
    body,
    isSpoiler,
    createdAt: now,
    updatedAt: now,
    isDeleted: false,
  };
};
