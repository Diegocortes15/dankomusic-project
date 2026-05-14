"use client";

import { useTranslations } from "next-intl";

type Props = {
  url: string;
  title: string;
  size?: "lg" | "md";
};

export function SoundCloudEmbed({ url, title, size = "md" }: Props) {
  const t = useTranslations("music");
  const height = size === "lg" ? 450 : 166;
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url,
  )}&color=%23c8cacc&inverse=true&auto_play=false&show_user=true&visual=${size === "lg"}`;

  return (
    <div className="bg-surface border border-steel/30">
      <iframe
        title={title}
        width="100%"
        height={height}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={src}
        className="block"
      />
      <noscript>
        <p className="p-4 text-sm text-text-muted">
          <a href={url} className="underline">
            {t("embedFallback")}
          </a>
        </p>
      </noscript>
    </div>
  );
}
