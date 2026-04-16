"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

// Rationale: provider shell already reserves space for future auth/query state
// while forcing the dark theme the product is designed around in iteration one.
export const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
    {children}
  </ThemeProvider>
);
