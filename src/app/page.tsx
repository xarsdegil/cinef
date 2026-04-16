import type { Route } from "next";
import NextLink from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WeeklyFilmHero } from "@/features/films/components/weekly-film-hero";
import { siteConfig } from "@/lib/config/site";
import { getLandingPageData } from "@/lib/mock/repository";
import { css } from "styled-system/css";

export default function HomePage() {
  const { activeFilm, archive, timedCommentCount, reactionCount, participantCount } = getLandingPageData();

  return (
    <PageShell>
      <div className={css({ display: "grid", gap: "8" })}>
        <WeeklyFilmHero
          film={activeFilm}
          timedCommentCount={timedCommentCount}
          reactionCount={reactionCount}
          participantCount={participantCount}
        />

        <section className={css({ display: "grid", gap: "4", gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" } })}>
          {[
            {
              title: "Zaman katmanı",
              description: "Yorumlar klasik yorum akışı gibi değil; oynatma zamanına bağlı yaşayan bir katman gibi çalışıyor.",
            },
            {
              title: "Emote yoğunluğu",
              description: "Timeline strip, en çok reaksiyon alan sahneleri tek bakışta görünür kılacak şekilde kuruldu.",
            },
            {
              title: "Arşiv tekrar izleme",
              description: "Geçmiş filmler ayrı route’larda aynı veri modelini kullanıyor; replay modu için zemin hazır.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className={css({
                rounded: "l3",
                borderWidth: "1px",
                borderColor: "border",
                bg: "rgba(15, 23, 42, 0.72)",
                p: "5",
              })}
            >
              <h2 className={css({ fontSize: "xl", fontWeight: "semibold" })}>{item.title}</h2>
              <p className={css({ mt: "3", color: "fg.muted", fontSize: "sm", lineHeight: "1.7" })}>{item.description}</p>
            </article>
          ))}
        </section>

        <section
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
          <div className={css({ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "3" })}>
            <div>
              <Badge colorPalette="gray" variant="subtle">
                Neden bu temel?
              </Badge>
              <h2 className={css({ mt: "2", fontSize: "2xl", fontWeight: "semibold" })}>{siteConfig.tagline}</h2>
            </div>
            <Button asChild variant="surface" colorPalette="gray">
              <NextLink href="/login">Mock login akışını gör</NextLink>
            </Button>
          </div>
          <p className={css({ maxW: "3xl", color: "fg.muted", lineHeight: "1.8" })}>{siteConfig.description}</p>
        </section>

        <section className={css({ display: "grid", gap: "4" })}>
          <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3" })}>
            <h2 className={css({ fontSize: "2xl", fontWeight: "semibold" })}>Son arşivlenen filmler</h2>
            <Button asChild variant="plain" colorPalette="gray">
              <NextLink href="/archive">Tüm arşivi aç</NextLink>
            </Button>
          </div>
          <div className={css({ display: "grid", gap: "4", gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" } })}>
            {archive.map((film) => (
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
                })}
              >
                <div
                  className={css({
                    aspectRatio: "16 / 9",
                    rounded: "l2",
                    backgroundImage:
                      `linear-gradient(135deg, rgba(2, 6, 23, 0.24), rgba(2, 6, 23, 0.82)), url(${film.coverUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  })}
                />
                <div className={css({ display: "grid", gap: "2" })}>
                  <h3 className={css({ fontSize: "xl", fontWeight: "semibold" })}>{film.title}</h3>
                  <p className={css({ color: "fg.muted", fontSize: "sm", lineHeight: "1.6" })}>{film.tagline}</p>
                </div>
              </NextLink>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
