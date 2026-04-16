import type { TimedComment } from "@/features/comments/timed-comment.schema";
import type { TimedReaction } from "@/features/reactions/timed-reaction.schema";
import { formatTimestamp } from "@/lib/utils/format";
import { css } from "styled-system/css";

type Marker = {
  second: number;
  weight: number;
  kind: "comment" | "reaction";
};

const buildMarkers = (comments: TimedComment[], reactions: TimedReaction[]) => {
  const points = new Map<number, Marker>();

  for (const comment of comments) {
    const bucket = Math.round(comment.timestampSeconds / 8) * 8;
    const existing = points.get(bucket);
    points.set(bucket, {
      second: bucket,
      weight: (existing?.weight ?? 0) + 1,
      kind: "comment",
    });
  }

  for (const reaction of reactions) {
    const bucket = Math.round(reaction.timestampSeconds / 8) * 8;
    const existing = points.get(bucket);
    points.set(bucket, {
      second: bucket,
      weight: (existing?.weight ?? 0) + 1,
      kind: existing?.kind ?? "reaction",
    });
  }

  return [...points.values()].sort((left, right) => left.second - right.second);
};

export const TimelineStrip = ({
  durationSeconds,
  currentTime,
  comments,
  reactions,
  onSeek,
}: {
  durationSeconds: number;
  currentTime: number;
  comments: TimedComment[];
  reactions: TimedReaction[];
  onSeek: (seconds: number) => void;
}) => {
  const markers = buildMarkers(comments, reactions);
  const progress = Math.min(100, (currentTime / durationSeconds) * 100);

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
      <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between" })}>
        <div>
          <div className={css({ color: "fg.muted", fontSize: "xs", textTransform: "uppercase", letterSpacing: "0.08em" })}>
            Timeline interaction strip
          </div>
          <div className={css({ mt: "1", fontSize: "lg", fontWeight: "semibold" })}>Yorum ve emote yoğunluğu</div>
        </div>
        <div className={css({ color: "fg.muted", fontSize: "sm" })}>
          {formatTimestamp(currentTime)} / {formatTimestamp(durationSeconds)}
        </div>
      </div>

      <div className={css({ position: "relative", h: "16", rounded: "full", bg: "gray.subtle.bg", px: "2" })}>
        <div
          className={css({
            position: "absolute",
            insetY: "0",
            left: "0",
            rounded: "full",
            bg: "rgba(245, 158, 11, 0.12)",
          })}
          style={{ width: `${progress}%` }}
        />
        {markers.map((marker) => {
          const position = Math.min(100, (marker.second / durationSeconds) * 100);

          return (
            <button
              key={`${marker.kind}-${marker.second}`}
              type="button"
              aria-label={`${formatTimestamp(marker.second)} konumuna git`}
              onClick={() => onSeek(marker.second)}
              className={css({
                position: "absolute",
                top: "50%",
                h: `${Math.min(22, 8 + marker.weight * 2)}px`,
                w: "2",
                translate: "0 -50%",
                rounded: "full",
                borderWidth: "1px",
                borderColor: marker.kind === "comment" ? "amber.outline.border" : "gray.outline.border",
                bg: marker.kind === "comment" ? "amber.solid.bg" : "gray.solid.bg",
                opacity: 0.85,
              })}
              style={{ left: `${position}%` }}
            />
          );
        })}
        <div
          className={css({
            position: "absolute",
            insetY: "2",
            w: "0.5",
            rounded: "full",
            bg: "white",
            boxShadow: "0 0 0 4px rgba(251, 191, 36, 0.18)",
          })}
          style={{ left: `${progress}%` }}
        />
      </div>
    </section>
  );
};
