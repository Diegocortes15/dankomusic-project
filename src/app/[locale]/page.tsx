import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav/Nav";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-20">
        <section id="hero" className="flex min-h-[80vh] items-center justify-center">
          <h1 className="font-display text-6xl">Danko</h1>
        </section>
      </main>
    </>
  );
}
