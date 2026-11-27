"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/data/content";
import { useSecretMode } from "@/context/SecretMode";

/** Logo-ul (5 tap-uri) declanșează Easter Egg-ul pe mobil. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { matrix, registerLogoTap } = useSecretMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const logo = matrix ? "ND.exe" : "ND";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          open || scrolled || matrix ? "border-b border-line bg-bg" : "bg-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex items-center justify-between px-6 py-4 lg:px-8 ${
            matrix ? "max-w-6xl" : "max-w-[1440px] md:grid md:grid-cols-[1fr_auto_1fr]"
          }`}
        >
          <a
            href="#top"
            onPointerDown={registerLogoTap}
            className={`select-none font-mono tracking-[0.18em] text-fg neon [touch-action:manipulation] ${
              matrix ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
            aria-label={`${site.name} — logo`}
          >
            {logo}
          </a>

          <ul className={`hidden items-center md:flex ${matrix ? "gap-8" : "gap-7 justify-self-center"}`}>
            {navLinks
              .filter((link) => matrix || !link.matrixOnly)
              .map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={
                    matrix
                      ? "text-sm text-muted transition-colors hover:text-fg"
                      : "font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
            {matrix ? (
              <li>
                <a
                  href="#contact"
                  className="rounded-full bg-accent px-4 py-2 text-sm text-bg transition-transform hover:scale-[1.03]"
                >
                  Contactează-mă
                </a>
              </li>
            ) : null}
          </ul>
          {matrix ? null : (
            <a
              href="#contact"
              className="hidden justify-self-end rounded-sm bg-[#ecece8] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-black transition-colors hover:bg-white md:inline-flex"
            >
              Contactează-mă —
            </a>
          )}

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`absolute h-px w-5 bg-fg transition ${open ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span className={`absolute h-px w-5 bg-fg transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`absolute h-px w-5 bg-fg transition ${open ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="flex h-full flex-col items-center justify-center gap-8">
              {navLinks
                .filter((link) => matrix || !link.matrixOnly)
                .map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-3xl tracking-tight"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="rounded-full bg-accent px-6 py-3 text-bg"
                  onClick={() => setOpen(false)}
                >
                  Contactează-mă
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
