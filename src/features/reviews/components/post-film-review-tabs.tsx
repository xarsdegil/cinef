"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as Tabs from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "@/features/auth/auth.schema";
import type { PostFilmReview } from "@/features/reviews/post-film-review.schema";
import { formatDateLabel } from "@/lib/utils/format";
import { css } from "styled-system/css";

export const PostFilmReviewTabs = ({
  reviews,
  users,
  onAddReview,
}: {
  reviews: PostFilmReview[];
  users: User[];
  onAddReview: (options: { body: string; isSpoiler: boolean }) => void;
}) => {
  const [safeDraft, setSafeDraft] = useState("");
  const [spoilerDraft, setSpoilerDraft] = useState("");
  const userMap = new Map(users.map((user) => [user.id, user]));
  const spoilerFreeReviews = reviews.filter((review) => !review.isSpoiler);
  const spoilerReviews = reviews.filter((review) => review.isSpoiler);

  return (
    <section
      className={css({
        display: "grid",
        gap: "4",
        rounded: "l3",
        borderWidth: "1px",
        borderColor: "border",
        bg: "rgba(15, 23, 42, 0.72)",
        p: "4",
      })}
    >
      <div>
        <div className={css({ color: "fg.muted", fontSize: "xs", textTransform: "uppercase", letterSpacing: "0.08em" })}>
          Film sonu yorumlar
        </div>
        <div className={css({ mt: "1", fontSize: "lg", fontWeight: "semibold" })}>
          Spoilerlı ve spoilersız tartışma alanı
        </div>
      </div>

      <Tabs.Root defaultValue="spoiler-free">
        <Tabs.List>
          <Tabs.Trigger value="spoiler-free">Spoilersız</Tabs.Trigger>
          <Tabs.Trigger value="spoiler">Spoilerlı</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>

        <Tabs.Content value="spoiler-free" className={css({ mt: "4" })}>
          <ReviewPanel
            reviews={spoilerFreeReviews}
            users={userMap}
            draft={safeDraft}
            onDraftChange={setSafeDraft}
            onSubmit={() => {
              if (!safeDraft.trim()) {
                return;
              }

              onAddReview({ body: safeDraft.trim(), isSpoiler: false });
              setSafeDraft("");
            }}
            placeholder="Filmi bitirmemiş olanların da güvenle okuyabileceği yorum..."
          />
        </Tabs.Content>

        <Tabs.Content value="spoiler" className={css({ mt: "4" })}>
          <ReviewPanel
            reviews={spoilerReviews}
            users={userMap}
            draft={spoilerDraft}
            onDraftChange={setSpoilerDraft}
            onSubmit={() => {
              if (!spoilerDraft.trim()) {
                return;
              }

              onAddReview({ body: spoilerDraft.trim(), isSpoiler: true });
              setSpoilerDraft("");
            }}
            placeholder="Spoiler serbest: final, dönüşler ve çözümleme notları..."
          />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
};

const ReviewPanel = ({
  reviews,
  users,
  draft,
  onDraftChange,
  onSubmit,
  placeholder,
}: {
  reviews: PostFilmReview[];
  users: Map<string, User>;
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
}) => (
  <div className={css({ display: "grid", gap: "4" })}>
    <div className={css({ display: "grid", gap: "3" })}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <article
            key={review.id}
            className={css({
              rounded: "l2",
              borderWidth: "1px",
              borderColor: "border",
              bg: "bg.panel",
              p: "4",
            })}
          >
            <div className={css({ display: "flex", justifyContent: "space-between", gap: "3" })}>
              <span className={css({ fontWeight: "medium" })}>{users.get(review.userId)?.displayName}</span>
              <span className={css({ color: "fg.muted", fontSize: "xs" })}>{formatDateLabel(review.createdAt)}</span>
            </div>
            <p className={css({ mt: "3", color: "fg.muted", fontSize: "sm", lineHeight: "1.7" })}>{review.body}</p>
          </article>
        ))
      ) : (
        <div
          className={css({
            rounded: "l2",
            borderWidth: "1px",
            borderStyle: "dashed",
            borderColor: "border",
            p: "4",
            color: "fg.muted",
            fontSize: "sm",
          })}
        >
          Bu sekmede henüz yorum yok.
        </div>
      )}
    </div>
    <div className={css({ display: "grid", gap: "3" })}>
      <Textarea value={draft} onChange={(event) => onDraftChange(event.currentTarget.value)} minH="8rem" placeholder={placeholder} />
      <Button colorPalette="amber" onClick={onSubmit}>
        Yorumu ekle
      </Button>
    </div>
  </div>
);
