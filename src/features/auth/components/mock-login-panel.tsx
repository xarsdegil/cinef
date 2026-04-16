import type { Route } from "next";
import NextLink from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import type { User } from "@/features/auth/auth.schema";
import { css } from "styled-system/css";

export const MockLoginPanel = ({ viewer, filmSlug }: { viewer: User; filmSlug: string }) => (
  <Card.Root variant="outline">
    <Card.Header>
      <Badge colorPalette="amber" variant="subtle">
        İlk iterasyon
      </Badge>
      <Card.Title>Twitch akışına hazır mock oturum</Card.Title>
      <Card.Description>
        Giriş bileşeni şimdilik sabit bir kullanıcı döndürüyor; route ve provider sınırları ise gerçek OAuth callback
        akışına göre bırakıldı.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <div
        className={css({
          rounded: "l3",
          borderWidth: "1px",
          borderColor: "border",
          bg: "bg.panel",
          p: "5",
        })}
      >
        <div
          className={css({
            mb: "2",
            color: "fg.muted",
            fontSize: "xs",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          })}
        >
          Mock kullanıcı
        </div>
        <div className={css({ fontSize: "lg", fontWeight: "semibold" })}>{viewer.displayName}</div>
        <div className={css({ color: "fg.muted", fontSize: "sm" })}>
          @{viewer.username} · {viewer.role}
        </div>
      </div>
      <div className={css({ mt: "5", display: "flex", flexDirection: "column", gap: "3" })}>
        <Button asChild colorPalette="amber">
          <NextLink href={`/film/${filmSlug}` as Route}>Mock olarak devam et</NextLink>
        </Button>
        <Button variant="surface" colorPalette="gray" disabled>
          Gerçek Twitch OAuth sonraki iterasyon
        </Button>
      </div>
    </Card.Body>
  </Card.Root>
);
