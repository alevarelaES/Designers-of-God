import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { articleData, categoryColor, Translations } from "../../i18n";
import { EASINGS, DURATIONS, VIEWPORT_MARGINS } from "../../utils/animations";
import { useDeviceTier } from "../../hooks/useDeviceTier";

interface ArticleCardProps {
  index: number;
  t: Translations;
  variant?: "featured" | "medium" | "small";
  animationDelay?: number;
  /** Set true when rendered inside the carousel — disables whileInView and
   *  expensive hover effects that would fight with the scroll animation. */
  inCarousel?: boolean;
}

export function ArticleCard({
  index,
  t,
  variant = "small",
  animationDelay = 0,
  inCarousel = false,
}: ArticleCardProps) {
  const { tier } = useDeviceTier();
  const article = articleData[index];
  const translation = t.articleList[index];
  const color = categoryColor[article.category] ?? "#FFFFFF";
  const { lang = "fr" } = useParams<{ lang: string }>();

  if (!article || !translation) return null;

  const aspectClass = {
    featured: "aspect-[3/2]",
    medium: "aspect-[4/3]",
    small: "aspect-[4/3]",
  }[variant];

  const titleSize = {
    featured: "clamp(1.5rem, 3vw, 2rem)",
    medium: "1.125rem",
    small: "0.9375rem",
  }[variant];

  const bodyPreview = translation.body?.join(" ") ?? "";

  // ── Reveal animation ────────────────────────────────────────────────────────
  // Carousel cards skip whileInView entirely — they're already visible and
  // the IntersectionObserver fires unreliably on moving elements.
  const revealProps = (inCarousel || tier === "low")
    ? {}
    : tier === "medium"
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-30px" } as const,
        style: { willChange: "opacity" },
        transition: { duration: 0.4, delay: 0 },
      }
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: VIEWPORT_MARGINS.normal } as const,
        style: { willChange: "transform, opacity" },
        transition: { duration: DURATIONS.medium / 1000, delay: animationDelay, ease: EASINGS.smooth },
      };

  // ── Hover effect on the card wrapper ────────────────────────────────────────
  // inCarousel or medium: CSS-only hover (no Motion values = no JS per frame)
  // high + standalone: Motion whileHover (lift + border)
  const cardHoverProps =
    !inCarousel && tier === "high"
      ? { whileHover: { y: -8, borderColor: `${color}50` } }
      : {};

  // Image scale on hover — skip in carousel (competes with scroll rAF)
  const imgHoverProps =
    !inCarousel && tier === "high"
      ? { whileHover: { scale: 1.08 }, transition: { duration: DURATIONS.medium / 1000, ease: EASINGS.smooth } }
      : {};

  // Shine sweep — only on high-tier standalone cards
  const showShine = !inCarousel && tier === "high";

  // Corner accents — only on high-tier standalone cards
  const showCorners = !inCarousel && tier === "high";

  // Hover glow overlay — skip in carousel
  const showGlow = !inCarousel && tier === "high";

  return (
    <motion.article
      {...revealProps}
      className="group flex flex-col h-full"
      aria-label={`${article.category} — ${translation.title}`}
    >
      <Link
        to={`/${lang}/article/${article.id}`}
        className="flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A]"
        aria-label={`${t.news.readMore} — ${translation.title}`}
      >
        <motion.div
          className="relative border overflow-hidden h-full flex flex-col"
          style={{ borderColor: "#FFFFFF0F" }}
          {...cardHoverProps}
          transition={{ duration: DURATIONS.fast / 1000, ease: EASINGS.snappy }}
        >
          {/* Hover glow — high tier standalone only */}
          {showGlow && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${color}18 0%, transparent 70%)`,
                transitionDuration: `${DURATIONS.normal}ms`,
              }}
            />
          )}

          {/* Shine sweep — high tier standalone only */}
          {showShine && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
              style={{ background: `linear-gradient(110deg, transparent 30%, ${color}12 50%, transparent 70%)` }}
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            />
          )}

          {/* Image */}
          <div className={`overflow-hidden ${aspectClass} bg-[#111111] relative shrink-0`}>
            <motion.img
              src={article.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              style={{ objectPosition: article.objectPosition ?? "center center" }}
              loading="lazy"
              decoding="async"
              {...imgHoverProps}
            />

            {/* Gradient on hover — skip on low + carousel */}
            {tier !== "low" && !inCarousel && (
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#000000]/65 via-[#000000]/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ transitionDuration: `${DURATIONS.fast}ms` }}
              />
            )}

            {/* Article number badge (carousel only) */}
            {variant === "small" && (
              <div className="absolute bottom-3 right-3 w-7 h-7 flex items-center justify-center border border-[#FFFFFF]/15 bg-[#000000]/50">
                <span
                  className="text-[#FFFFFF]/70"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500 }}
                >
                  {((index - 3) % 4) + 1}
                </span>
              </div>
            )}

            {/* Category tag */}
            <div className="absolute top-3 left-3">
              <span
                className="px-2.5 py-1 text-[#000000] uppercase tracking-[0.15em] shadow-md"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, backgroundColor: color }}
              >
                {t.categoryLabels[article.category] ?? article.category}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3 pt-5 pb-2 px-5 bg-[#000000] flex-1">
            <h3
              className="text-[#FFFFFF] group-hover:text-[#E84B8A] transition-colors"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: titleSize,
                lineHeight: 1.3,
                transitionDuration: `${DURATIONS.fast}ms`,
              }}
            >
              {translation.title}
            </h3>

            {(variant === "featured" || variant === "medium") && (
              <p
                className={variant === "medium" ? "line-clamp-3" : ""}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.9, fontWeight: 300, color: "rgba(255,255,255,0.60)" }}
              >
                {translation.excerpt}
              </p>
            )}

            {variant === "featured" && (
              <>
                {translation.lead && (
                  <>
                    {tier === "high" ? (
                      <motion.div
                        className="w-8 h-px bg-[#E84B8A]/30 my-0.5"
                        initial={{ width: 0 }}
                        whileInView={{ width: 32 }}
                        transition={{ delay: 0.3, duration: DURATIONS.normal / 1000 }}
                      />
                    ) : (
                      <div className="w-8 h-px bg-[#E84B8A]/30 my-0.5" />
                    )}
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.775rem", lineHeight: 2, fontWeight: 300, color: "rgba(255,255,255,0.48)" }}>
                      {translation.lead}
                    </p>
                  </>
                )}
                {bodyPreview && (
                  <div className="relative mt-1" style={{ maxHeight: "6.5rem", overflow: "hidden" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", lineHeight: 2, fontWeight: 300, color: "rgba(255,255,255,0.32)" }}>
                      {bodyPreview}
                    </p>
                    <div
                      className="absolute bottom-0 left-0 right-0 pointer-events-none"
                      style={{ height: "3.5rem", background: "linear-gradient(to bottom, transparent, #000000)" }}
                    />
                  </div>
                )}
              </>
            )}

            {/* Read more */}
            <div className="flex items-center gap-2 mt-auto pt-3 overflow-hidden">
              {tier === "high" && !inCarousel ? (
                <motion.div
                  className="h-px bg-[#E84B8A]"
                  initial={{ width: 0 }}
                  whileHover={{ width: 28 }}
                  transition={{ duration: DURATIONS.fast / 1000, ease: EASINGS.snappy }}
                />
              ) : (
                <div className="h-px bg-[#E84B8A]" style={{ width: 14 }} />
              )}
              <span
                className="text-[#FFFFFF]/40 group-hover:text-[#E84B8A] uppercase tracking-[0.2em] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500, transitionDuration: `${DURATIONS.fast}ms` }}
              >
                {t.news.readMore} →
              </span>
            </div>
          </div>

          {/* Corner accents — high tier standalone only */}
          {showCorners && (
            <>
              <motion.div
                className="absolute top-0 right-0 border-t-2 border-r-2 opacity-0"
                style={{ borderColor: color }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                whileHover={{ width: 22, height: 22, opacity: 1 }}
                transition={{ duration: DURATIONS.fast / 1000, ease: EASINGS.snappy }}
              />
              <motion.div
                className="absolute bottom-0 left-0 border-b-2 border-l-2 opacity-0"
                style={{ borderColor: color }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                whileHover={{ width: 22, height: 22, opacity: 1 }}
                transition={{ duration: DURATIONS.fast / 1000, ease: EASINGS.snappy, delay: 0.04 }}
              />
            </>
          )}
        </motion.div>
      </Link>
    </motion.article>
  );
}




