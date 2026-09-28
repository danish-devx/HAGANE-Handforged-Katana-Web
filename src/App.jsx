import { useEffect, useState } from "react";
import { ScrollTrigger } from "./utils/gsapSetup";
import { useLenis, lenisRef } from "./hooks/useLenis";
import { katanaState } from "./three/katanaState";
import KatanaScene from "./three/KatanaScene";
import Preloader from "./components/sections/Preloader";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Philosophy from "./components/sections/Philosophy";
import Anatomy from "./components/sections/Anatomy";
import Forge from "./components/sections/Forge";
import Specs from "./components/sections/Specs";
import Variants from "./components/sections/Variants";
import Quote from "./components/sections/Quote";
import CTA from "./components/sections/CTA";
import Footer from "./components/sections/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [sceneActive, setSceneActive] = useState(true);

  useLenis();

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";

    const lenis = lenisRef.current;
    if (!loaded) {
      lenis?.stop();
      window.scrollTo(0, 0);
    } else {
      lenis?.start();
      ScrollTrigger.refresh();
    }
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    const update = (scroll) =>
      setSceneActive(
        scroll < window.innerHeight * 1.35 || katanaState.anatomyActive,
      );
    if (lenisRef.current) {
      const onScroll = (e) => update(e.scroll);
      lenisRef.current.on("scroll", onScroll);
      return () => lenisRef.current?.off("scroll", onScroll);
    }
    const onNative = () => update(window.scrollY);
    window.addEventListener("scroll", onNative, { passive: true });
    return () => window.removeEventListener("scroll", onNative);
  }, [loaded]);

  return (
    <>
      <KatanaScene active={sceneActive} />

      <main className="relative z-10">
        <Hero loaded={loaded} />
        <Marquee />
        <Philosophy />
        <Anatomy />
        <Forge />
        <Specs />
        <Variants />
        <Quote />
        <CTA />
      </main>

      <Footer />

      <Navbar loaded={loaded} />
      <Preloader onDone={() => setLoaded(true)} />
    </>
  );
}
