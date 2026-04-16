import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { ArchiveFilmGrid } from "@/features/archive/components/archive-film-grid";
import { getArchivedFilms } from "@/lib/mock/repository";
import { css } from "styled-system/css";

export default function ArchivePage() {
  const films = getArchivedFilms();

  return (
    <PageShell>
      <section className={css({ display: "grid", gap: "6" })}>
        <div
          className={css({
            display: "grid",
            gap: "3",
            rounded: "l3",
            borderWidth: "1px",
            borderColor: "border",
            bg: "rgba(15, 23, 42, 0.72)",
            p: { base: "6", md: "8" },
          })}
        >
          <Badge colorPalette="gray" variant="subtle">
            /archive
          </Badge>
          <h1 className={css({ fontSize: { base: "3xl", md: "5xl" }, fontWeight: "semibold" })}>Geçmiş gösterimler</h1>
          <p className={css({ maxW: "2xl", color: "fg.muted", lineHeight: "1.8" })}>
            Arşiv sayfası büyüyebilecek şekilde filtre, kart ızgarası ve tekil replay route’ları üzerine kuruldu.
          </p>
        </div>
        <ArchiveFilmGrid films={films} />
      </section>
    </PageShell>
  );
}
