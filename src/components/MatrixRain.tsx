"use client";

import { useEffect, useRef } from "react";
import { useSecretMode } from "@/context/SecretMode";

/** Ploaie Matrix — rulează doar în modul secret. */
export default function MatrixRain() {
  const { matrix } = useSecretMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matrix) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const glyphs = "01NICADANIEL#$%<>/\\|";
    const step = 20;
    let columns = 0;
    let drops: number[] = [];
    let frame = 0;
    let raf = 0;
    let hidden = document.hidden;

    function resize() {
      if (!canvas) return;
      const width = Math.min(window.innerWidth, 1440);
      const height = Math.min(window.innerHeight, 900);
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / step);
      drops = Array.from({ length: columns }, () => Math.random() * -40);
    }

    function draw() {
      if (!canvas || !context) return;
      raf = window.requestAnimationFrame(draw);
      if (hidden) return;

      frame += 1;
      if (frame % 3 !== 0) return;

      context.fillStyle = "rgba(0, 0, 0, 0.1)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#39ff14";
      context.font = "13px ui-monospace, monospace";

      drops.forEach((y, index) => {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        context.fillText(char, index * step, y * step);
        if (y * step > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        } else {
          drops[index] = y + 1;
        }
      });
    }

    function onVisibility() {
      hidden = document.hidden;
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [matrix]);

  if (!matrix) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2] opacity-20"
      aria-hidden="true"
    />
  );
}
