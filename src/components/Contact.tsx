"use client";

import { FormEvent, useState } from "react";
import { site } from "@/data/content";
import Reveal from "@/components/Reveal";
import { useSecretMode } from "@/context/SecretMode";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const { matrix } = useSecretMode();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const sender = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Mesaj de pe portofoliu — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${sender})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setStatus("sent");
    form.reset();
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
        <Reveal className="lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            {matrix ? "04 — Contact" : "03 — Contact"}
          </p>
          <h2 className="glitch mt-4 text-4xl tracking-tight sm:text-5xl">
            {matrix ? "Ping me." : "Hai să discutăm"}
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Ai un proiect în minte sau vrei o colaborare? Sună-mă sau lasă un mesaj — răspund cât de curând posibil.
          </p>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="font-mono uppercase tracking-widest text-muted">Telefon</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="text-lg neon hover:text-accent">
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono uppercase tracking-widest text-muted">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
              </dd>
            </div>
            {(site.website.includes("PLACEHOLDER") &&
              site.linkedin.includes("PLACEHOLDER") &&
              site.github.includes("PLACEHOLDER")) ? null : (
              <div>
                <dt className="font-mono uppercase tracking-widest text-muted">Online</dt>
                <dd className="mt-2 flex flex-wrap gap-4">
                  <SocialLink href={site.website} label="Website" />
                  <SocialLink href={site.linkedin} label="LinkedIn" />
                  <SocialLink href={site.github} label="GitHub" />
                </dd>
              </div>
            )}
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">Nume</span>
              <input
                required
                name="name"
                type="text"
                autoComplete="name"
                className="w-full rounded-md border border-line bg-transparent px-4 py-3 outline-none transition focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">Email</span>
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-md border border-line bg-transparent px-4 py-3 outline-none transition focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">Mesaj</span>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full resize-y rounded-md border border-line bg-transparent px-4 py-3 outline-none transition focus:border-accent"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-3 text-sm text-bg transition-transform hover:scale-[1.03]"
            >
              Trimite mesajul
            </button>
            {status === "sent" && (
              <p className="text-sm text-muted" role="status">
                Mulțumesc! Mesajul a fost pregătit.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  if (href.includes("PLACEHOLDER")) {
    return <span className="text-muted/60">{label}</span>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-accent hover:underline">
      {label}
    </a>
  );
}
