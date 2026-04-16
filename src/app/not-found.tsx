import NextLink from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { css } from "styled-system/css";

export default function NotFound() {
  return (
    <PageShell>
      <section
        className={css({
          display: "grid",
          gap: "5",
          rounded: "l3",
          borderWidth: "1px",
          borderColor: "border",
          bg: "rgba(15, 23, 42, 0.72)",
          p: { base: "6", md: "8" },
          textAlign: "center",
        })}
      >
        <div className={css({ color: "fg.muted", fontSize: "sm", textTransform: "uppercase", letterSpacing: "0.08em" })}>
          404
        </div>
        <h1 className={css({ fontSize: { base: "3xl", md: "4xl" }, fontWeight: "semibold" })}>Bu gösterim bulunamadı</h1>
        <p className={css({ color: "fg.muted", maxW: "xl", mx: "auto" })}>
          Film arşivde taşınmış olabilir ya da slug eşleşmiyor olabilir.
        </p>
        <div className={css({ display: "flex", justifyContent: "center" })}>
          <Button asChild colorPalette="amber">
            <NextLink href="/">Ana sayfaya dön</NextLink>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
