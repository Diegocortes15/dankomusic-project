import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Release } from "@/content/types";
import { toLocalIsoDate } from "@/content/util";

type Props = { release: Release };

export function ReleaseCard({ release }: Props) {
  const t = useTranslations("releases");
  const today = toLocalIsoDate(new Date());
  const isOut = release.releaseDate <= today;
  const label = isOut ? t("out") : t("soon");

  const links = [
    release.links.spotify && { href: release.links.spotify, label: "Spotify" },
    release.links.beatport && { href: release.links.beatport, label: "Beatport" },
    release.links.apple && { href: release.links.apple, label: "Apple Music" },
    release.links.soundcloud && { href: release.links.soundcloud, label: "SoundCloud" },
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <article className="group bg-surface border border-steel/30 overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={release.artwork}
          alt={release.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-widest text-silver">{label}</p>
        <h3 className="mt-2 font-display text-2xl">{release.title}</h3>
        {release.label && (
          <p className="mt-1 text-sm text-text-muted">{release.label}</p>
        )}
        <p className="mt-2 text-sm text-text-muted">{release.releaseDate}</p>
        {links.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-3 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-steel px-3 py-1 hover:border-silver hover:text-text transition-colors"
                >
                  {isOut ? t("listen") : t("preSave")} · {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
