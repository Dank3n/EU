"use client";

import { useEffect, useRef } from "react";
import { site, navLinks } from "@/data/content";
import { useSecretMode } from "@/context/SecretMode";
import SiennaScene from "@/components/SiennaScene";

export default function Footer() {
  const year = new Date().getFullYear();
  const { toggle, matrix } = useSecretMode();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        node.classList.toggle("is-live", entry.isIntersecting && entry.intersectionRatio > 0.08);
      },
      { threshold: [0, 0.08, 0.25] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const links = navLinks.filter((link) => matrix || !link.matrixOnly);

  return (
    <footer
      ref={rootRef}
      className="sienna-footer relative overflow-hidden border-t border-line bg-bg pb-[env(safe-area-inset-bottom)]"
    >
      <SiennaScene />
      <div className="sienna-veil pointer-events-none absolute inset-0" aria-hidden />

      <div className="sienna-content relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-6 px-5 pt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-16 sm:px-8 sm:pt-10 lg:gap-24">
        <div className="sienna-copy max-w-sm">
          <p className="flex items-center gap-2.5 font-serif text-[1.15rem] tracking-tight text-fg sm:text-xl">
            <BridgeMark />
            {matrix ? site.matrix.name : site.name}
          </p>
          <p className="mt-3 max-w-[22rem] text-[14px] leading-relaxed text-muted sm:mt-4 sm:text-[15px]">
            Construiesc site-uri cu răbdarea unui pod de piatră. Fiecare detaliu trece o dată, la locul lui.
          </p>
          <p className="mt-4 text-[13px] text-muted/80 sm:mt-6 sm:text-sm">
            {site.name} © {year}, făcut să țină
          </p>
          <button
            type="button"
            onClick={toggle}
            className="mt-3 inline-flex min-h-10 items-center font-mono text-[11px] tracking-[0.18em] text-muted/40 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:mt-5 sm:min-h-0"
            aria-label="Comută modul secret"
          >
            {matrix ? "// exit" : "// root"}
          </button>
        </div>

        <nav
          aria-label="Subsol"
          className="sienna-copy grid grid-cols-2 gap-x-8 gap-y-1 self-start sm:gap-x-16 sm:gap-y-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/55">Site</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/55">Contact</p>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-[13px] text-fg/90 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-0 sm:py-1 sm:text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-10 items-center text-[13px] text-fg/90 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-0 sm:py-1 sm:text-sm"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-10 max-w-full items-center break-all text-[12px] text-fg/90 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-0 sm:break-normal sm:py-1 sm:text-sm"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

function BridgeMark() {
  return (
    <svg width="28" height="16" viewBox="0 0 28 16" fill="none" aria-hidden className="shrink-0 text-fg">
      <path
        d="M1 6.5 H27 M1 6.5 V10.5 H27 V6.5 M4 10.5 Q 7 15, 10 10.5 M12 10.5 Q 15 15, 18 10.5 M20 10.5 Q 23 15, 26 10.5"
        stroke="currentColor"
        strokeWidth="1.15"
      />
    </svg>
  );
}
