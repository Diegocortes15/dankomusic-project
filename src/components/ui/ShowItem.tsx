import { useTranslations, useLocale } from "next-intl";
import type { Show } from "@/content/types";

type Props = { show: Show };

export function ShowItem({ show }: Props) {
  const t = useTranslations("shows");
  const locale = useLocale();
  const date = new Date(show.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <li className="flex flex-col gap-2 border-b border-steel/20 py-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-baseline gap-6">
        <time dateTime={show.date} className="font-display text-xl tabular-nums text-silver">
          {date}
        </time>
        <div>
          <p className="font-display text-lg">{show.venue}</p>
          <p className="text-sm text-text-muted">
            {show.city}, {show.country}
            {show.eventName ? ` · ${show.eventName}` : ""}
          </p>
        </div>
      </div>
      {show.ticketUrl && (
        <a
          href={show.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm uppercase tracking-widest text-silver hover:text-text transition-colors"
        >
          {t("tickets")} →
        </a>
      )}
    </li>
  );
}
