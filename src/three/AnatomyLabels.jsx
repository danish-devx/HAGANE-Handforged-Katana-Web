import { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { katanaState } from "./katanaState";
const LABELS = [
  {
    kanji: "切先",
    name: "Kissaki",
    desc: "Tempered point — bōshi",
    pos: [1.6, 66, 1.4],
    band: [0.02, 0.27],
  },
  {
    kanji: "刃文",
    name: "Hamon",
    desc: "Wavy clay-temper line",
    pos: [2.1, 36, 1.05],
    band: [0.27, 0.52],
  },
  {
    kanji: "鍔",
    name: "Tsuba",
    desc: "Iron guard — mokko-gata",
    pos: [2.8, -0.6, 0.5],
    band: [0.52, 0.77],
  },
  {
    kanji: "柄",
    name: "Tsuka",
    desc: "Silk ito over ray skin",
    pos: [2.4, -12, 0.2],
    band: [0.77, 0.99],
  },
];
const bandFade = (p, a, b, e = 0.045) =>
  THREE.MathUtils.smoothstep(p, a, a + e) *
  (1 - THREE.MathUtils.smoothstep(p, b - e, b));

export default function AnatomyLabels() {
  const els = useRef([]);
  const master = useRef(0);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    master.current = THREE.MathUtils.damp(
      master.current,
      katanaState.anatomyActive ? 1 : 0,
      4,
      d,
    );
    const p = katanaState.anatomy;

    els.current.forEach((el, i) => {
      if (!el) return;
      const L = LABELS[i];
      const o = master.current * bandFade(p, L.band[0], L.band[1]);
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o < 0.01 ? "hidden" : "visible";
      const inner = el.firstElementChild;
      if (inner)
        inner.style.transform = `translateY(${((1 - o) * 14).toFixed(2)}px)`;
    });
  });

  return (
    <>
      {LABELS.map((L, i) => (
        <Html key={L.name} position={L.pos} zIndexRange={[6, 0]}>
          <div
            ref={(el) => (els.current[i] = el)}
            style={{ opacity: 0, visibility: "hidden" }}
            className="pointer-events-none select-none"
          >
            <div className="flex -translate-y-1/2 items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-shu shadow-[0_0_10px_rgba(195,39,43,0.9)]" />
              <span className="h-px w-10 bg-gradient-to-r from-shu to-shu/40" />

              <span className="border-l border-shu/40 bg-sumi/70 py-1.5 pl-3 pr-4 backdrop-blur-sm">
                <span className="flex items-baseline gap-2">
                  <span className="font-mincho text-base text-shu">
                    {L.kanji}
                  </span>
                  <span className="font-mincho text-sm tracking-wide text-kinari">
                    {L.name}
                  </span>
                </span>
                <span className="block whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-kinari/50">
                  {L.desc}
                </span>
              </span>
            </div>
          </div>
        </Html>
      ))}
    </>
  );
}
