export default function SealStamp({ char = "鋼", size = "md" }) {
  const s = size === "sm" ? "h-8 w-8 text-sm" : "h-10 w-10 text-lg";
  return (
    <span
      className={`inline-grid -rotate-2 place-items-center rounded-xs bg-shu font-mincho text-kinari ${s}`}
    >
      {char}
    </span>
  );
}
