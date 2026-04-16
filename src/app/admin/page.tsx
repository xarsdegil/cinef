import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { AdminOverview } from "@/features/admin/components/admin-overview";
import { getAdminDashboardData } from "@/lib/mock/repository";
import { css } from "styled-system/css";

export default function AdminPage() {
  const dashboard = getAdminDashboardData();

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
          <Badge colorPalette="amber" variant="subtle">
            /admin
          </Badge>
          <h1 className={css({ fontSize: { base: "3xl", md: "5xl" }, fontWeight: "semibold" })}>Yönetim paneli iskeleti</h1>
          <p className={css({ maxW: "2xl", color: "fg.muted", lineHeight: "1.8" })}>
            Film planlama, moderasyon ve rol yönetimi bu ilk iterasyonda tek bir operasyon yüzeyinde toplandı.
          </p>
        </div>
        <AdminOverview {...dashboard} />
      </section>
    </PageShell>
  );
}
