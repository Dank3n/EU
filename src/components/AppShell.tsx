"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { SecretModeProvider, useSecretMode } from "@/context/SecretMode";
import Preloader from "@/components/Preloader";
import MatrixRain from "@/components/MatrixRain";
import AccessFlash from "@/components/AccessFlash";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import MatrixOffer from "@/components/MatrixOffer";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { site } from "@/data/content";

/** Orchestrator client: preloader + temă + secțiuni. */
export default function AppShell() {
  return (
    <SecretModeProvider>
      <Experience />
    </SecretModeProvider>
  );
}

function Experience() {
  const [booting, setBooting] = useState(true);
  const onDone = useCallback(() => setBooting(false), []);
  const { matrix } = useSecretMode();

  return (
    <>
      {booting && <Preloader onDone={onDone} />}
      <AccessFlash />
      <MatrixRain />
      <div className="grid-bg" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booting ? 0 : 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={booting ? "pointer-events-none" : undefined}
        aria-hidden={booting}
      >
        <p className="sr-only" role="status">
          {matrix ? site.matrix.sub : ""}
        </p>
        <Navbar />
        <main>
          <Hero ready={!booting} />
          {matrix && <MatrixOffer />}
          <About />
          <Skills />
          {matrix && <Portfolio />}
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
