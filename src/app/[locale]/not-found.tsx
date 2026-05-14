import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="font-display text-7xl text-silver">404</p>
        <Link href="/" className="mt-6 inline-block text-sm uppercase tracking-widest underline">
          ← {t("bio")} / Home
        </Link>
      </div>
    </div>
  );
}
