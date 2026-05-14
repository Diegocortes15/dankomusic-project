import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Hard redirect from `/` to the default locale.
 *
 * The next-intl middleware already redirects unprefixed paths to a locale
 * (with `Accept-Language` detection). This route is a defensive fallback so
 * `/` never 404s if the middleware fails to match for any reason (e.g. an
 * edge-runtime quirk on the deployment platform).
 */
export default function RootPage(): never {
  redirect(`/${routing.defaultLocale}`);
}
