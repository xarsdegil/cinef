import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getMockSession } from "@/features/auth/lib/get-mock-session";
import { siteConfig } from "@/lib/config/site";
import { Providers } from "./providers";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = getMockSession();

  return (
    <html lang="tr" suppressHydrationWarning className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body style={{ fontFamily: "var(--font-body)" }}>
        <Providers>
          <SiteHeader viewer={session.user} />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
