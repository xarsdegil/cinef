import type { Route } from "next";
import NextLink from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Film } from "@/features/films/film.schema";
import { formatRuntime } from "@/lib/utils/format";
import { css } from "styled-system/css";

export const WeeklyFilmHero = ({
  film,
  timedCommentCount,
  reactionCount,
  participantCount,
}: {
  film: Film;
  timedCommentCount: number;
  reactionCount: number;
  participantCount: number;
}) => (
  <section
    className={css({
      position: "relative",
      overflow: "hidden",
      rounded: "l3",
      borderWidth: "1px",
      borderColor: "rgba(255,255,255,0.08)",
      bg: "rgba(15, 23, 42, 0.72)",
      px: { base: "5", md: "8", xl: "10" },
      py: { base: "8", md: "10", xl: "12" },
      boxShadow: "lg",
    })}
  >
    <div
      className={css({
        pointerEvents: "none",
        position: "absolute",
        inset: "0",
        backgroundImage:
          `linear-gradient(90deg, rgba(2, 6, 23, 0.92) 10%, rgba(2, 6, 23, 0.6) 55%, rgba(2, 6, 23, 0.4) 100%), url(${film.coverUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        opacity: 0.42,
      })}
    />
    <div
      className={css({
        position: "relative",
        display: "grid",
        gap: "8",
        alignItems: "end",
        gridTemplateColumns: { base: "1fr", lg: "1.5fr 0.9fr" },
      })}
    >
      <div className={css({ maxW: "2xl" })}>
        <Badge colorPalette="amber" variant="solid">
          Bu haftanın filmi
        </Badge>
        <h1
          className={css({
            mt: "4",
            fontSize: { base: "4xl", md: "6xl" },
            lineHeight: "1.02",
            fontWeight: "semibold",
            letterSpacing: "-0.03em",
          })}
        >
          {film.title}
        </h1>
        <p className={css({ mt: "4", maxW: "xl", color: "fg.muted", fontSize: { base: "md", md: "lg" } })}>
          {film.tagline}
        </p>
        <div className={css({ mt: "6", display: "flex", flexWrap: "wrap", gap: "2" })}>
          {film.genres.map((genre) => (
            <Badge key={genre} variant="surface" colorPalette="gray">
              {genre}
            </Badge>
          ))}
          <Badge variant="surface" colorPalette="gray">
            {film.director}
          </Badge>
          <Badge variant="surface" colorPalette="gray">
            {film.releaseYear}
          </Badge>
          <Badge variant="surface" colorPalette="gray">
            {formatRuntime(film.durationSeconds)}
          </Badge>
        </div>
        <div className={css({ mt: "8", display: "flex", flexWrap: "wrap", gap: "3" })}>
          <Button asChild colorPalette="amber">
            <NextLink href={`/film/${film.slug}` as Route}>Haftanın filmine git</NextLink>
          </Button>
          <Button asChild variant="surface" colorPalette="gray">
            <NextLink href="/archive">Arşivi incele</NextLink>
          </Button>
        </div>
      </div>

      <div
        className={css({
          display: "grid",
          gap: "3",
          rounded: "l3",
          borderWidth: "1px",
          borderColor: "rgba(255,255,255,0.10)",
          bg: "rgba(15, 23, 42, 0.72)",
          p: "5",
        })}
      >
        {[
          { label: "Zamanlı yorum", value: timedCommentCount },
          { label: "Emote izi", value: reactionCount },
          { label: "Katılımcı", value: participantCount },
        ].map((item) => (
          <div
            key={item.label}
            className={css({
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              borderBottomWidth: "1px",
              borderColor: "rgba(255,255,255,0.06)",
              pb: "3",
              _last: { borderBottomWidth: "0", pb: "0" },
            })}
          >
            <span className={css({ color: "fg.muted", fontSize: "sm" })}>{item.label}</span>
            <span className={css({ fontSize: "2xl", fontWeight: "semibold" })}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
