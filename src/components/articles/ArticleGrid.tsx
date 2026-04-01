import { motion } from "motion/react";
import { Translations } from "../../i18n";
import { ArticleCard } from "../articles/ArticleCard";
import { ArticleCarousel } from "../articles/ArticleCarousel";
import { useDeviceTier } from "../../hooks/useDeviceTier";

interface ArticleGridProps {
  t: Translations;
}

export function ArticleGrid({ t }: ArticleGridProps) {
  const { tier } = useDeviceTier();

  // Tier-aware header reveal
  const headerReveal = tier === "low"
    ? {}
    : {
        initial: { opacity: 0, y: tier === "medium" ? 0 : 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        style: { willChange: "transform, opacity" },
        transition: { duration: 0.55 },
      };

  return (
    <section
      id="news"
      aria-label="Actualités et articles"
      className="bg-[#000000] py-6 md:py-8"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-6 md:gap-8">

        {/* Section identifier */}
        <div className="flex items-center gap-4">
          <span
            className="text-[#FFFFFF]/25 uppercase tracking-[0.5em] select-none shrink-0"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
          >
            {t.news.sectionTitle}
          </span>
          <div className="flex-1 h-px bg-[#FFFFFF]/12" />
          <span
            className="text-[#3BA9D9] uppercase tracking-[0.3em] shrink-0"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
          >
            {t.news.journal}
          </span>
        </div>

        {/* Section header */}
        <motion.div className="flex flex-col gap-2" {...headerReveal}>
          <div className="flex items-center gap-3">
            <div className="h-px bg-[#E84B8A]" style={{ width: 20 }} />
            <span
              className="text-[#E84B8A] uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 500 }}
            >
              {t.news.latestLabel}
            </span>
          </div>

          <h2
            className="text-[#FFFFFF] uppercase tracking-widest"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              lineHeight: 1.12,
            }}
          >
            {t.news.sectionTitle}
          </h2>

          <p
            className="text-[#FFFFFF]/55 max-w-[400px]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.95, fontWeight: 300 }}
          >
            {t.news.sectionSubtitle}
          </p>
        </motion.div>

        {/* Articles */}
        <div className="flex flex-col gap-6 md:gap-10">
          {/* Row A: 1 featured + 2 medium */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 md:gap-10">
            <ArticleCard index={0} t={t} variant="featured" animationDelay={0} />
            <div className="flex flex-col gap-6 md:gap-8">
              <ArticleCard index={1} t={t} variant="medium" animationDelay={0.06} />
              <ArticleCard index={2} t={t} variant="medium" animationDelay={0.12} />
            </div>
          </div>

          {/* Subtle internal divider */}
          <div className="flex items-center gap-5 py-1" aria-hidden="true">
            <div className="flex-1 h-px bg-[#FFFFFF]/18" />
            <span
              className="uppercase tracking-[0.55em] text-[#FFFFFF]/35 shrink-0 select-none"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.6rem" }}
            >
              D.O.G
            </span>
            <div className="flex-1 h-px bg-[#FFFFFF]/18" />
          </div>

          {/* Row B: Infinite carousel */}
          <ArticleCarousel t={t} startIndex={3} count={4} />
        </div>
      </div>
    </section>
  );
}




