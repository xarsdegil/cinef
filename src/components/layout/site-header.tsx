import type { Route } from "next";
import NextLink from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Avatar from "@/components/ui/avatar";
import type { User } from "@/features/auth/auth.schema";
import { css } from "styled-system/css";

const navItems: Array<{ href: Route; label: string }> = [
  { href: "/", label: "Bu Hafta" },
  { href: "/archive", label: "Arşiv" },
  { href: "/admin", label: "Admin" },
];

export const SiteHeader = ({ viewer }: { viewer: User }) => (
  <header
    className={css({
      position: "sticky",
      top: "0",
      zIndex: "sticky",
      borderBottomWidth: "1px",
      borderColor: "border",
      backdropFilter: "blur(16px)",
      background: "rgba(2, 6, 23, 0.82)",
    })}
  >
    <div
      className={css({
        mx: "auto",
        display: "flex",
        maxW: "7xl",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "4",
        px: { base: "4", md: "6", xl: "8" },
        py: "4",
      })}
    >
      <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
        <NextLink href="/" className={css({ display: "inline-flex", flexDirection: "column" })}>
          <span
            className={css({
              fontSize: "xl",
              fontWeight: "semibold",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            })}
          >
            cinef
          </span>
          <span className={css({ color: "fg.muted", fontSize: "xs" })}>
            toplulukla izlenen film kulübü
          </span>
        </NextLink>
        <Badge colorPalette="amber" variant="subtle">
          mock auth
        </Badge>
      </div>

      <nav className={css({ display: { base: "none", md: "flex" }, gap: "2" })}>
        {navItems.map((item) => (
          <Button key={item.href} asChild size="sm" variant="plain" colorPalette="gray">
            <NextLink href={item.href}>{item.label}</NextLink>
          </Button>
        ))}
      </nav>

      <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
        <div
          className={css({
            display: { base: "none", md: "flex" },
            flexDirection: "column",
            textAlign: "right",
          })}
        >
          <span className={css({ fontSize: "sm", fontWeight: "medium" })}>{viewer.displayName}</span>
          <span
            className={css({
              color: "fg.muted",
              fontSize: "xs",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            })}
          >
            {viewer.role}
          </span>
        </div>
        <Avatar.Root size="sm" variant="subtle" colorPalette="amber">
          <Avatar.Image src={viewer.avatarUrl} alt={viewer.displayName} />
          <Avatar.Fallback name={viewer.displayName} />
        </Avatar.Root>
      </div>
    </div>
  </header>
);
