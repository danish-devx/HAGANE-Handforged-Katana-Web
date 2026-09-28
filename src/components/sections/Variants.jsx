import { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapSetup";
import { useReveal } from "../../hooks/useReveal";
import { VARIANTS } from "../../data/variants";
import SwordSilhouette from "../ui/SwordSilhouette";
import SectionHeading from "../ui/SectionHeading";

function VariantTile({ v }) {
  const tiltRef = useRef(null);
  const silRef = useRef(null);
  const fx = useRef({});

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const el = tiltRef.current,
      sil = silRef.current;
    fx.current = {
      rx: gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" }),
      ry: gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" }),
      sx: gsap.quickTo(sil, "x", { duration: 0.7, ease: "power3.out" }),
      sy: gsap.quickTo(sil, "y", { duration: 0.7, ease: "power3.out" }),
    };
    return () => gsap.killTweensOf([el, sil]);
  }, []);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    fx.current.ry?.(nx * 6);
    fx.current.rx?.(-ny * 6);
    fx.current.sx?.(nx * -12);
    fx.current.sy?.(ny * -9);
  };
  const onLeave = () => {
    fx.current.rx?.(0);
    fx.current.ry?.(0);
    fx.current.sx?.(0);
    fx.current.sy?.(0);
  };

  return (
    <article
      data-reveal
      data-reveal-delay={v.featured ? 0 : 0.15}
      className={`relative ${v.span} ${v.featured ? "h-140 lg:h-full" : "h-105"} perspective-[900px]`}
    >
      <div
        ref={tiltRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group relative h-full overflow-hidden border border-kinari/12 bg-linear-to-b from-[#191713] to-sumi transition-[border-color] duration-500 will-change-transform hover:border-shu/50"
      >
        <span
          aria-hidden
          className="kanji-outline pointer-events-none absolute -right-6 -top-10 select-none"
        >
          {v.kanji}
        </span>

        <div className="pointer-events-none absolute right-[7%] top-1/2 hidden -translate-y-1/2 sm:block">
          <div ref={silRef}>
            <SwordSilhouette
              type={v.sil}
              className={`w-auto opacity-90 drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-[filter] duration-500 group-hover:drop-shadow-[0_24px_44px_rgba(195,39,43,0.28)] ${
                v.featured ? "h-[74%]" : "h-[85%]"
              }`}
            />
          </div>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-shu">
                {v.no}
              </span>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-kinari/50">
                {v.type}
              </p>
            </div>

            <span className="grid h-10 w-10 -rotate-2 scale-[1.7] place-items-center rounded-xs bg-shu font-mincho text-lg text-kinari opacity-0 transition-all duration-500 ease-out group-hover:rotate-[-8deg] group-hover:scale-100 group-hover:opacity-100">
              {v.stamp}
            </span>
          </div>

          <div className="max-w-sm">
            <h3 className="font-mincho text-3xl md:text-4xl">
              {v.name}{" "}
              <span className="ml-1.5 text-lg text-shu">{v.kanji}</span>
            </h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-kinari/45">
              {v.tag}
            </p>
            {v.featured && (
              <p className="mt-4 text-sm leading-relaxed text-kinari/65">
                {v.desc}
              </p>
            )}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <span className="border border-kinari/20 px-3 py-1.5 text-[10px] tracking-[0.2em] text-kinari/60">
                {v.length}
              </span>
              <span className="border border-kinari/20 px-3 py-1.5 text-[10px] tracking-[0.2em] text-kinari/60">
                {v.weight}
              </span>
              <a
                href="#cta"
                className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-shu opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                Enquire{" "}
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Variants() {
  const rootRef = useReveal();

  return (
    <section id="variants" ref={rootRef} className="relative bg-sumi">
      <div className="mx-auto max-w-350 px-5 py-28 md:px-10 md:py-36">
        <SectionHeading no="05" kanji="種類" title="Variants" tone="onDark" />

        <h2
          data-reveal
          className="mt-8 font-mincho text-4xl leading-tight md:text-6xl"
        >
          One soul.
          <br />
          <span className="text-kinari/50">Three forms.</span>
        </h2>

        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {VARIANTS.map((v) => (
            <VariantTile key={v.id} v={v} />
          ))}
        </div>

        <div
          data-reveal
          className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-kinari/12 pt-8 md:flex-row md:items-center"
        >
          <p className="max-w-md text-sm leading-relaxed text-kinari/60">
            <span className="font-mincho text-shu">大小 Daishō</span> —
            commission the long and short as a pair, forged from a single
            tamahagane bloom. One steel, two souls.
          </p>
          <a
            href="#cta"
            className="border border-shu/70 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-shu transition-colors hover:bg-shu hover:text-kinari"
          >
            Commission the pair
          </a>
        </div>
      </div>
    </section>
  );
}
