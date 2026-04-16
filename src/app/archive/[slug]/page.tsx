import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { FilmWatchExperience } from "@/features/films/components/film-watch-experience";
import { getMockSession } from "@/features/auth/lib/get-mock-session";
import { getArchivedFilms, getFilmExperienceBySlug } from "@/lib/mock/repository";

export const generateStaticParams = () => getArchivedFilms().map((film) => ({ slug: film.slug }));

export default async function ArchiveFilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = getFilmExperienceBySlug(slug);
  const session = getMockSession();

  if (!experience) {
    notFound();
  }

  return (
    <PageShell>
      <FilmWatchExperience
        film={experience.film}
        participants={experience.participants}
        viewer={session.user}
        initialComments={experience.comments}
        initialReactions={experience.reactions}
        initialReviews={experience.reviews}
        mode="archive"
      />
    </PageShell>
  );
}
