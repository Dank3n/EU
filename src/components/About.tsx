"use client";

import { site } from "@/data/content";
import { useSecretMode } from "@/context/SecretMode";
import Reveal from "@/components/Reveal";

export default function About() {
  const { matrix } = useSecretMode();

  return (
    <section id="despre" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">01 — Despre mine</p>
          <h2 className="glitch mt-4 text-4xl tracking-tight sm:text-5xl">
            {matrix ? (
              <>
                {site.matrix.aboutHeading[0]}
                <br />
                {site.matrix.aboutHeading[1]}
              </>
            ) : (
              <>
                Cod clar.
                <br />
                Produse utile.
              </>
            )}
          </h2>
        </Reveal>

        <Reveal className="space-y-6 text-base leading-relaxed text-muted lg:col-span-7 lg:col-start-6 lg:text-lg" delay={0.1}>
          {(matrix ? site.matrix.about : site.about).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
