"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/content";

type Project = (typeof projects)[number];

const COUNT = projects.length;
const SIDE_OFFSETS = [-3, -2, -1, 1, 2, 3] as const;

function wrap(index: number) {
  return ((index % COUNT) + COUNT) % COUNT;
}

function phoneSrc(project: Project) {
  return "phoneImage" in project ? project.phoneImage : project.image;
}

function chromeMask(percent: number) {
  return {
    maskImage: `linear-gradient(to bottom, #000 ${percent}%, transparent ${percent + 3}%)`,
    WebkitMaskImage: `linear-gradient(to bottom, #000 ${percent}%, transparent ${percent + 3}%)`,
  };
}

function actionClass(tone: string) {
  switch (tone) {
    case "white":
      return "rounded-full bg-white px-5 py-1.5 text-[9px] font-semibold text-black";
    case "gold":
      return "rounded-full bg-[#d4bc7a] px-4 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#1c160c]";
    case "ghost-gold":
      return "rounded-full border border-[#d4bc7a]/70 px-4 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#f3e6c0]";
    case "red":
      return "w-full rounded-sm bg-[#e23d2a] px-4 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-white";
    case "gold-block":
      return "w-[88%] rounded-sm bg-[#c9a962] px-4 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-black";
    case "pink-block":
      return "w-[88%] rounded-sm bg-[#d989ca] px-4 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-black";
    default:
      return "rounded-full bg-white/90 px-4 py-1.5 text-[9px] text-black";
  }
}

