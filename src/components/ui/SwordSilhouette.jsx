const CFG = {
  katana: { top: 10, tsukaH: 56 },
  wakizashi: { top: 64, tsukaH: 50 },
  tanto: { top: 112, tsukaH: 38 },
};

export default function SwordSilhouette({ type = "katana", className = "" }) {
  const { top, tsukaH } = CFG[type] ?? CFG.katana;
  const base = 150;
  const k = base - top;
  const c1 = top + k * 0.32;
  const c2 = top + k * 0.74;
  const n = Math.max(3, Math.floor((tsukaH - 10) / 9));
  const ito = Array.from({ length: n }, (_, i) => {
    const y = base + 22 + i * ((tsukaH - 16) / Math.max(n - 1, 1));
    return (
      <path
        key={i}
        d={`M25 ${y + 5} L39 ${y - 3}`}
        stroke="rgba(244,239,230,0.28)"
        strokeWidth="2.4"
      />
    );
  });

  return (
    <svg viewBox="0 0 64 264" className={className} aria-hidden fill="none">
      <path
        d={`M31.5 ${top} C 26.5 ${c1}, 25 ${c2}, 24.5 ${base} L 38.5 ${base} C 36.5 ${c2}, 35 ${c1}, 31.5 ${top} Z`}
        fill="#b8bcc0"
      />

      <path
        d={`M35.8 ${top + 6} C 33.8 ${c1}, 33 ${c2}, 32.8 ${base - 2}`}
        stroke="#C3272B"
        strokeWidth="1"
        opacity="0.35"
      />
      <rect x="24" y={base} width="15.5" height="10" fill="#b5793a" />
      <ellipse cx="31.75" cy={base + 15.5} rx="13" ry="4.6" fill="#26262b" />
      <rect
        x="25"
        y={base + 21}
        width="13.5"
        height={tsukaH}
        rx="3"
        fill="#17151a"
      />
      {ito}
      <rect
        x="24.5"
        y={base + 21 + tsukaH}
        width="14.5"
        height="8"
        rx="3"
        fill="#332e28"
      />
    </svg>
  );
}
