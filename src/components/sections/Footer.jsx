import { useEffect, useState } from "react";
import { lenisRef } from "../../hooks/useLenis";
import SealStamp from "../ui/SealStamp";

const COLS = [
  {
    title: "Studio",
    links: [
      { l: "Philosophy", h: "#philosophy" },
      { l: "Anatomy", h: "#anatomy" },
      { l: "The Forge", h: "#forge" },
      { l: "Specifications", h: "#specs" },
    ],
  },
  {
    title: "Collection",
    links: [
      { l: "Katana — 月影", h: "#variants" },
      { l: "Wakizashi — 山陰", h: "#variants" },
      { l: "Tantō — 飛燕", h: "#variants" },
      { l: "Daishō pairs", h: "#variants" },
    ],
  },
  {
    title: "Connect",
    links: [
      { l: "Instagram", h: "#" },
      { l: "X / Twitter", h: "#" },
      { l: "atelier@hagane.works", h: "mailto:atelier@hagane.works" },
    ],
  },
];

export default function Footer() {
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

  const go = (e, h) => {
    e.preventDefault();
    const el = document.querySelector(h);
    if (el) lenisRef.current?.scrollTo(el, { duration: 1.5 });
    else lenisRef.current?.scrollTo(0, { duration: 1.5 });
  };

  return (
    <footer className="relative overflow-hidden border-t border-kinari/10 bg-sumi text-kinari">
      <div className="mx-auto max-w-350 px-5 pt-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <SealStamp size="sm" />
              <span className="font-mincho text-xl tracking-[0.3em]">
                HAGANE
              </span>
            </div>
            <p className="mt-5 max-w-xs font-mincho text-lg leading-relaxed text-kinari/60">
              The steel remembers<span className="text-shu">.</span>
            </p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-kinari/35">
              Seki, Gifu — Japan · 関市 · since 2025
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                lenisRef.current?.scrollTo(0, { duration: 1.8 });
              }}
              className="group mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-kinari/55 transition-colors hover:text-shu"
            >
              Back to top
              <span className="transition-transform duration-500 group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-7">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-shu">
                  {c.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {c.links.map((link) => (
                    <li key={link.l}>
                      <a
                        href={link.h}
                        onClick={(e) => go(e, link.h)}
                        className="text-sm text-kinari/60 transition-colors hover:text-kinari"
                      >
                        {link.l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-kinari/10 py-7 text-[10px] uppercase tracking-[0.25em] text-kinari/35 md:flex-row md:items-center md:justify-between">
          <p>
            © 2025 HAGANE — a fictional atelier, a WebGL tribute to the
            swordsmith's craft
          </p>
          <div className="flex items-center gap-6">
            <span>Seki 関 — {jst} JST</span>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="transition-colors hover:text-kinari"
            >
              Privacy
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="transition-colors hover:text-kinari"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden"
      >
        <p className="mb-[-3.5vw] text-center font-mincho text-[17vw] leading-[0.82] text-kinari/5">
          HAGANE<span className="text-shu/12">鋼</span>
        </p>
      </div>
    </footer>
  );
}
