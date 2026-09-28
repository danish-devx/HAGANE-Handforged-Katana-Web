export default function ForgeIcon({ variant, className = "" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      {variant === "ore" && (
        <>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M60 16 L94 40 L88 84 L60 104 L30 82 L26 38 Z" />
            <path d="M26 38 L60 54 L94 40" />
            <path d="M60 54 V104" />
            <path d="M30 82 L60 54" />
          </g>
          <g fill="#C3272B">
            <circle cx="98" cy="20" r="2.5" />
            <circle cx="16" cy="92" r="2" />
          </g>
        </>
      )}

      {variant === "fold" && (
        <>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(-8 60 60)"
          >
            <path d="M22 34 C 45 30 75 38 98 32" />
            <path d="M22 46 C 45 42 75 50 98 44" />
            <path d="M22 58 C 45 54 75 62 98 56" />
            <path d="M22 70 C 45 66 75 74 98 68" />
            <path d="M22 82 C 45 78 75 86 98 80" />
            <path d="M22 94 C 45 90 75 98 98 92" />
          </g>
          <circle cx="100" cy="22" r="2.5" fill="#C3272B" />
        </>
      )}

      {variant === "quench" && (
        <>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M52 10 L64 10 L68 58 L56 58 Z" />
            <path d="M14 64 C 26 58 36 70 48 64 C 60 58 70 70 82 64 C 90 60 98 66 106 63" />
            <path d="M36 48 C 33 40 39 36 36 28" />
            <path d="M80 46 C 83 38 77 34 80 26" />
            <path d="M58 40 C 55 34 61 30 58 22" />
          </g>
          <circle cx="60" cy="84" r="14" fill="#C3272B" opacity="0.22" />
          <circle cx="60" cy="84" r="6" fill="#C3272B" opacity="0.45" />
        </>
      )}

      {variant === "polish" && (
        <>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="20" y="76" width="80" height="20" rx="2" />
            <path d="M14 62 L92 44 L96 50 L22 70 Z" />
          </g>
          <g stroke="#C3272B" strokeWidth="2" strokeLinecap="round">
            <path d="M8 50 l9 -3" />
            <path d="M6 58 l10 -1" />
          </g>
        </>
      )}

      {variant === "mount" && (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 52 L48 48 L52 72 L14 76 Z" />
          <path d="M14 52 L14 76" />
          <circle cx="74" cy="61" r="21" />
          <ellipse cx="74" cy="61" rx="3.5" ry="9" />
          <path d="M95 59 L112 58" />
        </g>
      )}
    </svg>
  );
}
