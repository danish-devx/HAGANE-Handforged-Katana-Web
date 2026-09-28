import { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapSetup";
import { FORGE_STEPS } from "../../data/forgeSteps";
import SectionHeading from "../ui/SectionHeading";
import ForgeIcon from "../ui/ForgeIcon";
const TEMP_CURVE = [
  [0, 25],
  [0.05, 180],
  [0.23, 1180],
  [0.42, 1260],
  [0.5, 1320],
  [0.54, 160],
  [0.61, 80],
  [0.79, 20],
  [1, 18],
];
const THRESHOLDS = [0.05, 0.23, 0.42, 0.61, 0.79];

const tempAt = (p) => {
  for (let i = 1; i < TEMP_CURVE.length; i++) {
    if (p <= TEMP_CURVE[i][0]) {
      const [x0, y0] = TEMP_CURVE[i - 1];
      const [x1, y1] = TEMP_CURVE[i];
      return y0 + ((p - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return TEMP_CURVE[TEMP_CURVE.length - 1][1];
};
const tempColor = (t) => {
  const k = Math.min(Math.max((t - 100) / 1200, 0), 1);
  const r = Math.round(244 + 11 * k);
  const g = Math.round(239 - 147 * k);
  const b = Math.round(230 - 188 * k);
  return `rgb(${r},${g},${b})`;
};
const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 61) % 100}%`,
  size: 2 + ((i * 7) % 3),
  dur: 6 + ((i * 13) % 5),
  del: -((i * 1.7) % 7),
  dx: `${((i * 37) % 10) - 5}vw`,
  o: 0.35 + ((i * 11) % 30) / 100,
}));

function Embers() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="ember absolute bottom-[12%] rounded-full bg-shu"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            "--edur": `${e.dur}s`,
            "--edel": `${e.del}s`,
            "--edx": e.dx,
            "--eo": e.o,
            boxShadow: "0 0 6px rgba(195,39,43,0.8)",
          }}
        />
      ))}
    </div>
  );
}

export default function Forge() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const tempRef = useRef(null);
  const countRef = useRef(null);
  const lastIdx = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const getDist = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => "+=" + getDist(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (fillRef.current)
              fillRef.current.style.transform = `scaleX(${p})`;

            const t = tempAt(p);
            if (tempRef.current) {
              tempRef.current.textContent = `${Math.round(t).toLocaleString("en-US")}°C`;
              tempRef.current.style.color = tempColor(t);
            }

            let idx = 0;
            for (const th of THRESHOLDS) if (p >= th) idx++;
            if (idx !== lastIdx.current) {
              lastIdx.current = idx;
              if (countRef.current)
                countRef.current.textContent = String(
                  Math.max(idx, 1),
                ).padStart(2, "0");
            }
          },
        },
      });
      rootRef.current.querySelectorAll("[data-panel]").forEach((panel) => {
        const els = panel.querySelectorAll("[data-p-reveal]");
        if (!els.length) return;
        gsap.from(els, {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left 75%",
            once: true,
          },
        });
      });
    });
    mm.add("(max-width: 767px)", () => {
      rootRef.current.querySelectorAll("[data-panel]").forEach((panel) => {
        const els = panel.querySelectorAll("[data-p-reveal]");
        if (!els.length) return;
        gsap.from(els, {
          y: 28,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 82%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="forge" ref={rootRef} className="relative bg-sumi">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 108%, rgba(195,39,43,0.16), transparent 70%)",
        }}
      />
      <Embers />

      <div className="relative overflow-hidden md:h-screen">
        <div
          ref={trackRef}
          className="flex w-full flex-col md:h-full md:w-max md:flex-row"
        >
          <div
            data-panel
            className="relative flex w-full shrink-0 flex-col justify-center px-6 py-24 md:w-screen md:px-10 md:py-0"
          >
            <div className="max-w-3xl">
              <SectionHeading
                no="03"
                kanji="鍛冶"
                title="The Forge"
                tone="onDark"
              />
              <h2
                data-p-reveal
                className="mt-8 font-mincho text-[clamp(2.6rem,7vw,6rem)] leading-[1.02]"
              >
                Forged in fire,
                <br />
                <span className="text-kinari/55">revealed in steel.</span>
              </h2>
              <p
                data-p-reveal
                className="mt-6 max-w-md text-sm leading-relaxed text-kinari/65"
              >
                Five rites, six months, one blade. The journey runs sideways —
                the way smoke leaves a quenching trough.
              </p>
              <div
                data-p-reveal
                className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-shu"
              >
                <span className="h-px w-10 bg-shu" /> Follow the heat
              </div>
            </div>
          </div>

          {FORGE_STEPS.map((s) => (
            <div
              key={s.no}
              data-panel
              className="relative flex w-full shrink-0 flex-col justify-center overflow-hidden px-6 py-24 md:w-[78vw] md:px-0 md:py-0"
            >
              <span
                aria-hidden
                className="kanji-outline pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-mincho leading-none md:right-[2%]"
              >
                {s.mark}
              </span>

              <div className="relative z-10 max-w-xl md:pl-20 lg:pl-28">
                <div data-p-reveal className="flex items-center gap-4">
                  <ForgeIcon
                    variant={s.icon}
                    className="h-16 w-16 text-kinari/80 md:h-20 md:w-20"
                  />
                  <span className="font-mincho text-lg text-shu">
                    {s.kanji}
                  </span>
                </div>
                <div data-p-reveal className="mt-6 flex items-baseline gap-4">
                  <span className="text-sm tracking-[0.3em] text-shu">
                    {s.no}
                  </span>
                  <h3 className="font-mincho text-4xl md:text-6xl">{s.name}</h3>
                </div>
                <p
                  data-p-reveal
                  className="mt-2 text-[11px] uppercase tracking-[0.35em] text-kinari/45"
                >
                  {s.tag}
                </p>
                <p
                  data-p-reveal
                  className="mt-6 max-w-md text-sm leading-relaxed text-kinari/70"
                >
                  {s.desc}
                </p>
                <div data-p-reveal className="mt-8 flex flex-wrap gap-2.5">
                  {s.chips.map((c) => (
                    <span
                      key={c}
                      className="border border-kinari/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-kinari/60"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div aria-hidden className="w-[30vw] shrink-0" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden items-end justify-between px-6 pb-7 md:flex md:px-10">
        <div>
          <p className="text-[9px] uppercase tracking-[0.4em] text-kinari/35">
            Furnace
          </p>
          <p
            ref={tempRef}
            className="mt-1 font-mincho text-3xl tabular-nums"
            style={{ color: "rgb(244,239,230)" }}
          >
            25°C
          </p>
        </div>

        <div className="mx-10 flex-1">
          <div className="relative h-px w-full bg-kinari/15">
            <div
              ref={fillRef}
              className="absolute inset-0 origin-left scale-x-0 bg-shu"
            />
            {THRESHOLDS.map((t) => (
              <span
                key={t}
                className="absolute top-1/2 h-1.5 w-px -translate-y-1/2 bg-kinari/25"
                style={{ left: `${t * 100}%` }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span ref={countRef} className="font-mincho text-3xl">
            01
          </span>
          <span className="text-[10px] tracking-[0.3em] text-kinari/40">
            / 05
          </span>
        </div>
      </div>
    </section>
  );
}
