"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/data/content";
import Reveal from "@/components/Reveal";

type Project = (typeof projects)[number];

function PekinShot({ project }: { project: Project }) {
  const tag = "tag" in project ? project.tag : undefined;

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0908]">
      <img
        src={project.image}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        style={{
          maskImage: "linear-gradient(to bottom, #000 13%, transparent 18%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 13%, transparent 18%)",
        }}
      />
      <div className="absolute inset-x-0 top-[6%] flex justify-center">
        <div className="pekin-swing flex w-[22%] flex-col items-center">
          <span className="h-10 w-px bg-[#6b5d4f] sm:h-14" />
          {tag ? (
            <img src={tag} alt="" className="w-full shadow-[8px_18px_28px_rgba(0,0,0,0.55)]" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function HeroVideo({
  src,
  poster,
  headerFade,
  title,
}: {
  src: string;
  poster: string;
  headerFade?: number;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let visible = false;

    const sync = () => {
      if (document.hidden || !visible) {
        video.pause();
        return;
      }
      video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        sync();
      },
      { threshold: [0, 0.2, 0.5] },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, []);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="h-full w-full origin-center object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`Preview ${title}`}
      />
      {headerFade ? (
        <img
          src={poster}
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

function ProjectShot({ project }: { project: Project }) {
  const video = "video" in project ? project.video : undefined;
  const headerFade = "headerFade" in project ? project.headerFade : undefined;
  const tag = "tag" in project ? project.tag : undefined;

  if (tag) {
    return <PekinShot project={project} />;
  }

  if (video) {
    return (
      <HeroVideo src={video} poster={project.image} headerFade={headerFade} title={project.title} />
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black">
      <img
        src={project.image}
        alt={`Screenshot ${project.title}`}
        className="h-full w-full origin-center object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
      />
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
