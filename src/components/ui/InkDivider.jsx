import { useEffect, useId, useRef } from "react";
import { gsap } from "../../utils/gsapSetup";
export default function InkDivider({
  className = "",
  color = "#141210",
  flip = false,
  width = "100%",
}) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scaleX: 0,
        transformOrigin: flip ? "right center" : "left center",
        duration: 1.3,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [flip]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none ${className}`}
      style={{ width }}
    >
      <svg
        viewBox="0 0 1200 70"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        aria-hidden
      >
        <defs>
          <filter id={`ink-${uid}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.011 0.06"
              numOctaves="2"
              seed="8"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="12" />
          </filter>
        </defs>
        <g filter={`url(#ink-${uid})`} fill={color}>
          <path
            d="M4 34 C150 22 320 24 520 30 C760 37 980 32 1120 27 C1160 26 1184 29 1198 33 C1182 38 1156 40 1120 41 C980 46 760 52 520 46 C320 41 150 46 4 34 Z"
            opacity="0.92"
          />

          <path
            d="M60 52 C240 58 420 58 600 55 C780 52 940 56 1080 53 L1080 55 C940 59 780 60 600 58 C420 56 240 58 60 54 Z"
            opacity="0.35"
          />
          <path
            d="M140 18 C320 12 540 10 760 14 C880 16 980 14 1060 12 L1060 14 C980 18 880 19 760 17 C540 13 320 16 140 21 Z"
            opacity="0.3"
          />
        </g>
      </svg>
    </div>
  );
}
