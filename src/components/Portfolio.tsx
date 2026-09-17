"use client";

import { projects } from "@/data/content";
import Reveal from "@/components/Reveal";

type Project = (typeof projects)[number];

function ProjectShot({ project }: { project: Project }) {
  const video = "video" in project ? project.video : undefined;
  const headerFade = "headerFade" in project ? project.headerFade : undefined;

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black">
      {video ? (
        <video
          className="h-full w-full origin-center object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          src={video}
          poster={project.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`Preview ${project.title}`}
        />
      ) : (
        <img
          src={project.image}
          alt={`Screenshot ${project.title}`}
          className="h-full w-full origin-center object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}
      {video && headerFade ? (
        <img
          src={project.image}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
          style={{
            maskImage: `linear-gradient(to bottom, #000 ${headerFade}%, transparent ${headerFade + 4}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, #000 ${headerFade}%, transparent ${headerFade + 4}%)`,
          }}
        />
      ) : null}
    </div>
  );
}

/** Proiecte reale — randate doar în Matrix, cu screenshot-uri live. */
export default function Portfolio() {
  return (
    <section id="portofoliu" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">03 — Portofoliu</p>
          <h2 className="glitch mt-4 max-w-xl text-4xl tracking-tight sm:text-5xl">
            Lucrări deblocate
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.href} delay={index * 0.08}>
              <article className="pulse-live group overflow-hidden rounded-xl border border-line bg-surface transition-transform duration-500 hover:-translate-y-1 hover:border-accent/50">
                <a href={project.href} target="_blank" rel="noreferrer" className="block">
                  <div className="flex items-center gap-1.5 border-b border-line bg-bg/80 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 font-mono text-[10px] text-muted">{project.host}</span>
                  </div>
                  <ProjectShot project={project} />
                </a>

                <div className="flex flex-col p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-sm text-accent">{project.number}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {project.type}
                    </span>
                  </div>
                  <h3 className="text-xl tracking-tight">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex text-sm text-fg underline-offset-4 transition-colors group-hover:text-accent group-hover:underline"
                  >
                    Deschide site-ul
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