function PhoneHeroCopy({ project }: { project: Project }) {
  const hero = "phoneHero" in project ? project.phoneHero : undefined;
  if (!hero) return null;
  const left = hero.align === "left";
  const editorial = "script" in hero && Boolean(hero.script);

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 top-[16%] flex flex-col px-3 ${
        left
          ? "items-start justify-between pb-3 text-left"
          : editorial
            ? "items-center justify-between pb-10 pt-3 text-center"
            : "items-center justify-center text-center"
      }`}
    >
      <div className={`flex w-full flex-col ${left ? "mt-6 items-start" : "items-center"}`}>
        {"eyebrow" in hero && hero.eyebrow ? (
          <p className="max-w-[14rem] font-mono text-[6px] uppercase tracking-[0.22em] text-white/75">{hero.eyebrow}</p>
        ) : null}
        <p
          className={`mt-1.5 leading-[1.05] ${
            editorial
              ? "font-serif text-[1.55rem] font-normal tracking-[0.16em] text-[#fff4cc]"
              : left
                ? "font-serif text-[1.55rem] text-white"
                : "text-[1.15rem] font-medium tracking-tight text-white"
          }`}
        >
          {hero.title}
          {"titleAccent" in hero && hero.titleAccent ? (
            <>
              <br />
              <span className="text-[#e23d2a]">{hero.titleAccent}</span>
            </>
          ) : null}
        </p>
        {"script" in hero && hero.script ? (
          <p className="mt-0.5 font-serif text-[8px] italic tracking-[0.14em] text-[#e8d5a3]">{hero.script}</p>
        ) : null}
        {"body" in hero && hero.body ? (
          <p className={`mt-2 text-[8px] leading-snug text-white/80 ${left ? "max-w-[92%]" : "max-w-[16rem]"}`}>
            {hero.body}
          </p>
        ) : null}
        {"hours" in hero && hero.hours ? (
          <p className="mt-1.5 font-mono text-[6px] uppercase tracking-[0.16em] text-white/85">{hero.hours}</p>
        ) : null}
        {"live" in hero && hero.live ? (
          <p className="mt-1.5 rounded-full border border-[#3e947c]/75 px-2 py-0.5 font-mono text-[5.5px] uppercase tracking-[0.12em] text-[#3e947c]">
            ● {hero.live}
          </p>
        ) : null}
        {"meta" in hero && hero.meta ? (
          <p className="mt-2 text-[7px] text-white/90">★★★★★ {hero.meta}</p>
        ) : null}
      </div>
      <div className={`mb-1 flex w-full ${left ? "flex-col" : "flex-col items-center gap-1.5"}`}>
        {hero.actions.map((action) => (
          <span key={action.label} className={actionClass(action.tone)}>
            {action.label}
          </span>
        ))}
        {"note" in hero && hero.note ? (
          <p className="mt-2 font-mono text-[6px] uppercase tracking-[0.18em] text-[#d4bc7a]">{hero.note}</p>
        ) : null}
      </div>
    </div>
  );
}

function PekinPhone({ project }: { project: Project }) {
  const tag = "tag" in project ? project.tag : undefined;
  const chrome = "phoneChrome" in project ? project.phoneChrome : 10;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0908]">
      <div className="absolute inset-x-0 top-[14%] flex justify-center">
        <div className="pekin-swing flex w-[58%] flex-col items-center">
          <span className="h-7 w-px bg-[#6b5d4f]" />
          {tag ? <img src={tag} alt="" className="w-full shadow-[8px_18px_28px_rgba(0,0,0,0.55)]" /> : null}
        </div>
      </div>
      <img
        src={phoneSrc(project)}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-fill object-top"
        style={chromeMask(chrome)}
      />
      <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-mono text-[6px] uppercase tracking-[0.18em] text-white/55">
        Ține și trage eticheta în jos
      </p>
    </div>
  );
}

function PhoneFill({ project, playing }: { project: Project; playing?: boolean }) {
  const video = "video" in project ? project.video : undefined;
  const tag = "tag" in project ? project.tag : undefined;
  const chrome = "phoneChrome" in project ? project.phoneChrome : 12;
  const src = phoneSrc(project);

  if (tag && !video) {
    return <PekinPhone project={project} />;
  }

  if (video) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-black">
        <HeroVideo src={video} poster={src} title={project.title} fill playing={playing} />
        <img
          src={src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-fill object-top"
          style={chromeMask(chrome)}
        />
        <PhoneHeroCopy project={project} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <img src={src} alt={`Screenshot ${project.title}`} className="h-full w-full object-fill object-top" />
    </div>
  );
}

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
  fill,
  playing,
}: {
  src: string;
  poster: string;
  headerFade?: number;
  title: string;
  fill?: boolean;
  playing?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let visible = false;

    const sync = () => {
      if (document.hidden || !visible || !playing) {
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
    sync();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [playing]);

  return (
    <div
      className={
        fill
          ? "absolute inset-0 overflow-hidden bg-black"
          : "relative aspect-[16/10] overflow-hidden bg-black"
      }
    >
      <video
        ref={videoRef}
        className="pointer-events-none h-full w-full object-cover object-center"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`Preview ${title}`}
      />
      {headerFade && !fill ? (
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

function ProjectShot({
  project,
  fill,
  playing,
}: {
  project: Project;
  fill?: boolean;
  playing?: boolean;
}) {
  const video = "video" in project ? project.video : undefined;
  const headerFade = "headerFade" in project ? project.headerFade : undefined;
  const tag = "tag" in project ? project.tag : undefined;

  if (fill) {
    return <PhoneFill project={project} playing={playing} />;
  }

  if (tag) {
    return <PekinShot project={project} />;
  }

  if (video) {
    return (
      <HeroVideo
        src={video}
        poster={project.image}
        headerFade={headerFade}
        title={project.title}
        playing={playing}
      />
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black">
      <img
        src={project.image}
        alt={`Screenshot ${project.title}`}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

function SiestaDeck() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const indexRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, y: 0, active: false, swiped: false });
  const active = projects[index];
  const tint = "tint" in active ? active.tint : "#39ff14";
  const [under, setUnder] = useState(phoneSrc(active));
  indexRef.current = index;

  useEffect(() => {
    const later = window.setTimeout(() => setUnder(phoneSrc(active)), 880);
    return () => window.clearTimeout(later);
  }, [active]);

  const go = (next: number) => {
    const current = indexRef.current;
    const wrapped = wrap(next);
    if (wrapped === current) return;
    const diff = wrap(wrapped - current);
    setDir(diff !== 0 && diff <= COUNT / 2 ? 1 : -1);
    setIndex(wrapped);
  };

  const step = (delta: number) => {
    if (!delta) return;
    go(indexRef.current + (delta > 0 ? 1 : -1));
  };

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (event.key === "ArrowRight") go(indexRef.current + 1);
      if (event.key === "ArrowLeft") go(indexRef.current - 1);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let lock = 0;
    let acc = 0;

    function onWheel(event: WheelEvent) {
      const dx = event.deltaX;
      const dy = event.deltaY;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

      const horizontal = Math.abs(dx) >= Math.abs(dy);
      acc += horizontal ? dx : dy;
      event.preventDefault();

      const now = performance.now();
      if (now - lock < 420) return;
      if (Math.abs(acc) < 36) return;

      lock = now;
      const delta = acc;
      acc = 0;
      step(delta);
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("a") && !target.closest("[data-phone-open]")) return;
    drag.current = { x: event.clientX, y: event.clientY, active: true, swiped: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    drag.current.active = false;

    const touch = event.pointerType === "touch";
    const threshold = touch ? 28 : 36;
    if (Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.05) {
      drag.current.swiped = true;
      step(-dx);
      return;
    }

    if (event.pointerType === "mouse" && Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      if ((event.target as HTMLElement).closest("button, a")) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      if (x < rect.width / 2) go(indexRef.current - 1);
      else go(indexRef.current + 1);
    }
  }

  return (
    <div className="relative isolate mt-16 select-none sm:mt-20">
      <div
        ref={stageRef}
        className="relative mx-auto flex min-h-[28rem] cursor-grab items-center justify-center overflow-hidden overscroll-x-contain [touch-action:pan-y] active:cursor-grabbing sm:min-h-[32rem] lg:min-h-[34rem]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current.active = false;
        }}
      >
        <div className="pointer-events-none absolute inset-0 [perspective:1200px]">
          {SIDE_OFFSETS.map((offset) => {
            const project = projects[wrap(index + offset)];
            const depth = Math.abs(offset);
            return (
              <motion.button
                type="button"
                key={`${project.number}-${offset}`}
                aria-label={`Arată ${project.title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  if (drag.current.swiped) return;
                  go(index + offset);
                }}
                className={`siesta-card pointer-events-auto absolute left-1/2 top-1/2 h-[14rem] w-[9.2rem] overflow-hidden sm:h-[16.5rem] sm:w-[10.8rem] lg:h-[18.5rem] lg:w-[12.2rem] ${
                  depth === 3 ? "hidden lg:block" : depth === 2 ? "hidden sm:block" : ""
                }`}
                style={{ transformOrigin: "center center" }}
                initial={false}
                animate={{
                  x: `calc(-50% + ${offset * 7.1}rem)`,
                  y: "-50%",
                  rotateY: offset * -9,
                  scale: 1 - depth * 0.045,
                  opacity: depth === 3 ? 0.62 : 1,
                  zIndex: 10 - depth,
                }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-cover object-top"
                />
              </motion.button>
            );
          })}
        </div>

        <div className="relative z-20">
          <AnimatePresence>
            <motion.div
              key={`halo-${index}`}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ background: tint }}
              initial={{
                x: dir > 0 ? 140 : -140,
                scale: 0.2,
                opacity: 0.55,
              }}
              animate={{ x: 0, scale: 7.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>

          <div className="phone-shell">
            <div className="phone-screen">
              <div className="phone-island" />
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                data-phone-open
                aria-label={`Deschide site-ul ${active.title}`}
                className="phone-site block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                onClick={(event) => {
                  if (drag.current.swiped) event.preventDefault();
                }}
              >
                <img
                  src={under}
                  alt=""
                  className="absolute inset-0 h-full w-full object-fill object-top"
                />
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active.number}
                    className="absolute inset-0"
                    initial={{
                      clipPath: `circle(0% at ${dir > 0 ? "100%" : "0%"} 50%)`,
                    }}
                    animate={{ clipPath: "circle(150% at 50% 50%)" }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectShot project={active} fill playing />
                  </motion.div>
                </AnimatePresence>
              </a>
              <div className="phone-home" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-6 flex flex-col items-center gap-2.5 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
          Lucrări deblocate · {active.number} / {String(COUNT).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Proiectul anterior"
            onClick={() => go(index - 1)}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
          >
            ‹
          </button>
          <div>
            <h3 className="text-xl tracking-tight sm:text-2xl">{active.title}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {active.type}
            </p>
          </div>
          <button
            type="button"
            aria-label="Proiectul următor"
            onClick={() => go(index + 1)}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
          >
            ›
          </button>
        </div>
        <div className="flex gap-2" aria-hidden>
          {projects.map((project, i) => (
            <button
              key={project.number}
              type="button"
              aria-label={project.title}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-accent" : "w-1.5 bg-line hover:bg-muted"
              }`}
            />
          ))}
        </div>
        <a
          href={active.href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
        >
          Deschide site-ul
        </a>
      </div>
    </div>
  );
}

/** Proiecte reale — randate doar în Matrix, ca un deck tip Siesta. */
export default function Portfolio() {
  return (
    <section
      id="portofoliu"
      className="scroll-mt-24 overflow-x-hidden border-t border-line"
      aria-roledescription="carousel"
      aria-label="Portofoliu deblocat. Săgeți, rotiță sau glisare stânga-dreapta."
      aria-keyshortcuts="ArrowLeft ArrowRight"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">03 — Portofoliu</p>
          <h2 className="glitch mx-auto mt-4 max-w-xl text-4xl tracking-tight sm:text-5xl">
            Lucrări deblocate
          </h2>
        </div>
        <SiestaDeck />
      </div>
    </section>
  );
}
