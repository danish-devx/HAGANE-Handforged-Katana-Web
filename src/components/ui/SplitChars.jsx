export default function SplitChars({ text, className = "" }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <span data-char className="inline-block will-change-transform">
            {c}
          </span>
        </span>
      ))}
    </span>
  );
}
