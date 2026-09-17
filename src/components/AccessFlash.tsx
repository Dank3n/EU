"use client";

import { motion } from "framer-motion";
import { useSecretMode } from "@/context/SecretMode";
import { site } from "@/data/content";

/** Flash de ecran când se activează / oprește modul secret. */
export default function AccessFlash() {
  const { flash } = useSecretMode();

  if (!flash) return null;

  const granted = flash === "granted";

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="glitch neon px-6 text-center font-mono text-sm uppercase tracking-[0.35em] text-accent sm:text-lg">
        {granted ? `> ${site.matrix.heading}` : "> SESSION TERMINATED"}
      </p>
    </motion.div>
  );
}
