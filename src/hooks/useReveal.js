import { useEffect, useRef } from "react";
import { gsap } from "../utils/gsapSetup";
import { REDUCED } from "../utils/gsapSetup";
export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: options.y ?? 40,
          autoAlpha: 0,
          duration: options.duration ?? 1,
          delay: parseFloat(el.dataset.revealDelay ?? 0),
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: el.dataset.revealStart ?? "top 86%",
            once: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}
