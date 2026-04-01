import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center gap-8 px-6 pt-16">
      <div className="flex flex-col items-center gap-2">
        <span
          className="text-[#FFFFFF] tracking-[0.3em]"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "4rem", lineHeight: 1 }}
        >
          D.O.G
        </span>
        <span
          className="text-[#E84B8A]"
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1rem", fontStyle: "italic" }}
        >
          Designers of God
        </span>
      </div>
      <div className="w-12 h-px bg-[#FFFFFF]/20" aria-hidden="true" />
      <p
        className="text-[#FFFFFF]/30 uppercase tracking-[0.3em] text-xs"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Page not found
      </p>
      <Link
        to="/fr"
        className="px-8 py-4 border border-[#FFFFFF]/30 text-[#FFFFFF] uppercase tracking-[0.2em] text-xs hover:border-[#E84B8A] hover:text-[#E84B8A] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Return Home
      </Link>
    </div>
  );
}