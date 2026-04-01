import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

interface Partner {
  name: string;
  description: string;
  href: string;
  accentColor: string;
  initial: string;
}

const PARTNERS: Partner[] = [
  {
    name: "KRM.STUDIOS",
    description: "Studio créatif — direction artistique, image & brand",
    href: "https://krm-std.com/password",
    accentColor: "#3BA9D9",
    initial: "K",
  },
];

interface PartnersSectionProps {
  lang?: string;
}

const LABELS: Record<string, { title: string; sub: string; badge: string }> = {
  fr: { title: "Ils nous font confiance", sub: "Partenaires & soutiens", badge: "Partenaires" },
  en: { title: "They trust us",           sub: "Partners & supporters",   badge: "Partners" },
  de: { title: "Sie vertrauen uns",        sub: "Partner & Unterstützer",  badge: "Partner" },
};

export function PartnersSection({ lang = "fr" }: PartnersSectionProps) {
  const labels = LABELS[lang] ?? LABELS.fr;

  return (
    <section
      id="partners"
      aria-label={labels.title}
      className="bg-[#000000] py-6 md:py-8"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">

        {/* ── Section header ── */}
        <div className="flex items-center gap-4 mb-4 md:mb-5">
          <span
            className="text-[#FFFFFF]/20 uppercase tracking-[0.5em] select-none shrink-0"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1 }}
          >
            {labels.badge}
          </span>
          <div className="flex-1 h-px bg-[#FFFFFF]/10" />
          <span
            className="text-[#3BA9D9] uppercase tracking-[0.3em] shrink-0"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
          >
            D.O.G
          </span>
        </div>

        {/* ── Title row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4 md:mb-6">
          <div>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                className="text-[#FFFFFF] uppercase tracking-widest"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.1 }}
                initial={{ y: "108%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
              >
                {labels.title}
              </motion.h2>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.span
                className="text-[#E84B8A] block mt-1"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontStyle: "italic" }}
                initial={{ y: "108%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.82, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {labels.sub}
              </motion.span>
            </div>
          </div>

          {/* Decorative rule */}
          <motion.div
            className="hidden md:block h-px bg-[#FFFFFF]/8 flex-1 ml-12 max-w-[200px]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ transformOrigin: "0% 50%" }}
          />
        </div>

        {/* ── Partner cards ── */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-6">
          {PARTNERS.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.href}
              target={partner.href !== "#" ? "_blank" : undefined}
              rel={partner.href !== "#" ? "noopener noreferrer" : undefined}
              aria-label={`${partner.name} — ${partner.description}`}
              className="group relative flex items-center gap-5 p-6 border border-[#FFFFFF]/8 hover:border-[#FFFFFF]/20 transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A] sm:w-[320px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 50%, ${partner.accentColor}10 0%, transparent 70%)` }}
              />

              {/* Initial / logo placeholder */}
              <div
                className="w-14 h-14 flex items-center justify-center shrink-0 transition-all duration-300"
                style={{
                  border: `1px solid ${partner.accentColor}35`,
                  background: `${partner.accentColor}12`,
                }}
              >
                <span
                  className="select-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    color: partner.accentColor,
                    lineHeight: 1,
                  }}
                >
                  {partner.initial}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span
                  className="text-[#FFFFFF] uppercase tracking-[0.12em] group-hover:text-[#FFFFFF] transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 600 }}
                >
                  {partner.name}
                </span>
                <span
                  className="text-[#FFFFFF]/40"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", fontWeight: 300, lineHeight: 1.5 }}
                >
                  {partner.description}
                </span>
              </div>

              {/* Arrow */}
              <ExternalLink
                size={13}
                className="shrink-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ color: partner.accentColor }}
                aria-hidden="true"
              />

              {/* Animated corner accents */}
              <div
                className="absolute top-0 right-0 w-0 h-0 border-t border-r opacity-0 group-hover:opacity-100 group-hover:w-5 group-hover:h-5 transition-all duration-400 pointer-events-none"
                style={{ borderColor: partner.accentColor }}
              />
              <div
                className="absolute bottom-0 left-0 w-0 h-0 border-b border-l opacity-0 group-hover:opacity-100 group-hover:w-5 group-hover:h-5 transition-all duration-400 pointer-events-none"
                style={{ borderColor: "#E84B8A" }}
              />
            </motion.a>
          ))}

          {/* Placeholder "à venir" card */}
          <motion.div
            className="flex items-center justify-center sm:w-[200px] p-6 border border-[#FFFFFF]/5 border-dashed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span
              className="text-[#FFFFFF]/20 uppercase tracking-[0.2em] text-center"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 400 }}
            >
              + à venir
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}