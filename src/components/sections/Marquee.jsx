const ITEMS = [
  "玉鋼 — TAMAHAGANE",
  "七百層 — 700 LAYERS",
  "折り返し — FOLDED STEEL",
  "刃文 — TEMPER LINE",
  "手打ち — HANDFORGED",
  "反り — SIGNATURE CURVE",
];

function Row({ hidden }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {ITEMS.map((it, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-mincho text-sm tracking-[0.25em] md:px-10 md:text-base">
            {it}
          </span>
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-kinari/70" />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section className="relative z-20 -my-4 w-full overflow-hidden select-none py-6">
      <div className="-rotate-[1.1deg] scale-x-105 overflow-hidden border-y border-kinari/20 bg-shu py-3.5 text-kinari shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="animate-marquee flex w-max">
          <Row hidden={false} />
          <Row hidden={true} />
        </div>
      </div>
    </section>
  );
}
