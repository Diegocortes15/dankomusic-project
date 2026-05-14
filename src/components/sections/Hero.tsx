"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { easeIndustrial } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  return (
    <section id="hero" className="relative isolate flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/danko_radioberlin_club_1.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-base/40 to-base" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeIndustrial }}
          className="font-display text-[18vw] leading-[0.85] tracking-tight md:text-[12rem]"
        >
          DANKO
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeIndustrial, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg uppercase tracking-[0.2em] text-text-muted"
        >
          {t("tagline")}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeIndustrial, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#music"
            className="rounded-sm border border-silver px-6 py-3 text-sm font-medium uppercase tracking-widest hover:bg-silver hover:text-base transition-colors"
          >
            {t("ctaListen")}
          </a>
          <a
            href="#contact"
            className="rounded-sm border border-steel px-6 py-3 text-sm font-medium uppercase tracking-widest text-text-muted hover:text-text hover:border-silver transition-colors"
          >
            {t("ctaBook")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
