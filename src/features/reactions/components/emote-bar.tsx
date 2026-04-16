import { Button } from "@/components/ui/button";
import type { TimedReaction } from "@/features/reactions/timed-reaction.schema";
import { formatTimestamp } from "@/lib/utils/format";
import { css } from "styled-system/css";

const emotes = [
  { emoji: "😂", label: "Komik", reactionType: "laugh" },
  { emoji: "😮", label: "Şaşkınlık", reactionType: "shock" },
  { emoji: "😢", label: "Duygusal", reactionType: "cry" },
  { emoji: "❤️", label: "Sevgi", reactionType: "love" },
  { emoji: "🔥", label: "Etkileyici", reactionType: "fire" },
  { emoji: "👀", label: "Dikkat", reactionType: "eyes" },
] as const;

export const EmoteBar = ({
  currentTime,
  reactions,
  onReact,
}: {
  currentTime: number;
  reactions: TimedReaction[];
  onReact: (reactionType: TimedReaction["reactionType"], emoji: string) => void;
}) => (
  <section
    className={css({
      display: "grid",
      gap: "3",
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
          Emote bar
        </div>
        <div className={css({ mt: "1", fontSize: "lg", fontWeight: "semibold" })}>Hızlı tepki gönder</div>
      </div>
      <div className={css({ color: "fg.muted", fontSize: "sm" })}>{formatTimestamp(currentTime)}</div>
    </div>
    <div className={css({ display: "grid", gap: "3", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" })}>
      {emotes.map((emote) => {
        const count = reactions.filter((reaction) => reaction.reactionType === emote.reactionType).length;

        return (
          <Button
            key={emote.reactionType}
            variant="surface"
            colorPalette="gray"
            onClick={() => onReact(emote.reactionType, emote.emoji)}
            className={css({ justifyContent: "space-between" })}
          >
            <span>{emote.emoji}</span>
            <span className={css({ color: "fg.muted", fontSize: "xs" })}>{count}</span>
          </Button>
        );
      })}
    </div>
  </section>
);
