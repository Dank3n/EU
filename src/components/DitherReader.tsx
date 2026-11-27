"use client";

import { useEffect, useRef } from "react";

const SRC = "/hero/reader.jpg";
const DUST = "-–=/\\|.#*+~";
const LETTERS = "nicaDANIEL";
const WORDS = ["clar", "viu", "cod", "live", "loc", "site"];

const BAYER_8 = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28,
  52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39,
  13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
].map((value) => (value + 0.5) / 64);

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  glyph: string | null;
  rot: number;
  vr: number;
  from: "head" | "book";
};

type Fit = { dx: number; dy: number; dw: number; dh: number };

function coverDraw(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
): Fit {
  const scale = Math.max(width / image.width, height / image.height);
  const dw = image.width * scale;
  const dh = image.height * scale;
  const dx = (width - dw) * 0.15;
  const dy = dh >= height ? (height - dh) * 0.06 : 0;
  ctx.drawImage(image, dx, dy, dw, dh);
  return { dx, dy, dw, dh };
}

function inHead(u: number, v: number) {
  const hx = (u - 0.6) / 0.2;
  const hy = (v - 0.145) / 0.125;
  return v > 0.02 && v < 0.3 && u > 0.4 && u < 0.8 && hx * hx + hy * hy <= 1;
}

function inBook(u: number, v: number) {
  const top = 0.535 + (u - 0.06) * 0.02;
  const bottom = 0.655 - (u - 0.06) * 0.04;
  return u > 0.055 && u < 0.485 && v > top && v < bottom;
}

function ditherFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement,
) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  const fit = coverDraw(ctx, image, width, height);
  const source = ctx.getImageData(0, 0, width, height);
  const data = source.data;
  const head: number[] = [];
  const book: number[] = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      const luma = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
      const threshold = BAYER_8[(y & 7) * 8 + (x & 7)];
      const ink = luma > threshold * 0.9 ? 236 : 0;
      data[i] = data[i + 1] = data[i + 2] = ink;
      data[i + 3] = 255;
      const u = (x - fit.dx) / fit.dw;
      const v = (y - fit.dy) / fit.dh;
      if (u < 0 || v < 0 || u > 1 || v > 1) continue;
      if (ink && inHead(u, v) && x % 2 === 0 && y % 2 === 0 && head.length < 3200) {
        head.push(x, y);
      } else if (luma > 0.12 && inBook(u, v) && x % 3 === 0 && y % 3 === 0 && book.length < 3600) {
        book.push(x, y);
      }
    }
  }

  ctx.putImageData(source, 0, 0);
  return { bitmap: source, head, book, fit };
}

function pick(points: number[]) {
  const i = (Math.random() * (points.length / 2)) | 0;
  return { x: points[i * 2], y: points[i * 2 + 1] };
}

function spawnHead(from: { x: number; y: number }, unit: number): Particle {
  const roll = Math.random();
  const glyph =
    roll < 0.38 ? "-" : roll < 0.62 ? LETTERS[(Math.random() * LETTERS.length) | 0] : roll < 0.78 ? DUST[(Math.random() * DUST.length) | 0] : null;
  return {
    x: from.x,
    y: from.y,
    vx: (0.7 + Math.random() * 1.7) * unit,
    vy: -(1.05 + Math.random() * 1.7) * unit,
    life: 0,
    max: 80 + Math.random() * 110,
    size: glyph === "-" ? 9 + Math.random() * 6 : glyph ? 7 + Math.random() * 5 : 2.4 + Math.random() * 4.2,
    glyph,
    rot: (Math.random() - 0.5) * 0.6,
    vr: (Math.random() - 0.5) * 0.04,
    from: "head",
  };
}

function spawnBook(from: { x: number; y: number }, unit: number): Particle {
  const word = Math.random() < 0.42;
  const glyph = word
    ? WORDS[(Math.random() * WORDS.length) | 0]
    : Math.random() < 0.75
      ? LETTERS[(Math.random() * LETTERS.length) | 0]
      : null;
  return {
    x: from.x,
    y: from.y,
    vx: (Math.random() - 0.42) * 0.55 * unit,
    vy: -(0.06 + Math.random() * 0.22) * unit,
    life: 0,
    max: word ? 110 + Math.random() * 80 : 70 + Math.random() * 60,
    size: word ? 12 + Math.random() * 6 : glyph ? 9 + Math.random() * 5 : 3.2 + Math.random() * 4.2,
    glyph,
    rot: (Math.random() - 0.5) * 0.45,
    vr: (Math.random() - 0.5) * 0.035,
    from: "book",
  };
}

