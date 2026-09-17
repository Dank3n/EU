"use client";

import { site } from "@/data/content";
import { useSecretMode } from "@/context/SecretMode";

export default function Footer() {
  const year = new Date().getFullYear();
  const { toggle, matrix } = useSecretMode();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="neon">{matrix ? site.matrix.name : site.name}</p>
        <p>© {year} {site.name}. Toate drepturile rezervate.</p>
        <button
          type="button"
          onClick={toggle}
          className="self-start font-mono text-[11px] tracking-[0.18em] text-muted/40 transition-colors hover:text-accent"
          aria-label="Comută modul secret"
        >
          {matrix ? "// exit" : "// root"}
        </button>
      </div>
    </footer>
  );
}
