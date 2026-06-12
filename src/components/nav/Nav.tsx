"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Icon } from "@/components/ui/Icon";
import { waLink } from "@/config/site";

type SectionId = "top" | "bio" | "shows" | "gallery" | "music" | "contact";

const NAV_OFFSET = 56;
const SCROLL_THRESHOLD = 60;

export function Nav() {
  const t = useTranslations("nav");
  const tWa = useTranslations("wa");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("bio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids: SectionId[] = ["top", "bio", "shows", "gallery", "music", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActive(id === "top" ? "bio" : id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  const onJump = (e: React.MouseEvent, id: SectionId) => {
    e.preventDefault();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const links: Array<{ id: SectionId; label: string }> = [
    { id: "bio", label: t("bio") },
    { id: "shows", label: t("shows") },
    { id: "gallery", label: t("gallery") },
    { id: "music", label: t("music") },
    { id: "contact", label: t("contact") },
  ];

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a
        className="nav__logo"
        href="#top"
        onClick={(e) => onJump(e, "top")}
        aria-label="Dankø home"
      >
        <Image
          src="/assets/danko_logo.jpeg"
          alt=""
          width={32}
          height={32}
          priority
        />
      </a>
      <div className="nav__links">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`nav__link ${active === l.id ? "is-active" : ""}`}
            onClick={(e) => onJump(e, l.id)}
          >
            {l.label}
          </a>
        ))}
      </div>
      <LocaleSwitcher />
      <ThemeSwitcher />
      <a
        className="btn btn--primary nav__book"
        href={waLink(tWa("general"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <Icon name="whatsapp" size={15} />
        <span className="nav__book-label">{t("contact")}</span>
      </a>
    </nav>
  );
}
