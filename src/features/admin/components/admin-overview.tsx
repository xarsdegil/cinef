import { Badge } from "@/components/ui/badge";
import * as Card from "@/components/ui/card";
import type { User } from "@/features/auth/auth.schema";
import type { TimedComment } from "@/features/comments/timed-comment.schema";
import type { Film } from "@/features/films/film.schema";
import { formatDateLabel } from "@/lib/utils/format";
import { css } from "styled-system/css";

export const AdminOverview = ({
  activeFilm,
  users,
  archivedFilms,
  moderationQueue,
  totalComments,
  totalReactions,
  totalReviews,
}: {
  activeFilm: Film;
  users: User[];
  archivedFilms: Film[];
  moderationQueue: TimedComment[];
  totalComments: number;
  totalReactions: number;
  totalReviews: number;
}) => (
  <section className={css({ display: "grid", gap: "6" })}>
    <div className={css({ display: "grid", gap: "4", gridTemplateColumns: { base: "1fr", md: "repeat(4, minmax(0, 1fr))" } })}>
      {[
        { label: "Aktif film", value: activeFilm.title },
        { label: "Toplam yorum", value: String(totalComments) },
        { label: "Toplam emote", value: String(totalReactions) },
        { label: "Genel review", value: String(totalReviews) },
      ].map((item) => (
        <Card.Root key={item.label} variant="outline">
          <Card.Header>
            <Card.Description>{item.label}</Card.Description>
            <Card.Title>{item.value}</Card.Title>
          </Card.Header>
        </Card.Root>
      ))}
    </div>

    <div className={css({ display: "grid", gap: "4", gridTemplateColumns: { base: "1fr", xl: "1.2fr 0.8fr" } })}>
      <Card.Root variant="outline">
        <Card.Header>
          <Badge colorPalette="amber" variant="subtle">
            Moderasyon
          </Badge>
          <Card.Title>İzleme akışında kontrol edilecek yorumlar</Card.Title>
          <Card.Description>İlk iterasyonda içerik kaldırma ve rate-limit UI’si yerine görünür queue bırakıldı.</Card.Description>
        </Card.Header>
        <Card.Body>
          <div className={css({ display: "grid", gap: "3" })}>
            {moderationQueue.map((comment) => (
              <div
                key={comment.id}
                className={css({
                  rounded: "l2",
                  borderWidth: "1px",
                  borderColor: "border",
                  bg: "bg.panel",
                  p: "4",
                })}
              >
                <div className={css({ display: "flex", justifyContent: "space-between", gap: "3" })}>
                  <span className={css({ fontWeight: "medium" })}>{comment.userId}</span>
                  <span className={css({ color: "fg.muted", fontSize: "xs" })}>{comment.timestampSeconds}. saniye</span>
                </div>
                <p className={css({ mt: "2", color: "fg.muted", fontSize: "sm" })}>{comment.body}</p>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card.Root>

      <div className={css({ display: "grid", gap: "4" })}>
        <Card.Root variant="outline">
          <Card.Header>
            <Card.Title>Kullanıcı rolleri</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className={css({ display: "grid", gap: "2" })}>
              {users.map((user) => (
                <div key={user.id} className={css({ display: "flex", justifyContent: "space-between", gap: "3" })}>
                  <span>{user.displayName}</span>
                  <Badge colorPalette={user.role === "admin" ? "amber" : "gray"} variant="surface">
                    {user.role}
                  </Badge>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline">
          <Card.Header>
            <Card.Title>Arşiv takvimi</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className={css({ display: "grid", gap: "3" })}>
              {archivedFilms.map((film) => (
                <div key={film.id} className={css({ display: "grid", gap: "1" })}>
                  <span className={css({ fontWeight: "medium" })}>{film.title}</span>
                  <span className={css({ color: "fg.muted", fontSize: "sm" })}>
                    {formatDateLabel(film.archivedAt ?? film.publishedAt)}
                  </span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card.Root>
      </div>
    </div>
  </section>
);
