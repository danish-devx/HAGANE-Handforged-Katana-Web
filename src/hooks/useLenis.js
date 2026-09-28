import { useEffect } from "react";
import Lenis from "lenis";
import { REDUCED } from "../utils/gsapSetup";
import { gsap, ScrollTrigger } from "../utils/gsapSetup";
import { katanaState } from "../three/katanaState";

export const lenisRef = { current: null };

export function useLenis() {
  useEffect(() => {
    if (REDUCED) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      katanaState.windImpulse = Math.min(Math.abs(e?.velocity ?? 0) / 80, 1.5);
    });

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
}
