"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { hasUpcomingReleases } from "@/content/releases";

export function Nav() {
  const t = useTranslations("nav");
  const showReleases = hasUpcomingReleases();

  const links: Array<{ href: string; label: string }> = [
    { href: "#about", label: t("bio") },
    { href: "#music", label: t("music") },
    ...(showReleases ? [{ href: "#releases", label: t("releases") }] : []),
    { href: "#shows", label: t("shows") },
    { href: "#gallery", label: t("gallery") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-base/70 border-b border-steel/30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-3">
          <Image
            src="/assets/danko_logo.jpeg"
            alt="Danko"
            width={32}
            height={32}
            className="rounded-sm"
          />
          <span className="font-display text-lg tracking-wide">DANKO</span>
        </a>

        <ul className="hidden gap-6 text-sm text-text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-text transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <LocaleSwitcher />
      </nav>
    </header>
  );
}
