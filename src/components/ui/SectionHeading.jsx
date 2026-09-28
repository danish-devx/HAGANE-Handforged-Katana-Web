export default function SectionHeading({
  no = "01",
  kanji = "哲学",
  title = "Philosophy",
  tone = "onDark",
}) {
  const t =
    tone === "onLight"
      ? { base: "text-sumi", sub: "text-sumi/45" }
      : { base: "text-kinari", sub: "text-kinari/45" };

  return (
    <div data-reveal className="flex items-center gap-4">
      <span className="h-px w-12 bg-shu" />
      <span className="text-xs font-medium tracking-[0.35em] text-shu">
        {no}
      </span>
      <span className={`font-mincho text-lg ${t.sub}`}>{kanji}</span>
      <span className={`text-[11px] uppercase tracking-[0.35em] ${t.base}`}>
        {title}
      </span>
    </div>
  );
}
