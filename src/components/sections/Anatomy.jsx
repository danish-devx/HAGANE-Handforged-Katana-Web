import { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapSetup";
import { katanaState } from "../../three/katanaState";
import { useReveal } from "../../hooks/useReveal";
import SectionHeading from "../ui/SectionHeading";
const STATIONS = [
  { rot: 0.5, cam: { x: 10, y: 44, z: 34, tx: 0, ty: 40, tz: 1.3 } },
  { rot: 0.72, cam: { x: 6, y: 10, z: 30, tx: 0, ty: 8, tz: 1.1 } },
  { rot: 1.0, cam: { x: 7, y: -26, z: 26, tx: 0, ty: -28, tz: 0.5 } },
  { rot: 1.35, cam: { x: 6, y: -42, z: 28, tx: 0, ty: -41, tz: 0.3 } },
];

const META = [
  { kanji: "切先", name: "Kissaki", desc: "Tempered point — the bōshi" },
  { kanji: "刃文", name: "Hamon", desc: "Wavy clay-temper line" },
  { kanji: "鍔", name: "Tsuba", desc: "Iron guard, mokko-gata" },
  { kanji: "柄", name: "Tsuka", desc: "Silk ito over ray skin" },
];

export default function Anatomy() {
  const rootRef = useRef(null);
  const revealRef = useReveal();
  const fillRef = useRef(null);
  const countRef = useRef(null);
  const stationEls = useRef([]);
  const lastIdx = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=3600",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onToggle: (s) => {
            katanaState.anatomyActive = s.isActive;
          },
          onUpdate: (self) => {
            const p = self.progress;
            katanaState.anatomy = p;
            if (fillRef.current)
              fillRef.current.style.transform = `scaleY(${p})`;
            const idx = p < 0.27 ? 0 : p < 0.52 ? 1 : p < 0.77 ? 2 : 3;
            if (idx !== lastIdx.current) {
              lastIdx.current = idx;
              if (countRef.current)
                countRef.current.textContent = String(idx + 1).padStart(2, "0");
              stationEls.current.forEach((el, i) => {
                if (el) el.style.opacity = i === idx ? 1 : 0.3;
              });
            }
          },
        },
      });
      tl.to(katanaState, { parallax: 0.12, duration: 0.4 }, 0);
      STATIONS.forEach((s, i) => {
        tl.to(
          katanaState,
          { anatomyRot: s.rot, duration: 1, ease: "power2.inOut" },
          i,
        );
        tl.to(
          katanaState.cam,
          { ...s.cam, duration: 1, ease: "power2.inOut" },
          i,
        );
      });
      tl.to(katanaState, { parallax: 1, duration: 0.4 }, 3.6);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="anatomy" ref={rootRef} className="relative">
      <div
        ref={revealRef}
        className="relative flex h-screen flex-col overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-linear-to-r from-sumi via-sumi/55 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[26%] bg-linear-to-l from-sumi/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-sumi/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-sumi/90 to-transparent" />

        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 top-16 select-none font-mincho text-[22rem] leading-none text-kinari/4.5"
        >
          刀
        </span>

        <div className="relative z-10 px-5 pt-24 md:px-10 md:pt-28">
          <SectionHeading no="02" kanji="解剖" title="Anatomy" tone="onDark" />
          <h2
            data-reveal
            className="mt-6 max-w-xl font-mincho text-3xl leading-tight md:text-5xl"
          >
            Every part has a name.
            <br />
            <span className="text-kinari/60">Every name, a purpose.</span>
          </h2>
        </div>

        <ul className="relative z-10 mt-14 max-w-xs space-y-7 px-5 md:px-10">
          {META.map((m, i) => (
            <li
              key={m.name}
              ref={(el) => (stationEls.current[i] = el)}
              style={{ opacity: i === 0 ? 1 : 0.3 }}
              className="transition-opacity duration-500"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[10px] tracking-[0.3em] text-shu">
                  0{i + 1}
                </span>
                <span className="font-mincho text-xl text-shu/90">
                  {m.kanji}
                </span>
                <span className="font-mincho text-lg tracking-wide">
                  {m.name}
                </span>
              </div>
              <p className="mt-1 pl-[4.2rem] text-[10px] uppercase tracking-[0.2em] text-kinari/45">
                {m.desc}
              </p>
            </li>
          ))}
        </ul>

        <div className="absolute right-6 top-1/2 z-10 flex h-44 -translate-y-1/2 flex-col items-center gap-3 md:right-10">
          <span className="v-text text-[9px] uppercase tracking-[0.4em] text-kinari/40">
            Inspect
          </span>
          <div className="relative w-px flex-1 bg-kinari/15">
            <div
              ref={fillRef}
              className="absolute inset-0 origin-top scale-y-0 bg-shu"
            />
          </div>
          <span ref={countRef} className="font-mincho text-sm text-kinari/80">
            01
          </span>
        </div>

        <div className="relative z-10 mt-auto flex items-end justify-between px-5 pb-8 md:px-10">
          <p className="max-w-[240px] text-[10px] uppercase leading-relaxed tracking-[0.25em] text-kinari/40">
            Scroll — the blade presents itself, part by part
          </p>
          <p className="hidden text-[10px] uppercase tracking-[0.3em] text-kinari/30 md:block">
            04 stations · 刀身 70cm
          </p>
        </div>
      </div>
    </section>
  );
}
