import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel/20 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs uppercase tracking-widest text-text-muted md:flex-row">
        <p>© {year} Danko · {t("rights")}</p>
        <p>Bogotá, Colombia</p>
      </div>
    </footer>
  );
}
