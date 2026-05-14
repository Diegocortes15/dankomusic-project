import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Music } from "@/components/sections/Music";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Music />
      </main>
    </>
  );
}
