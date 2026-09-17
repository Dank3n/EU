"use client";

import { skillGroups } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function Skills() {
  return (
    <section id="abilitati" className="scroll-mt-24 border-t border-line bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">02 — Abilități</p>
          <h2 className="glitch mt-4 max-w-xl text-4xl tracking-tight sm:text-5xl">
            Tehnologii cu care lucrez
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <h3 className="mb-5 font-mono text-sm uppercase tracking-widest text-fg">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
