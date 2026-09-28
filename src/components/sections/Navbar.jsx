import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../utils/gsapSetup";
import { lenisRef } from "../../hooks/useLenis";
import SealStamp from "../ui/SealStamp";
import { REDUCED } from "../../utils/gsapSetup";

const LINKS = [
  { n: "01", kanji: "哲学", label: "Philosophy", href: "#philosophy" },
  { n: "02", kanji: "解剖", label: "Anatomy", href: "#anatomy" },
  { n: "03", kanji: "鍛冶", label: "Forge", href: "#forge" },
  { n: "04", kanji: "仕様", label: "Specs", href: "#specs" },
  { n: "05", kanji: "種類", label: "Variants", href: "#variants" },
];

const EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]";

export default function Navbar({ loaded }) {
  const rootRef = useRef(null);
  const menuRef = useRef(null);
  const menuTl = useRef(null);
  const progressRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [jst, setJst] = useState("");

  useEffect(() => {
    const tick = () =>
      setJst(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Tokyo",
          hour12: false,
        }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const st1 = ScrollTrigger.create({
      start: 60,
      end: "max",
      onToggle: (s) => setScrolled(s.isActive),
    });
    const st2 = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (s) => {
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${s.progress})`;
      },
    });
    return () => {
      st1.kill();
      st2.kill();
    };
  }, []);

  useEffect(() => {
    const triggers = LINKS.map((l) =>
      ScrollTrigger.create({
        trigger: l.href,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (s) => {
          if (s.isActive) setActive(l.href);
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    if (!loaded || !rootRef.current) return;
    if (REDUCED) {
      gsap.set(rootRef.current, { opacity: 1 });
      return;
    }
    gsap.fromTo(
      rootRef.current,
      { y: -90, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.25 },
    );
  }, [loaded]);

  useEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      menuTl.current = gsap
        .timeline({
          paused: true,
          onReverseComplete: () =>
            gsap.set(menuRef.current, { visibility: "hidden" }),
        })
        .set(menuRef.current, { visibility: "visible" })
        .fromTo(
          menuRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" },
        )
        .fromTo(
          "[data-m-link]",
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.15",
        )
        .fromTo(
          "[data-m-foot]",
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
          "-=0.35",
        );
    }, menuRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (REDUCED) {
      gsap.set(menuRef.current, {
        visibility: menuOpen ? "visible" : "hidden",
      });
      if (menuOpen) lenisRef.current?.stop();
      else lenisRef.current?.start();
      return;
    }
    if (!menuTl.current) return;
    if (menuOpen) {
      menuTl.current.timeScale(1).play();
      lenisRef.current?.stop();
    } else {
      menuTl.current.timeScale(1.5).reverse();
      lenisRef.current?.start();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const go = (e, href) => {
    e.preventDefault();
    const wasOpen = menuOpen;
    if (wasOpen) setMenuOpen(false);
    const target = href ? document.querySelector(href) : null;
    setTimeout(
      () => {
        if (target) lenisRef.current?.scrollTo(target, { duration: 1.5 });
        else lenisRef.current?.scrollTo(0, { duration: 1.5 });
      },
      wasOpen ? 400 : 0,
    );
  };

  return (
    <>
      <header ref={rootRef} className="fixed inset-x-0 top-0 z-40 opacity-0">
        <div
          className={`pointer-events-none absolute inset-0 bg-linear-to-b from-sumi/75 via-sumi/35 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-0 border-b border-kinari/10 bg-sumi/80 backdrop-blur-xl transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <nav
          className={`relative flex items-center justify-between px-5 transition-[height] duration-500 md:px-10 ${
            scrolled ? "h-16 md:h-18" : "h-20 md:h-24"
          }`}
        >
          <a
            href="#"
            onClick={(e) => go(e, null)}
            className="group flex shrink-0 items-center gap-3.5"
          >
            <SealStamp size="sm" />
            <span className="font-mincho text-xl tracking-[0.35em]">
              HAGANE
            </span>
            <span className="hidden h-4 w-px bg-kinari/20 lg:block" />
            <span className="hidden font-mincho text-[11px] tracking-[0.2em] text-kin/90 transition-colors duration-300 group-hover:text-kin lg:block">
              鋼 — Handforged
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex lg:gap-10">
            {LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.n}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    aria-current={isActive || undefined}
                    className="group relative flex items-center py-3"
                  >
                    <span className="relative mr-2 block h-4 w-6 overflow-hidden">
                      <span
                        className={`flex h-4 items-center transition-transform duration-500 ${EASE} ${
                          isActive
                            ? "-translate-y-full"
                            : "group-hover:-translate-y-full"
                        }`}
                      >
                        <span
                          className={`text-[8px] leading-none transition-colors ${isActive ? "text-shu" : "text-kinari/30"}`}
                        >
                          {l.n}
                        </span>
                      </span>
                      <span
                        className={`absolute inset-0 flex h-4 translate-y-full items-center transition-transform duration-500 ${EASE} ${
                          isActive
                            ? "translate-y-0"
                            : "group-hover:translate-y-0"
                        }`}
                      >
                        <span className="whitespace-nowrap font-mincho text-[11px] leading-none text-shu">
                          {l.kanji}
                        </span>
                      </span>
                    </span>

                    <span
                      className={`text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                        isActive
                          ? "text-kinari"
                          : "text-kinari/70 group-hover:text-kinari"
                      }`}
                    >
                      {l.label}
                    </span>

                    <span
                      className={`absolute inset-x-0 -bottom-px h-px origin-left bg-shu transition-transform duration-500 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />

                    <span
                      className={`absolute bottom-[-3.5px] -left-1 h-1.5 w-1.5 rotate-45 bg-shu transition-all duration-500 ${
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
            <span className="hidden items-center gap-2.5 text-[10px] tracking-[0.18em] text-kinari/40 tabular-nums 2xl:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-shu opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-shu" />
              </span>
              Seki 関 <span className="text-kin/90">{jst}</span> JST
            </span>

            <a
              href="#cta"
              onClick={(e) => go(e, "#cta")}
              className="group relative hidden items-center gap-3 overflow-hidden bg-shu px-5 py-2.5 text-kinari transition-colors duration-300 hover:bg-[#a51f23] md:inline-flex"
            >
              <span className="relative block h-3.5 overflow-hidden">
                <span
                  className={`block text-[10px] uppercase leading-3.5 tracking-[0.28em] transition-transform duration-500 ${EASE} group-hover:-translate-y-full`}
                >
                  Reserve
                </span>
                <span
                  className={`absolute inset-0 translate-y-full font-mincho text-[11px] leading-3.5 tracking-[0.25em] transition-transform duration-500 ${EASE} group-hover:translate-y-0`}
                >
                  予約する
                </span>
              </span>
              <span className="text-[11px] transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative z-40 -mr-1.5 flex h-12 w-12 flex-col items-center justify-center gap-1.75 md:hidden"
            >
              <span
                className={`h-px w-6 bg-kinari transition-transform duration-300 ${menuOpen ? "translate-y-1 rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 bg-kinari transition-transform duration-300 ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>

        <span
          ref={progressRef}
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-shu"
        />
      </header>

      <div
        ref={menuRef}
        className="fixed inset-0 z-30 overflow-hidden bg-sumi md:hidden"
        style={{ visibility: "hidden", clipPath: "inset(0 0 100% 0)" }}
      >
        <span
          aria-hidden
          className="kanji-outline pointer-events-none absolute -right-4 bottom-6 select-none"
        >
          鋼
        </span>
        <span
          aria-hidden
          className="v-text absolute left-5 top-24 select-none font-mincho text-xs tracking-[0.5em] text-kinari/25"
        >
          目次 — MENU
        </span>

        <nav className="relative flex h-full flex-col justify-center px-8 pb-14 pt-24">
          <p className="text-[10px] uppercase tracking-[0.4em] text-shu">
            HAGANE — Index
          </p>

          <ul className="mt-4">
            {LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.n}>
                  <a
                    data-m-link
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className={`group flex items-baseline gap-5 border-b border-kinari/10 py-4.5 transition-colors ${
                      isActive ? "text-shu" : ""
                    }`}
                  >
                    <span className="text-[10px] tracking-[0.3em] text-shu">
                      {l.n}
                    </span>
                    <span className="font-mincho text-[2rem] leading-none transition-transform duration-500 group-hover:translate-x-2">
                      {l.label}
                    </span>
                    <span
                      className={`ml-auto font-mincho text-base transition-colors ${isActive ? "text-shu" : "text-kinari/35"}`}
                    >
                      {l.kanji}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div data-m-foot className="mt-8 space-y-5">
            <a
              href="#cta"
              onClick={(e) => go(e, "#cta")}
              className="flex items-center justify-between bg-shu px-6 py-4 text-[11px] uppercase tracking-[0.3em] text-kinari"
            >
              Reserve your blade <span>→</span>
            </a>
            <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-kinari/40">
              <span className="tabular-nums">Seki 関 — {jst} JST</span>
              <span className="font-mincho text-[11px] normal-case tracking-[0.15em] text-kinari/55">
                鋼 — The steel remembers
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
