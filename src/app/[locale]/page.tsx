import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <section id="hero" className="flex min-h-screen items-center justify-center">
        <h1 className="font-display text-6xl">Danko</h1>
      </section>
    </main>
  );
}
