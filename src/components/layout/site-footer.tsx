import { css } from "styled-system/css";

export const SiteFooter = () => (
  <footer
    className={css({
      borderTopWidth: "1px",
      borderColor: "border",
      py: "6",
    })}
  >
    <div
      className={css({
        mx: "auto",
        display: "flex",
        maxW: "7xl",
        flexDirection: { base: "column", md: "row" },
        justifyContent: "space-between",
        gap: "2",
        px: { base: "4", md: "6", xl: "8" },
        color: "fg.muted",
        fontSize: "sm",
      })}
    >
      <span>cinef ilk iterasyon scaffold</span>
      <span>Next.js + Park UI + Panda CSS + Prisma + Zod</span>
    </div>
  </footer>
);
