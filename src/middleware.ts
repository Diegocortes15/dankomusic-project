import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// Exclude API, Next internals, Vercel internals, dotted asset files, AND the
// extension-less app-icon metadata routes (`icon`, `apple-icon`, etc.) so the
// next-intl locale-prefix rewrite doesn't intercept them and 404 the favicon.
export const config = {
  matcher: ["/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|sitemap|robots|.*\\..*).*)"],
};
