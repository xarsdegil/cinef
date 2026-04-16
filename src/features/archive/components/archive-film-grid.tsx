"use client";

import type { Route } from "next";
import NextLink from "next/link";
import { useDeferredValue, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Film } from "@/features/films/film.schema";
import { formatDateLabel, formatRuntime } from "@/lib/utils/format";
import { css } from "styled-system/css";

export const ArchiveFilmGrid = ({ films }: { films: Film[] }) => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLocaleLowerCase("tr-TR");
  const filteredFilms =
    normalizedQuery.length === 0
      ? films
      : films.filter((film) =>
          [film.title, film.director, ...film.genres]
            .join(" ")
            .toLocaleLowerCase("tr-TR")
            .includes(normalizedQuery),
        );

  return (
    <section className={css({ display: "grid", gap: "5" })}>
      <div className={css({ display: "grid", gap: "3", gridTemplateColumns: { base: "1fr", lg: "1.2fr 0.8fr" } })}>
        <Input
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Film adı, yönetmen veya tür ara"
          size="lg"
        />
        <div className={css({ color: "fg.muted", fontSize: "sm", alignSelf: "center", textAlign: { base: "left", lg: "right" } })}>
          {filteredFilms.length} arşiv kaydı gösteriliyor
        </div>
      </div>

      <div className={css({ display: "grid", gap: "4", gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" } })}>
        {filteredFilms.map((film) => (
          <NextLink
            key={film.id}
            href={`/archive/${film.slug}` as Route}
            className={css({
              display: "grid",
              gap: "4",
              rounded: "l3",
              borderWidth: "1px",
              borderColor: "border",
              bg: "rgba(15, 23, 42, 0.72)",
              p: "5",
              transitionDuration: "normal",
              transitionProperty: "transform, border-color",
              _hover: {
                translate: "0 -2px",
                borderColor: "borderStrong",
              },
            })}
          >
            <div
              className={css({
                aspectRatio: "16 / 9",
                rounded: "l2",
                backgroundImage:
                  `linear-gradient(135deg, rgba(2, 6, 23, 0.28), rgba(2, 6, 23, 0.82)), url(${film.coverUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              })}
            />
            <div className={css({ display: "grid", gap: "2" })}>
              <div className={css({ display: "flex", flexWrap: "wrap", gap: "2" })}>
                <Badge variant="surface" colorPalette="gray">
                  {formatDateLabel(film.archivedAt ?? film.publishedAt)}
                </Badge>
                <Badge variant="surface" colorPalette="gray">
                  {formatRuntime(film.durationSeconds)}
                </Badge>
              </div>
              <h3 className={css({ fontSize: "xl", fontWeight: "semibold" })}>{film.title}</h3>
              <p className={css({ color: "fg.muted", fontSize: "sm", lineHeight: "1.6" })}>{film.tagline}</p>
            </div>
          </NextLink>
        ))}
      </div>
    </section>
  );
};
