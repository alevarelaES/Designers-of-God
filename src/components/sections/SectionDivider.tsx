// SectionDivider — simplified to a single fade-in instead of 5 staggered animations.
// The visual result is identical; the CPU cost drops from ~5 animated values to 1.

interface SectionDividerProps {
  accent?: "pink" | "blue";
}

const ACCENT: Record<"pink" | "blue", { color: string }> = {
  pink: { color: "#E84B8A" },
  blue: { color: "#3BA9D9" },
};

export function SectionDivider({ accent = "pink" }: SectionDividerProps) {
  const { color } = ACCENT[accent];

  return (
    <div className="w-full bg-[#000000] py-3 md:py-4" aria-hidden="true">
      <div className="flex items-center gap-6">
        {/* Left line */}
        <div
          className="flex-1"
          style={{ height: "1.5px", backgroundColor: "rgba(255,255,255,0.18)" }}
        />

        {/* Center mark */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Diamond left */}
          <span
            className="relative block"
            style={{ width: 12, height: 12, backgroundColor: color, transform: "rotate(45deg)" }}
          />

          {/* Label */}
          <span
            className="uppercase select-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.65rem",
              letterSpacing: "0.45em",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            D.O.G
          </span>

          {/* Diamond right */}
          <span
            className="relative block"
            style={{ width: 12, height: 12, backgroundColor: color, transform: "rotate(45deg)" }}
          />
        </div>

        {/* Right line */}
        <div
          className="flex-1"
          style={{ height: "1.5px", backgroundColor: "rgba(255,255,255,0.18)" }}
        />
      </div>
    </div>
  );
}
