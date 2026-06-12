import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { Bio } from "@/components/sections/Bio";
import { Shows } from "@/components/sections/Shows";
import { Gallery } from "@/components/sections/Gallery";
import { SoundCloud } from "@/components/sections/SoundCloud";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <Hero />
      <Bio />
      <Shows />
      <Gallery />
      <SoundCloud />
      <Contact />
      <Footer />
    </>
  );
}
