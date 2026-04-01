import { motion } from "motion/react";
import imgAbout from "figma:asset/757a91cae21d1f1d5f80facc83e37c1e5b59199b.png";
import { Translations } from "../../i18n";
import { useDeviceTier } from "../../hooks/useDeviceTier";

interface AboutSectionProps {
  t: Translations;
}

export function AboutSection({ t }: AboutSectionProps) {
  const { tier } = useDeviceTier();
  const { about } = t;

  const sectionTitle = about?.sectionTitle ?? "À propos";
  const missionLabel = about?.missionLabel ?? "Notre mission";
  const body1 = about?.body1 ?? "";
  const body2 = about?.body2 ?? "";
  const cta = about?.cta ?? "Rejoindre le mouvement";
  const imgAlt = about?.imgAlt ?? "";
  const pillars = about?.pillars ?? [
    { label: "Créer",    desc: "Série, photo, design, podcasts — l'expression sous toutes ses formes." },
    { label: "Apprendre", desc: "Des ateliers animés par des professionnels." },
    { label: "Grandir",  desc: "Développement personnel, sport et événements." },
  ];

  // Shared reveal helper — returns motion props based on tier
  const reveal = (delay = 0, opts: { x?: number; y?: number; scale?: number } = {}) => {
    if (tier === "low") return {};
    if (tier === "medium") {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-20px" } as const,
        style: { willChange: "opacity" },
        transition: { duration: 0.4, delay: 0 }, // no stagger on medium
      };
    }
    return {
      initial: { opacity: 0, y: opts.y ?? 18, x: opts.x ?? 0, scale: opts.scale ?? 1 },
      whileInView: { opacity: 1, y: 0, x: 0, scale: 1 },
      viewport: { once: true, margin: "-50px" } as const,
      style: { willChange: "transform, opacity" },
      transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
    };
  };

  return (
    <section
      id="about"
      aria-label={sectionTitle}
      className="bg-[#000000] py-8 md:py-12 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">

        {/* Section identifier */}
        <div className="flex items-center gap-4 mb-5 md:mb-7">
          <span
            className="text-[#FFFFFF]/25 uppercase tracking-[0.5em] select-none shrink-0"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
          >
            {sectionTitle}
          </span>
          <div className="flex-1 h-px bg-[#FFFFFF]/12" />
          <span
            className="text-[#E84B8A] uppercase tracking-[0.3em] shrink-0"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
          >
            D.O.G
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-start">

          {/* Left — text */}
          <div className="flex flex-col gap-8">

            {/* Eyebrow + heading */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="h-px bg-[#E84B8A]" style={{ width: 24 }} />
                <motion.span
                  className="text-[#E84B8A] uppercase tracking-[0.3em]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 500 }}
                  {...reveal(0.05)}
                >
                  {missionLabel}
                </motion.span>
              </div>

              <div className="flex flex-col gap-2">
                <motion.h2
                  className="text-[#FFFFFF] tracking-[0.15em] uppercase"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 1 }}
                  {...reveal(0.0)}
                >
                  D.O.G
                </motion.h2>
                <motion.span
                  className="text-[#3BA9D9]"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1.3rem, 4vw, 2rem)", fontStyle: "italic" }}
                  {...reveal(0.1)}
                >
                  Designers of God
                </motion.span>
              </div>
            </div>

            {/* Body */}
            <motion.div className="flex flex-col gap-5" {...reveal(0.18)}>
              <p
                className="text-[#FFFFFF]/85"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 2, fontWeight: 300 }}
              >
                {body1}
              </p>
              <p
                className="text-[#FFFFFF]/58"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.825rem", lineHeight: 1.95, fontWeight: 300 }}
              >
                {body2}
              </p>
            </motion.div>

            {/* Pillars */}
            <div className="flex flex-col gap-4">
              {pillars.map(({ label, desc }, i) => {
                const color = i % 2 === 0 ? "#E84B8A" : "#3BA9D9";
                return (
                  <motion.div
                    key={label}
                    className="flex items-start gap-4"
                    {...reveal(0.08 + i * 0.08, { x: -16 })}
                  >
                    <div className="shrink-0 mt-2" style={{ width: 3, height: 34, backgroundColor: color, opacity: 0.82 }} />
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-[#FFFFFF] uppercase tracking-[0.2em]"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", lineHeight: 1.2 }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-[#FFFFFF]/58"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.775rem", lineHeight: 1.8, fontWeight: 300 }}
                      >
                        {desc}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              {...reveal(0.32)}
              whileHover={tier === "high" ? { scale: 1.03 } : undefined}
              className="self-start inline-flex items-center gap-3 px-8 py-4 border border-[#E84B8A]/45 text-[#E84B8A] uppercase tracking-[0.22em] transition-colors duration-250 hover:bg-[#E84B8A] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500 }}
            >
              {cta}
            </motion.a>
          </div>

          {/* Right — image */}
          <motion.div
            className="relative flex flex-col"
            {...reveal(0.12, { x: 28, scale: 0.97 })}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={imgAbout}
                alt={imgAlt}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
                style={{ filter: "grayscale(100%) brightness(0.88) contrast(1.08)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000]/60 via-transparent to-transparent" />
            </div>

            {/* Floating label */}
            <motion.div
              className="absolute bottom-6 left-6 flex flex-col gap-1 border-l-2 border-[#E84B8A] pl-4"
              {...reveal(0.45)}
            >
              <span
                className="text-[#FFFFFF] uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", lineHeight: 1 }}
              >
                D.O.G
              </span>
              <span
                className="text-[#E84B8A]"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: "0.75rem", fontStyle: "italic" }}
              >
                Designers of God
              </span>
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute top-0 -right-3 w-14 h-14 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 right-0 w-full h-px bg-[#3BA9D9]/35" />
              <div className="absolute top-0 right-0 w-px h-full bg-[#3BA9D9]/35" />
            </div>
            <div className="absolute bottom-0 -left-3 w-14 h-14 pointer-events-none" aria-hidden="true">
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#E84B8A]/35" />
              <div className="absolute bottom-0 left-0 w-px h-full bg-[#E84B8A]/35" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



