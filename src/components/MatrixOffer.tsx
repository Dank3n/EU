"use client";

import { motion } from "framer-motion";
import { site } from "@/data/content";

/** Spot publicitar vizibil doar în modul Matrix. */
export default function MatrixOffer() {
  return (
    <section id="oferta" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="pulse-live relative overflow-hidden rounded-2xl border border-accent/50 bg-surface px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent flicker">
            // offer.exe — 100% gratuit
          </p>
          <h2 className="glitch neon mt-5 text-[clamp(1.8rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-tight">
            {site.matrix.offerTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">{site.matrix.offerBody}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Vreau un website gratis")}`}
              className="rounded-full bg-accent px-6 py-3 text-sm text-bg transition-transform hover:scale-[1.04]"
            >
              Vreau site-ul gratis
            </a>
            <a
              href={site.phoneHref}
              className="rounded-full border border-accent/40 px-6 py-3 text-sm text-accent transition-colors hover:border-accent"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
