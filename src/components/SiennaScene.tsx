"use client";

const BIRDS = [
  { left: "4%", top: "8%", width: "9.2rem", delay: "0s", flap: "1.12s", soar: "4.2s" },
  { left: "18%", top: "38%", width: "7.1rem", delay: "0.28s", flap: "1.28s", soar: "3.6s" },
  { left: "31%", top: "4%", width: "8.1rem", delay: "0.5s", flap: "1.18s", soar: "4.8s" },
  { left: "46%", top: "46%", width: "6.4rem", delay: "0.12s", flap: "1.36s", soar: "3.9s" },
  { left: "60%", top: "16%", width: "7.8rem", delay: "0.64s", flap: "1.22s", soar: "4.4s" },
  { left: "74%", top: "34%", width: "6.8rem", delay: "0.38s", flap: "1.32s", soar: "3.7s" },
];

/** Gravură Sienna: placa, râul, șalupele și berzele. */
export default function SiennaScene() {
  return (
    <div className="sienna-ink pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src="/footer/plate.jpg"
        srcSet="/footer/plate-sm.jpg 800w, /footer/plate.jpg 1280w"
        sizes="100vw"
        alt=""
        className="sienna-plate absolute inset-0 h-full w-full object-cover"
      />
      <div className="sienna-water" />
      <div className="sienna-barge sienna-barge-a">
        <div className="sienna-row">
          <img src="/footer/barge-row-catch.webp" alt="" className="sienna-row-catch" />
          <img src="/footer/barge-open.webp" alt="" className="sienna-row-drive" />
          <img src="/footer/barge-row-finish.webp" alt="" className="sienna-row-finish" />
        </div>
        <span className="sienna-wake" />
      </div>
      <div className="sienna-barge sienna-barge-b">
        <img src="/footer/barge-cabin.webp" alt="" />
        <span className="sienna-wake" />
      </div>
      <div className="sienna-flock">
        {BIRDS.map((bird, index) => (
          <span
            key={index}
            className="sienna-stork"
            style={{
              left: bird.left,
              top: bird.top,
              width: bird.width,
              ["--stork-delay" as string]: bird.delay,
              ["--flap" as string]: bird.flap,
              ["--soar" as string]: bird.soar,
            }}
          >
            <span className="sienna-soar">
              <img src="/footer/stork-up.webp" alt="" className="sienna-stork-a" />
              <img src="/footer/stork-mid.webp" alt="" className="sienna-stork-c" />
              <img src="/footer/stork-down.webp" alt="" className="sienna-stork-b" />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
