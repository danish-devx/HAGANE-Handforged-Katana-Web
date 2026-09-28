import { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapSetup";
import { useReveal } from "../../hooks/useReveal";
import SectionHeading from "../ui/SectionHeading";
import InkDivider from "../ui/InkDivider";

const STATEMENT =
  "A katana is not manufactured. It is revealed — folded ten thousand times, quenched in sacred water, polished until only truth remains in the steel.";

const STATS = [
  { v: "700+", k: "層", l: "Folded layers of tamahagane" },
  { v: "1,000°", k: "火", l: "Quench temperature — yaki-ire" },
  { v: "70cm", k: "長", l: "Nagasa — cutting edge length" },
];

export default function Philosophy() {
  const rootRef = useReveal();
  const statementRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.09,
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 78%",
            end: "top 22%",
            scrub: 0.35,
          },
        },
      );

      gsap.fromTo(
        "[data-underline]",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 60%",
            end: "top 30%",
            scrub: 0.5,
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={rootRef}
      className="relative bg-kinari text-sumi"
    >
      <div className="v-text absolute right-6 top-28 hidden select-none font-mincho text-2xl tracking-[0.5em] text-sumi/20 md:block lg:right-12">
        一撃入魂
      </div>

      <div className="mx-auto max-w-350 px-5 pb-36 pt-32 md:px-10 md:pt-40">
        <SectionHeading
          no="01"
          kanji="哲学"
          title="Philosophy"
          tone="onLight"
        />

        <p
          ref={statementRef}
          className="mt-16 max-w-5xl font-mincho text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.25] tracking-tight md:mt-20"
        >
          {STATEMENT.split(" ").map((w, i) => {
            const key = `${w}-${i}`;
            if (w === "revealed") {
              return (
                <span key={key} className="relative mr-[0.26em] inline-block">
                  <span data-word className="inline-block">
                    {w}
                  </span>
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full"
                    viewBox="0 0 200 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      data-underline
                      d="M2 7 C 50 3 120 2 198 5"
                      fill="none"
                      stroke="#C3272B"
                      strokeWidth="5"
                      strokeLinecap="round"
                      pathLength="1"
                      strokeDasharray="1"
                    />
                  </svg>
                </span>
              );
            }
            if (w === "truth") {
              return (
                <span
                  key={key}
                  data-word
                  className="mr-[0.26em] inline-block text-shu"
                >
                  {w}
                </span>
              );
            }
            return (
              <span key={key} data-word className="mr-[0.26em] inline-block">
                {w}
              </span>
            );
          })}
        </p>

        <div className="mt-20 grid gap-10 border-t border-sumi/15 pt-10 md:grid-cols-3 md:gap-6 md:pt-12">
          {STATS.map((s, i) => (
            <div key={s.l} data-reveal data-reveal-delay={i * 0.12}>
              <div className="flex items-baseline gap-3">
                <span className="font-mincho text-5xl md:text-6xl">{s.v}</span>
                <span className="font-mincho text-lg text-shu">{s.k}</span>
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-sumi/55">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        <InkDivider className="mx-auto mt-28 opacity-80" width="72%" />
      </div>
    </section>
  );
}
