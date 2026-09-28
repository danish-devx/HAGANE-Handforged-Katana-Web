import { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapSetup";
import { REDUCED } from "../../utils/gsapSetup";

export default function Hero({ loaded }) {
  const rootRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.2 })
        .from(
          "[data-ghost]",
          { autoAlpha: 0, scale: 1.06, duration: 1.8, ease: "power2.out" },
          0,
        )
        .from("[data-eyebrow]", { y: 18, autoAlpha: 0, duration: 0.7 }, 0.1)
        .from(
          "[data-statement]",
          { yPercent: 115, duration: 1.1, ease: "power4.out" },
          0.25,
        )
        .from(
          "[data-seal]",
          {
            scale: 2.2,
            rotate: -16,
            autoAlpha: 0,
            duration: 0.55,
            ease: "power4.in",
          },
          0.95,
        )
        .from(
          "[data-rule]",
          { scaleX: 0, duration: 0.9, ease: "power3.inOut" },
          1.05,
        )
        .from("[data-sub]", { y: 16, autoAlpha: 0, duration: 0.7 }, 1.1)
        .from(
          "[data-cta]",
          { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.1 },
          1.2,
        )
        .from("[data-vert]", { autoAlpha: 0, x: 22, duration: 0.9 }, 1.25)
        .from("[data-cue]", { autoAlpha: 0, y: 12, duration: 0.7 }, 1.35);
    }, rootRef);
    return () => ctx.revert();
  }, [loaded]);

  useEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "85% top",
          scrub: true,
        },
      });
      gsap.fromTo(
        "[data-ghost]",
        { yPercent: -6 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex h-svh flex-col overflow-hidden"
    >
      <span
        data-ghost
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 select-none font-mincho text-[72vh] leading-none text-kinari/3.5 md:right-[8%]"
      >
        刀
      </span>

      <div className="relative z-10 flex items-center gap-4 px-6 pt-28 md:px-10 md:pt-32">
        <span className="h-px w-10 bg-shu" />
        <p
          data-eyebrow
          className="text-[10px] uppercase tracking-[0.4em] text-kinari/55 md:text-[11px]"
        >
          手打ち — Handforged in Seki, Japan
        </p>
      </div>

      <div className="flex-1" />

      <div
        ref={contentRef}
        className="relative z-10 px-6 pb-14 md:px-10 md:pb-16"
      >
        <div className="flex items-end gap-4 md:gap-5">
          <div className="block overflow-hidden pb-[0.08em]">
            <h1
              data-statement
              className="font-mincho text-[clamp(2.5rem,5.8vw,5rem)] leading-[1.02] tracking-[-0.01em]"
            >
              The <span className="text-outline">steel</span> remembers.
            </h1>
          </div>

          <span
            data-seal
            aria-hidden
            className="mb-2.5 grid h-9 w-9 shrink-0 -rotate-3 place-items-center rounded-xs bg-shu font-mincho text-base text-kinari shadow-[0_8px_28px_rgba(195,39,43,0.35)] md:h-11 md:w-11 md:text-lg"
          >
            鋼
          </span>
        </div>

        <span
          data-rule
          className="mt-7 block h-px w-24 origin-left bg-shu/80"
        />

        <p
          data-sub
          className="mt-5 max-w-sm text-[13px] leading-relaxed text-kinari/60"
        >
          Handforged tamahagane — seven hundred layers, folded by hand.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-7">
          <a
            data-cta
            href="#cta"
            className="group flex items-center gap-3 bg-shu px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] text-kinari transition-colors duration-300 hover:bg-[#a51f23]"
          >
            Reserve your blade
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </a>
          <a
            data-cta
            href="#forge"
            className="group relative pb-1 text-[11px] uppercase tracking-[0.25em] text-kinari/70 transition-colors hover:text-kinari"
          >
            Explore the forge
            <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-shu transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </a>
        </div>
      </div>

      <div
        data-vert
        className="v-text absolute right-5 top-1/2 hidden -translate-y-1/2 select-none items-center gap-4 md:flex lg:right-10"
      >
        <span className="h-24 w-px bg-linear-to-b from-transparent via-shu/70 to-transparent" />
        <span className="font-mincho text-xl tracking-[0.6em] text-kinari/45">
          日本刀 ・ 玉鋼
        </span>
      </div>

      <div
        data-cue
        className="absolute bottom-14 right-6 hidden flex-col items-center gap-3 md:right-10 md:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.45em] text-kinari/45">
          Scroll
        </span>
        <span className="scroll-line block h-12 w-px bg-linear-to-b from-shu to-transparent" />
      </div>
    </section>
  );
}
