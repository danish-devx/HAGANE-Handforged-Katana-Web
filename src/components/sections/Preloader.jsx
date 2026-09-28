import { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapSetup";
import { REDUCED } from "../../utils/gsapSetup";

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    if (REDUCED) {
      if (numRef.current) numRef.current.textContent = "100";
      const t = gsap
        .timeline()
        .to(rootRef.current, { autoAlpha: 0, duration: 0.35, delay: 0.5 })
        .call(() => onDone?.())
        .set(rootRef.current, { display: "none" });
      return () => t.kill();
    }
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline();

      tl.from(
        "[data-kanji]",
        {
          scale: 1.5,
          opacity: 0,
          filter: "blur(14px)",
          duration: 1.1,
          ease: "power2.out",
        },
        0.15,
      )
        .to(
          counter,
          {
            v: 100,
            duration: 1.7,
            ease: "power2.inOut",
            onUpdate: () => {
              if (numRef.current)
                numRef.current.textContent = String(
                  Math.round(counter.v),
                ).padStart(3, "0");
            },
          },
          0.35,
        )
        .to(
          "[data-line]",
          { scaleX: 1, duration: 1.7, ease: "power2.inOut" },
          0.35,
        )
        .to("[data-meta]", { opacity: 1, duration: 0.6 }, 0.9)
        .to(
          rootRef.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "+=0.3",
        )
        .call(() => onDone?.(), [], "-=0.55")
        .set(rootRef.current, { display: "none" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-60 flex flex-col bg-sumi">
      <div data-line className="h-px w-full origin-left scale-x-0 bg-shu" />

      <div className="grid flex-1 place-items-center">
        <span
          data-kanji
          className="font-mincho text-8xl text-kinari md:text-9xl"
        >
          鋼
        </span>
      </div>

      <div className="flex items-end justify-between p-6 md:p-10">
        <p
          data-meta
          className="text-[10px] uppercase tracking-[0.4em] text-kinari/40 opacity-0"
        >
          HAGANE — 手打ち刀 · Forging Scene
        </p>
        <span
          ref={numRef}
          className="font-mincho text-6xl text-kinari/90 md:text-7xl"
        >
          000
        </span>
      </div>
    </div>
  );
}
