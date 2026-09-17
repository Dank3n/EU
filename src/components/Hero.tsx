"use client";

import { motion } from "framer-motion";
import { site } from "@/data/content";
import { useSecretMode } from "@/context/SecretMode";

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

/** Hero: nume, rol, telefon și CTA. */
export default function Hero({ ready = true }: { ready?: boolean }) {
  const { matrix } = useSecretMode();
  const role = matrix ? site.matrix.role : site.role;

  return (
    <section
      id="top"
      className={`relative mx-auto flex min-h-svh max-w-6xl scroll-mt-24 flex-col px-6 pt-32 lg:px-8 ${
        matrix ? "justify-center pb-20" : "justify-end pb-16 lg:pb-24"
      }`}
    >
      <motion.div variants={container} initial="hidden" animate={ready ? "show" : "hidden"}>
        <motion.p
          variants={item}
          className="mb-5 font-mono text-xs uppercase tracking-[0.32em] text-accent flicker"
        >
          {role}
        </motion.p>

        {matrix ? (
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
        ) : (
          <motion.h1
            variants={item}
            className="glitch neon text-[clamp(3.1rem,11vw,7.6rem)] font-medium leading-[0.9] tracking-tight"
          >
            Nica
            <br />
            Daniel
          </motion.h1>
        )}

        <motion.div variants={item} className="mt-8 flex flex-col items-start gap-2 font-mono text-sm sm:text-base">
          {matrix && (
            <p className="font-mono text-sm tracking-[0.18em] text-accent/80">{site.matrix.name}</p>
          )}
          <a href={site.phoneHref} className="text-muted transition-colors hover:text-accent">
            {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-accent">
            {site.email}
          </a>
        </motion.div>

        {!matrix && (
          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.slogan}
          </motion.p>
        )}

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="pulse-live rounded-full bg-accent px-5 py-3 text-sm text-bg transition-transform hover:scale-[1.04]"
          >
            Contactează-mă
          </a>
          {matrix && (
            <a
              href="#portofoliu"
              className="rounded-full border border-line px-5 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Vezi portofoliul
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