function punch(bitmap: ImageData, x: number, y: number, radius: number) {
  const { width, height, data } = bitmap;
  const r = Math.max(1, radius | 0);
  for (let oy = -r; oy <= r; oy += 1) {
    for (let ox = -r; ox <= r; ox += 1) {
      const px = (x + ox) | 0;
      const py = (y + oy) | 0;
      if (px < 0 || py < 0 || px >= width || py >= height) continue;
      const i = (py * width + px) * 4;
      data[i] = data[i + 1] = data[i + 2] = 0;
    }
  }
}

/** 1-bit marble reader: chunks break off the head and letters lift from the book. */
export default function DitherReader({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const surface = canvas;
    const gfx = ctx;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const image = new Image();
    image.src = SRC;
    image.decoding = "async";

    let width = 1;
    let height = 1;
    let raf = 0;
    let frame = 0;
    let hidden = document.hidden;
    let visible = true;
    let prepared: ReturnType<typeof ditherFrame> | null = null;
    let intact: Uint8ClampedArray | null = null;
    const particles: Particle[] = [];

    function resize() {
      const node = surface.parentElement;
      if (!node) return;
      const nextW = Math.max(1, Math.floor(node.clientWidth));
      const nextH = Math.max(1, Math.floor(node.clientHeight));
      const cap = 900;
      const scale = Math.min(1, cap / Math.max(nextW, nextH));
      width = Math.max(1, Math.floor(nextW * scale));
      height = Math.max(1, Math.floor(nextH * scale));
      surface.width = width;
      surface.height = height;
      surface.style.width = `${nextW}px`;
      surface.style.height = `${nextH}px`;
      prepared = image.complete ? ditherFrame(gfx, width, height, image) : null;
      intact = prepared ? new Uint8ClampedArray(prepared.bitmap.data) : null;
      particles.length = 0;
    }

    function tick() {
      raf = window.requestAnimationFrame(tick);
      if (hidden || !visible || !prepared) return;
      frame += 1;
      if (frame % 2 !== 0) return;

      gfx.putImageData(prepared.bitmap, 0, 0);

      if (reduced) return;

      if (intact && frame % 420 === 0) {
        prepared.bitmap.data.set(intact);
      }

      const unit = Math.max(width, height) / 820;
      const headN = prepared.head.length / 2;
      const bookN = prepared.book.length / 2;
      const budget = particles.length < 420 ? 1 : 0;
      const headBurst = budget ? 22 : 9;
      const bookBurst = budget ? 22 : 10;

      if (headN > 0) {
        for (let i = 0; i < headBurst; i += 1) {
          const origin = pick(prepared.head);
          particles.push(spawnHead(origin, unit));
          punch(prepared.bitmap, origin.x, origin.y, 2);
        }
      }
      if (bookN > 0) {
        for (let i = 0; i < bookBurst; i += 1) {
          const origin = pick(prepared.book);
          particles.push(spawnBook(origin, unit));
          punch(prepared.bitmap, origin.x, origin.y, 2);
        }
      }

      gfx.fillStyle = "#ecece8";
      gfx.textBaseline = "middle";
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= p.from === "head" ? 0.014 * unit : 0;
        p.vy += p.from === "book" ? 0.0018 * unit : 0;
        p.vx *= p.from === "book" ? 0.985 : 0.995;
        p.rot += p.vr;
        const t = p.life / p.max;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }
        gfx.globalAlpha = (1 - t) * (1 - t * 0.35);
        if (p.glyph) {
          gfx.save();
          gfx.translate(p.x, p.y);
          gfx.rotate(p.rot);
          gfx.font = `${p.size}px ui-monospace, "IBM Plex Mono", monospace`;
          gfx.fillText(p.glyph, 0, 0);
          gfx.restore();
        } else {
          gfx.fillRect(p.x, p.y, p.size, p.size);
        }
      }
      gfx.globalAlpha = 1;
    }

    function onVisibility() {
      hidden = document.hidden;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.12;
      },
      { threshold: [0, 0.12, 0.4] },
    );
    observer.observe(surface);

    image.onload = () => {
      resize();
      if (reduced && prepared) {
        gfx.putImageData(prepared.bitmap, 0, 0);
        return;
      }
      tick();
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full bg-black"
      aria-hidden
    />
  );
}
