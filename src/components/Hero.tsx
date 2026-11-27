"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/content";
import { useSecretMode } from "@/context/SecretMode";
import DitherReader from "@/components/DitherReader";
import AsciiFlow from "@/components/AsciiFlow";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function useTypedHeadline(active: boolean) {
  const prefix = site.hero.prefix;
  const struck = site.hero.struck;
  const rest = site.hero.lines.join("\n");
  const [ms, setMs] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMs(20_000);
      return;
    }

    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - started;
      setMs(elapsed);
      if (elapsed < 12_000) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [active]);

  const CHAR = 48;
  const prefixEnd = 260 + prefix.length * CHAR;
  const struckEnd = prefixEnd + struck.length * CHAR;
  const hold = struckEnd + 520;
  const strikeAt = hold + 40;
  const restStart = hold + 420;
  const restEnd = restStart + rest.length * 42;

  const prefixCount = Math.max(0, Math.min(prefix.length, Math.floor((ms - 260) / CHAR) + 1));
  const struckCount =
    ms < prefixEnd ? 0 : Math.max(0, Math.min(struck.length, Math.floor((ms - prefixEnd) / CHAR) + 1));
  const restCount =
    ms < restStart ? 0 : Math.max(0, Math.min(rest.length, Math.floor((ms - restStart) / 42) + 1));

  return {
    prefix: prefix.slice(0, ms <= 0 ? 0 : prefixCount),
    struck: struck.slice(0, struckCount),
    rest: rest.slice(0, restCount),
    strike: ms >= strikeAt,
    done: ms >= restEnd,
    typing: ms < restEnd,
    onPrefix: ms < struckEnd,
  };
}

function MatrixHero({ ready }: { ready: boolean }) {
  return (
    <section id="top" className="relative z-[3] min-h-svh scroll-mt-24 overflow-hidden bg-black">
      <AsciiFlow />
      <div className="ascii-veil pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pb-20 pt-32 lg:px-8"
      >
        <motion.p
          variants={item}
          className="mb-5 font-mono text-xs uppercase tracking-[0.32em] text-accent flicker"
        >
          {site.matrix.role}
        </motion.p>
        <motion.h1
          variants={item}
          className="glitch matrix-msg max-w-5xl text-[clamp(2.15rem,6.4vw,5.4rem)] font-medium leading-[1.12] tracking-tight"
        >
          {site.matrix.sloganLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>
        <motion.div variants={item} className="mt-8 flex flex-col items-start gap-2 font-mono text-sm sm:text-base">
          <p className="font-mono text-sm tracking-[0.18em] text-accent/80">{site.matrix.name}</p>
          <a href={site.phoneHref} className="text-muted transition-colors hover:text-accent">
            {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-accent">
            {site.email}
          </a>
        </motion.div>
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="pulse-live rounded-full bg-accent px-5 py-3 text-sm text-bg transition-transform hover:scale-[1.04]"
          >
            Contactează-mă
          </a>
          <a
            href="#portofoliu"
            className="rounded-full border border-line px-5 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Vezi portofoliul
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProHero({ ready }: { ready: boolean }) {
  const typed = useTypedHeadline(ready);
  const restLines = typed.rest.split("\n");

  return (
    <section id="top" className="relative min-h-svh scroll-mt-24 overflow-hidden bg-black">
      <div className="relative z-10 mx-auto grid min-h-svh max-w-[1440px] lg:grid-cols-12">
        <div className="flex flex-col justify-center px-6 pb-8 pt-28 sm:px-8 lg:col-span-5 lg:px-12 lg:pb-24 lg:pt-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
            {site.hero.eyebrow}
          </p>
          <h1 className="font-serif mt-7 text-[clamp(2.6rem,7.4vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.03em] text-[#ecece8]">
            <span className="sr-only">
              {site.hero.prefix}
              {site.hero.lines.join(" ")}
            </span>
            <span aria-hidden="true" className="block">
              {typed.prefix}
              <span className={`strike-draw text-white/55 ${typed.strike ? "is-struck" : ""}`}>
                {typed.struck}
              </span>
              {typed.typing && typed.onPrefix ? <span className="caret-block" /> : null}
            </span>
            {typed.rest.length > 0
              ? restLines.map((line, index) => (
                  <span aria-hidden="true" key={`rest-${index}`} className="block">
                    {line}
                    {index === restLines.length - 1 && typed.typing ? <span className="caret-block" /> : null}
                  </span>
                ))
              : null}
          </h1>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-white/52 sm:text-base">
            {site.hero.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#contact"
              className="inline-flex items-center rounded-sm bg-[#ecece8] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {site.hero.primary} —
            </a>
            <a
              href="#despre"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {site.hero.secondary}
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/5] min-h-[28rem] lg:col-span-7 lg:aspect-auto lg:h-auto lg:min-h-svh">
          <DitherReader active={ready} />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-black to-transparent lg:block"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

/** Hero: nume, rol, telefon și CTA. */
export default function Hero({ ready = true }: { ready?: boolean }) {
  const { matrix } = useSecretMode();
  if (matrix) return <MatrixHero ready={ready} />;
  return <ProHero ready={ready} />;
}
