import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Avatar from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "@/features/auth/auth.schema";
import type { TimedComment } from "@/features/comments/timed-comment.schema";
import { formatTimestamp } from "@/lib/utils/format";
import { css } from "styled-system/css";

export const TimedCommentsPanel = ({
  comments,
  currentTime,
  users,
  draft,
  onDraftChange,
  onSubmit,
  onJump,
}: {
  comments: TimedComment[];
  currentTime: number;
  users: User[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  onJump: (seconds: number) => void;
}) => {
  const userMap = new Map(users.map((user) => [user.id, user]));
  const highlighted = comments.filter((comment) => Math.abs(comment.timestampSeconds - currentTime) <= 12);

  return (
    <aside
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "4",
        rounded: "l3",
        borderWidth: "1px",
        borderColor: "border",
        bg: "rgba(15, 23, 42, 0.72)",
        p: "4",
      })}
    >
      <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between" })}>
        <div>
          <div
            className={css({
              color: "fg.muted",
              fontSize: "xs",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            })}
          >
            Timed comments
          </div>
          <div className={css({ mt: "1", fontSize: "lg", fontWeight: "semibold" })}>
            {highlighted.length > 0 ? "Bu ana yakın yorumlar" : "Panel geçmişi"}
          </div>
        </div>
        <Badge colorPalette="amber" variant="subtle">
          {formatTimestamp(currentTime)}
        </Badge>
      </div>

      <div className={css({ display: "grid", gap: "3", maxH: "28rem", overflowY: "auto", pr: "1" })}>
        {comments.map((comment) => {
          const author = userMap.get(comment.userId);
          const isActive = Math.abs(comment.timestampSeconds - currentTime) <= 12;

          return (
            <button
              key={comment.id}
              type="button"
              onClick={() => onJump(comment.timestampSeconds)}
              className={css({
                display: "grid",
                gap: "3",
                rounded: "l2",
                borderWidth: "1px",
                borderColor: isActive ? "amber.outline.border" : "border",
                bg: isActive ? "rgba(245, 158, 11, 0.08)" : "bg.panel",
                p: "3",
                textAlign: "left",
                transitionDuration: "normal",
                transitionProperty: "background-color, border-color",
              })}
            >
              <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
                <Avatar.Root size="2xs" variant="subtle" colorPalette="amber">
                  <Avatar.Image src={author?.avatarUrl} alt={author?.displayName} />
                  <Avatar.Fallback name={author?.displayName} />
                </Avatar.Root>
                <div className={css({ display: "flex", flexDirection: "column", gap: "0.5" })}>
                  <span className={css({ fontSize: "sm", fontWeight: "medium" })}>{author?.displayName}</span>
                  <span className={css({ color: "fg.muted", fontSize: "xs" })}>{formatTimestamp(comment.timestampSeconds)}</span>
                </div>
              </div>
              <p className={css({ color: "fg.muted", fontSize: "sm", lineHeight: "1.5" })}>{comment.body}</p>
            </button>
          );
        })}
      </div>

      <div className={css({ display: "grid", gap: "3" })}>
        <label className={css({ color: "fg.muted", fontSize: "sm" })}>Oynatma anına yorum bırak</label>
        <Textarea
          minH="7rem"
          placeholder="Bu sahnede hissettiğini veya fark ettiğin detayı yaz..."
          value={draft}
          onChange={(event) => onDraftChange(event.currentTarget.value)}
        />
        <Button colorPalette="amber" onClick={onSubmit}>
          Yorumu bu ana bağla
        </Button>
      </div>
    </aside>
  );
};
