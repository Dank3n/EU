"use client";

import { useEffect, useRef } from "react";

const CHARS = " .:-=+*#%@";
const CELL = 14;

function fade(t: number) {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = fade(xf);
  const v = fade(yf);
  return lerp(
    lerp(hash2(xi, yi), hash2(xi + 1, yi), u),
    lerp(hash2(xi, yi + 1), hash2(xi + 1, yi + 1), u),
    v,
  );
}

function fbm(x: number, y: number) {
  let value = 0;
  let amp = 0.52;
  let freq = 1;
  let sum = 0;
  for (let i = 0; i < 5; i += 1) {
    value += amp * noise(x * freq, y * freq);
    sum += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return value / sum;
}

function makeAtlas(dpr: number) {
  const size = Math.round(CELL * dpr);
  const atlas = document.createElement("canvas");
  atlas.width = size * CHARS.length;
  atlas.height = size;
  const ctx = atlas.getContext("2d");
  if (!ctx) return atlas;
  ctx.clearRect(0, 0, atlas.width, atlas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${Math.round(12 * dpr)}px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillStyle = "#39ff14";
  for (let i = 0; i < CHARS.length; i += 1) {
    ctx.fillText(CHARS[i], size * (i + 0.5), size * 0.56);
  }
  return atlas;
}

/** Câmp ASCII fosfor-verde cu scanlines CRT — fundal pentru hero-ul Matrix. */
export default function AsciiFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let atlas = makeAtlas(dpr);
    let cols = 0;
    let rows = 0;
    let cssW = 0;
    let cssH = 0;
    let raf = 0;
    let frame = 0;
    let visible = true;
    let hidden = document.hidden;
    let start = performance.now();

    function resize() {
      if (!canvas) return;
      cssW = canvas.clientWidth;
      cssH = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(cssW * dpr));
      canvas.height = Math.max(1, Math.floor(cssH * dpr));
      cols = Math.ceil(cssW / CELL) + 1;
      rows = Math.ceil(cssH / CELL) + 1;
      atlas = makeAtlas(dpr);
    }

    function paint(time: number) {
      if (!ctx || !canvas) return;
      const t = time * 0.000075;
      const tile = CELL * dpr;
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const typed = reduced ? 1 : Math.min(1, time / 1100);

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          if (typed < 1 && (y * cols + x) / (cols * rows) > typed) continue;

          const nx = x * 0.026;
          const ny = y * 0.026;
          const warp = fbm(nx * 0.48 + t * 0.7, ny * 0.48 - t * 0.42);
          const field = fbm(nx + warp * 3.1 + t, ny - warp * 2.4 - t * 0.5);
          const grain = noise(x * 0.41 + t * 1.8, y * 0.41);
          const raw = field * 0.9 + grain * 0.1;
          const lifted = Math.min(1, Math.max(0, (raw - 0.34) * 2.05));
          const v = lifted * lifted;
          if (v < 0.03) continue;

          const idx = Math.min(CHARS.length - 1, Math.floor(v * (CHARS.length - 0.001)));
          if (idx === 0) continue;

          ctx.globalAlpha = 0.16 + v * 0.84;
          ctx.drawImage(atlas, idx * tile, 0, tile, tile, x * tile, y * tile, tile, tile);
        }
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
      const step = Math.max(2, Math.round(3 * dpr));
      for (let y = 0; y < canvas.height; y += step) {
        ctx.fillRect(0, y, canvas.width, dpr);
      }

      const scan = ((time * 0.038) % (cssH + 100)) * dpr;
      ctx.fillStyle = "rgba(57, 255, 20, 0.055)";
      ctx.fillRect(0, scan, canvas.width, 22 * dpr);
      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      ctx.fillRect(0, scan + 22 * dpr, canvas.width, 10 * dpr);
    }

    function draw(now: number) {
      raf = window.requestAnimationFrame(draw);
      if (hidden || !visible) return;
      frame += 1;
      if (frame % 2 !== 0) return;
      paint(now - start);
    }

    function onVisibility() {
      hidden = document.hidden;
    }

    resize();
    const startLoop = () => {
      atlas = makeAtlas(dpr);
      if (reduced) {
        paint(8000);
        return;
      }
      raf = window.requestAnimationFrame(draw);
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(startLoop).catch(startLoop);
    } else {
      startLoop();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.04;
      },
      { threshold: [0, 0.04, 0.2] },
    );
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ascii-flow pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
