"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "$ ./boot nica-daniel.sys",
  "> loading kernel modules .............. ok",
  "> hydrating interface .................. ok",
  "> nica-daniel ready",
];

type PreloaderProps = {
  onDone: () => void;
};

/** Intro de 1.5s, stil terminal, apoi fade-out. */
export default function Preloader({ onDone }: PreloaderProps) {
  const [visibleLines, setVisibleLines] = useState(1);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bootMs = reduced ? 200 : 1500;
    const lineTimers = [0, 280, 620, 980].map((delay, index) =>
      window.setTimeout(() => setVisibleLines(index + 1), delay),
    );
    const leaveTimer = window.setTimeout(() => setLeaving(true), bootMs);
    const doneTimer = window.setTimeout(onDone, bootMs + 420);

    return () => {
      lineTimers.forEach(clearTimeout);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="w-[min(92vw,34rem)] rounded-lg border border-white/10 bg-black px-5 py-5 font-mono text-[13px] text-[#39ff14] shadow-[0_0_80px_rgba(57,255,20,0.08)] sm:px-6">
        <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
            boot — nica.daniel
          </span>
        </div>
        <ul className="space-y-2">
          {LINES.slice(0, visibleLines).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="mt-6 h-px overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-[#39ff14]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.45, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
