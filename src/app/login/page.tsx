import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { MockLoginPanel } from "@/features/auth/components/mock-login-panel";
import { getMockSession } from "@/features/auth/lib/get-mock-session";
import { getActiveFilm } from "@/lib/mock/repository";
import { css } from "styled-system/css";

export default function LoginPage() {
  const session = getMockSession();
  const activeFilm = getActiveFilm();

  return (
    <PageShell>
      <section className={css({ display: "grid", gap: "6", gridTemplateColumns: { base: "1fr", lg: "1.1fr 0.9fr" } })}>
        <div
          className={css({
            display: "grid",
            gap: "4",
            rounded: "l3",
            borderWidth: "1px",
            borderColor: "border",
            bg: "rgba(15, 23, 42, 0.72)",
            p: { base: "6", md: "8" },
          })}
        >
          <Badge colorPalette="amber" variant="subtle">
            /login
          </Badge>
          <h1 className={css({ fontSize: { base: "3xl", md: "5xl" }, fontWeight: "semibold", lineHeight: "1.05" })}>
            Twitch ile giriş akışının mock sürümü
          </h1>
          <p className={css({ maxW: "2xl", color: "fg.muted", lineHeight: "1.8" })}>
            Bu sayfa gerçek OAuth yerine sabit bir oturum açıyor; ancak route ve veri sınırları gerçek Twitch callback,
            kullanıcı upsert ve rol kontrolüne uyumlu olacak şekilde ayrıldı.
          </p>
          <div className={css({ display: "grid", gap: "3", gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" } })}>
            {[
              "Mock provider ayrı tutuldu.",
              "Viewer nesnesi auth accessor üstünden geliyor.",
              "Gerçek OAuth için storage sınırı hazır bırakıldı.",
            ].map((item) => (
              <div key={item} className={css({ rounded: "l2", borderWidth: "1px", borderColor: "border", bg: "bg.panel", p: "4", color: "fg.muted", fontSize: "sm" })}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <MockLoginPanel viewer={session.user} filmSlug={activeFilm.slug} />
      </section>
    </PageShell>
  );
}
