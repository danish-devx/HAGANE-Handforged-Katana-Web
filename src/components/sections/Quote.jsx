import { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapSetup";
import { useReveal } from "../../hooks/useReveal";

export default function Quote() {
  const rootRef = useReveal();
  const wmRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wmRef.current,
        { yPercent: -14 },
        {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
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
      className="noise relative overflow-hidden bg-kinari text-sumi"
    >
      <div
        ref={wmRef}
        aria-hidden
        className="v-text absolute right-[4%] top-1/2 -translate-y-1/2 select-none font-mincho text-[8rem] leading-none text-sumi/5.5 md:text-[12rem]"
      >
        五輪書
      </div>

      <div className="mx-auto max-w-350 px-5 py-32 md:px-10 md:py-44">
        <div data-reveal className="flex items-center gap-4">
          <span className="h-px w-12 bg-shu" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-sumi/50">
            五輪書 — The Book of Five Rings
          </p>
        </div>

        <blockquote className="mt-14 max-w-4xl">
          <p
            data-reveal
            data-reveal-delay="0.1"
            className="font-mincho text-[clamp(2.1rem,5vw,4.2rem)] leading-[1.22] tracking-tight"
          >
            "Everything is <span className="text-shu">within</span>.
            <br />
            Seek nothing outside of yourself."
          </p>

          <footer
            data-reveal
            data-reveal-delay="0.25"
            className="mt-12 flex items-center gap-4"
          >
            <span className="grid h-11 w-11 -rotate-2 place-items-center rounded-xs bg-shu font-mincho text-lg text-kinari">
              武
            </span>
            <div>
              <p className="font-mincho text-sm tracking-wide">
                Miyamoto Musashi{" "}
                <span className="ml-1 text-sumi/50">宮本武蔵</span>
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-sumi/45">
                Sword saint, 1645
              </p>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
