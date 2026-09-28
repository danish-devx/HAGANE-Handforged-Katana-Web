import { useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import SectionHeading from "../ui/SectionHeading";

const INCLUDES = [
  "Handforged shinsakutō — named smith, ubu nakago",
  "Full koshirae — silk ito, urushi saya, iron mokko tsuba",
  "Certificate of authenticity & katanakake stand",
  "White-glove insured delivery, worldwide",
];

const ENGRAVE_MAX = 14;

function Field({ label, hint, children }) {
  return (
    <label className="group block">
      <span className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.3em] text-kinari/55">
          {label}
        </span>
        {hint && (
          <span className="text-[9px] tracking-[0.2em] text-kinari/35">
            {hint}
          </span>
        )}
      </span>
      {children}

      <span className="mt-1 block h-px w-full overflow-hidden bg-kinari/15">
        <span className="block h-full w-full origin-left scale-x-0 bg-shu transition-transform duration-500 group-focus-within:scale-x-100" />
      </span>
    </label>
  );
}

export default function CTA() {
  const rootRef = useReveal();
  const [phase, setPhase] = useState("idle");
  const [engraving, setEngraving] = useState("");
  const [refNo, setRefNo] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (phase !== "idle") return;
    setPhase("sending");
    setTimeout(() => {
      setRefNo(
        `HGN-${new Date().getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`,
      );
      setPhase("sealed");
    }, 1400);
  };

  return (
    <section
      id="cta"
      ref={rootRef}
      className="relative overflow-hidden bg-sumi text-kinari"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-0 select-none font-mincho text-[24rem] leading-none text-kinari/4"
      >
        刀
      </span>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 110%, rgba(195,39,43,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-350 gap-16 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading no="06" kanji="予約" title="Reserve" tone="onDark" />
          <h2
            data-reveal
            className="mt-8 font-mincho text-4xl leading-tight md:text-6xl"
          >
            The forge accepts
            <br />
            <span className="text-kinari/50">twelve souls a year.</span>
          </h2>

          <div
            data-reveal
            data-reveal-delay="0.1"
            className="mt-10 flex items-baseline gap-4"
          >
            <span className="font-mincho text-5xl md:text-6xl">¥2,400,000</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-kinari/45">
              ≈ $16,400 · ex. tax
            </span>
          </div>

          <div data-reveal data-reveal-delay="0.15" className="mt-8">
            <div className="flex gap-1.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-3 w-1.5 ${i < 10 ? "bg-shu" : "border border-kinari/40"}`}
                />
              ))}
            </div>
            <p className="mt-2.5 text-[10px] uppercase tracking-[0.3em] text-kinari/50">
              Edition of 12 —{" "}
              <span className="text-shu">two commissions remain</span>
            </p>
          </div>

          <ul className="mt-10 space-y-3.5">
            {INCLUDES.map((it, i) => (
              <li
                key={it}
                data-reveal
                data-reveal-delay={0.2 + i * 0.07}
                className="flex items-start gap-3 text-sm text-kinari/70"
              >
                <span className="mt-1.75 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-shu" />
                {it}
              </li>
            ))}
          </ul>

          <p
            data-reveal
            data-reveal-delay="0.4"
            className="mt-10 max-w-sm text-xs leading-relaxed text-kinari/40"
          >
            A deposit reserves your position in the forge queue. Lead time — six
            months, for the steel cannot be hurried. 全ては鋼の記憶のままに。
          </p>
        </div>

        <div data-reveal data-reveal-delay="0.2" className="relative">
          <div className="border border-kinari/12 bg-[#191713]/60 p-7 backdrop-blur-sm md:p-10">
            {phase !== "sealed" ? (
              <form onSubmit={submit} className="space-y-7">
                <p className="text-[10px] uppercase tracking-[0.4em] text-shu">
                  Request — 予約申請
                </p>

                <Field label="Full name">
                  <input
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-kinari/25"
                  />
                </Field>

                <Field label="Email">
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@dojo.jp"
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-kinari/25"
                  />
                </Field>

                <Field
                  label="Engraving — 銘"
                  hint={`${engraving.length} / ${ENGRAVE_MAX} · optional`}
                >
                  <input
                    type="text"
                    name="engraving"
                    maxLength={ENGRAVE_MAX}
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    placeholder="A name, a kanji, a promise"
                    className="w-full bg-transparent py-3 font-mincho tracking-[0.15em] outline-none placeholder:font-gothic placeholder:text-[13px] placeholder:tracking-normal placeholder:text-kinari/25"
                  />
                </Field>

                <div>
                  <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-kinari/35">
                    Preview — nakago, right side
                  </p>
                  <div className="flex items-center gap-3 border border-kinari/10 bg-sumi/70 px-4 py-3.5">
                    <span className="h-px w-6 bg-shu/60" />
                    <span className="truncate font-mincho text-base tracking-[0.35em] text-kinari/90">
                      {engraving || "—"}
                    </span>
                    <span className="ml-auto h-4 w-px bg-kinari/20" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={phase === "sending"}
                  className="group flex w-full items-center justify-between bg-shu px-6 py-4 text-[11px] uppercase tracking-[0.3em] text-kinari transition-colors hover:bg-[#a51f23] disabled:cursor-wait disabled:opacity-80"
                >
                  <span>
                    {phase === "sending"
                      ? "Sealing your request…"
                      : "Request Reservation"}
                  </span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                    →
                  </span>
                </button>

                <p className="text-center text-[9px] uppercase tracking-[0.25em] text-kinari/30">
                  No payment now · deposit invoice follows by email
                </p>
              </form>
            ) : (
              <div className="flex min-h-107.5 flex-col items-center justify-center text-center">
                <span className="stamp-in grid h-20 w-20 place-items-center rounded-[3px] bg-shu font-mincho text-4xl text-kinari shadow-[0_18px_50px_rgba(195,39,43,0.35)]">
                  鋼
                </span>
                <h3 className="mt-8 font-mincho text-3xl">Request sealed.</h3>
                <p className="mt-3 font-mincho text-sm tracking-[0.3em] text-shu">
                  {refNo}
                </p>
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-kinari/60">
                  Your request is with the forge. Expect a reply within two
                  working days — and remember, the steel cannot be hurried.
                </p>
                <button
                  onClick={() => {
                    setPhase("idle");
                    setEngraving("");
                  }}
                  className="mt-9 border border-kinari/25 px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-kinari/70 transition-colors hover:border-shu hover:text-shu"
                >
                  Make another request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
