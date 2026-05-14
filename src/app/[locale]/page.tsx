import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Music } from "@/components/sections/Music";
import { Releases } from "@/components/sections/Releases";
import { Shows } from "@/components/sections/Shows";

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
        <Releases />
        <Shows />
      </main>
    </>
  );
}
