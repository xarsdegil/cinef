import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";

export const PageShell = ({ children }: PropsWithChildren) => (
  <main
    className={css({
      mx: "auto",
      w: "full",
      maxW: "7xl",
      px: { base: "4", md: "6", xl: "8" },
      py: { base: "6", md: "8", xl: "10" },
    })}
  >
    {children}
  </main>
);
