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
    let columns = 0;
    let drops: number[] = [];
    let frame = 0;
    let raf = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / 16);
      drops = Array.from({ length: columns }, () => Math.random() * -40);
    }

    function draw() {
      if (!canvas || !context) return;
      context.fillStyle = "rgba(0, 0, 0, 0.08)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#39ff14";
      context.font = "14px ui-monospace, monospace";

      frame += 1;
      if (frame % 2 === 0) {
        drops.forEach((y, index) => {
          const char = glyphs[Math.floor(Math.random() * glyphs.length)];
          context.fillText(char, index * 16, y * 16);
          if (y * 16 > canvas.height && Math.random() > 0.975) {
            drops[index] = 0;
          } else {
            drops[index] = y + 1;
          }
        });
      }

      raf = window.requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
