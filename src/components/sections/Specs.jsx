import { useEffect } from "react";
import { gsap } from "../../utils/gsapSetup";
import { useReveal } from "../../hooks/useReveal";
import { HERO_SPEC, SPECS, MATERIALS } from "../../data/specs";
import SectionHeading from "../ui/SectionHeading";

export default function Specs() {
  const rootRef = useReveal();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const raw = el.dataset.count;
        const target = parseFloat(raw);
        if (Number.isNaN(target)) return;
        const decimals = (raw.split(".")[1] || "").length;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="specs"
      ref={rootRef}
      className="noise relative bg-kinari text-sumi"
    >
      <div className="mx-auto max-w-350 px-5 py-28 md:px-10 md:py-36">
        <SectionHeading
          no="04"
          kanji="仕様"
          title="Specifications"
          tone="onLight"
        />

        <h2
          data-reveal
          className="mt-8 font-mincho text-4xl leading-tight md:text-6xl"
        >
          Measured in millimetres.
          <br />
          <span className="text-sumi/50">Judged in centuries.</span>
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div data-reveal className="flex items-start gap-6">
              <span className="v-text select-none font-mincho text-sm tracking-[0.5em] text-sumi/40">
                刀身寸法
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-sumi/60">
                  {HERO_SPEC.term} — {HERO_SPEC.en}
                </p>
                <div className="mt-4 flex items-baseline font-mincho">
                  <span
                    data-count={HERO_SPEC.value}
                    className="text-[clamp(5.5rem,13vw,10rem)] leading-none"
                  >
                    {HERO_SPEC.value}
                  </span>
                  <span className="ml-3 text-3xl text-sumi/50">
                    {HERO_SPEC.unit}
                  </span>
                </div>
                <p className="mt-2 text-xs text-sumi/50">
                  {HERO_SPEC.imperial} · mounted 1.15 kg
                </p>
              </div>
            </div>

            <div data-reveal data-reveal-delay="0.2" className="mt-12 max-w-md">
              <div className="relative h-px bg-sumi/35">
                <span className="absolute -left-px -top-2 h-4 w-px bg-sumi/60" />
                <span className="absolute -right-px -top-2 h-4 w-px bg-sumi/60" />
                <span className="absolute left-1/2 -top-7 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.4em] text-sumi/50">
                  nagasa · 70.0
                </span>
              </div>
              <p className="mt-6 max-w-xs text-xs leading-relaxed text-sumi/55">
                {HERO_SPEC.note}
              </p>
            </div>
          </div>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
            {SPECS.map((s, i) => (
              <div
                key={s.term}
                data-reveal
                data-reveal-delay={i * 0.07}
                className="border-t border-sumi/20 pt-5"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mincho text-sm text-shu">
                    {s.kanji}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-sumi/45">
                    {s.en}
                  </span>
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-sumi/60">
                  {s.term}
                </p>
                <div className="mt-2 font-mincho text-4xl md:text-5xl">
                  <span data-count={s.value}>{s.value}</span>
                  {s.unit && (
                    <span className="ml-1.5 text-lg text-sumi/50">
                      {s.unit}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-sumi/55">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 border-t border-sumi/20 pt-10">
          <p
            data-reveal
            className="text-[10px] uppercase tracking-[0.4em] text-sumi/50"
          >
            Materials — the palette of the WebGL twin above
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-5">
            {MATERIALS.map((m, i) => (
              <div key={m.name} data-reveal data-reveal-delay={i * 0.08}>
                <span
                  className="block h-8 w-8 rounded-full ring-1 ring-sumi/15"
                  style={{
                    backgroundColor: m.hex,
                    boxShadow: "inset 0 -6px 10px rgba(0,0,0,0.18)",
                  }}
                />
                <p className="mt-3 font-mincho text-sm">
                  {m.kanji} <span className="ml-1">{m.name}</span>
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-sumi/50">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
