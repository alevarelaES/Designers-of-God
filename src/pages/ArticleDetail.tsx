import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { articleData, categoryColor, Translations } from "../i18n";

export function ArticleDetail() {
  const { id, lang = "fr" } = useParams<{ id: string; lang: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const articleIndex = articleData.findIndex((a) => a.id === id);
  const article = articleData[articleIndex];
  const translation = t.articleList[articleIndex];

  // ── Floating back button visibility ──────────────────────────────────
  const { scrollY } = useScroll();
  const [showFloat, setShowFloat] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShowFloat(v > 80));

  // ── Back navigation ──────────────────────────────────────────────────
  // WHY NOT navigate(-1):
  //   navigate(-1) is unpredictable. If the user opened this article via a
  //   bookmarked / shared URL (no /fr in history), -1 exits the app entirely.
  //   Even when /fr IS in history, homeSectionId might not be set (no
  //   sessionStorage write happened on this session).
  //
  // Instead: always navigate explicitly to /{lang} with scrollTarget="news"
  // so Home.tsx reliably scrolls to the news section — regardless of how
  // the user arrived at this article.
  const handleBack = () =>
    navigate(`/${lang}`, { state: { scrollTarget: "news" } });

  if (!article || !translation) {
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center gap-6 px-6 pt-20">
        <p className="text-[#FFFFFF]/30 uppercase tracking-widest text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
          Article introuvable
        </p>
        <Link to={`/${lang}`} className="text-[#E84B8A] text-xs uppercase tracking-widest hover:text-[#FFFFFF] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
          ← {t.news.backToNews}
        </Link>
      </div>
    );
  }

  const color = categoryColor[article.category] ?? "#FFFFFF";

  return (
    <div className="min-h-screen bg-[#000000]">

      {/* ── Floating back button (right side, desktop only) ── */}
      <motion.div
        className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: showFloat ? 1 : 0, x: showFloat ? 0 : 60 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!showFloat}
      >
        <button
          onClick={handleBack}
          aria-label={t.news.backToNews}
          className="group flex flex-col items-center gap-3 py-6 px-3.5 bg-[#000000] border-l-2 border-t border-b border-[#E84B8A]/50 hover:border-[#E84B8A] hover:bg-[#E84B8A]/8 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A] cursor-pointer"
          tabIndex={showFloat ? 0 : -1}
        >
          <ArrowLeft
            size={14}
            className="text-[#E84B8A] group-hover:text-[#FFFFFF] transition-colors duration-300"
          />
          <span
            className="text-[#FFFFFF]/50 group-hover:text-[#E84B8A] transition-colors duration-300 select-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.5rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            {t.news.backToNews}
          </span>
        </button>
      </motion.div>

      {/* ── Hero image ── */}
      <motion.div
        className="relative w-full pt-16 md:pt-20 overflow-hidden"
        style={{ height: "clamp(320px, 58vh, 640px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={article.imageHero}
          alt={`${translation.title} — D.O.G`}
          className="w-full h-full object-cover"
          style={{ objectPosition: article.objectPositionHero ?? "center center" }}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-transparent to-[#000000]/85" aria-hidden="true" />

        {/* Category floating tag */}
        <motion.div
          className="absolute bottom-8 left-6 md:left-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span
            className="px-3 py-1.5 text-[#000000] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, backgroundColor: color }}
          >
            {article.category}
          </span>
        </motion.div>
      </motion.div>

      {/* ── Article content ── */}
      <div className="max-w-[800px] mx-auto px-6 md:px-8 py-12 md:py-20">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Fil d'Ariane"
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link to={`/${lang}`} className="text-[#FFFFFF]/20 text-[0.6rem] uppercase tracking-widest hover:text-[#FFFFFF] transition-colors focus-visible:outline-none" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t.breadcrumb.home}
          </Link>
          <span className="text-[#FFFFFF]/15 text-[0.6rem]">→</span>
          {/* Use Link state so Home.tsx scrolls to news on arrival */}
          <Link
            to={`/${lang}`}
            state={{ scrollTarget: "news" }}
            className="text-[#FFFFFF]/20 text-[0.6rem] uppercase tracking-widest hover:text-[#FFFFFF] transition-colors focus-visible:outline-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.breadcrumb.news}
          </Link>
          <span className="text-[#FFFFFF]/15 text-[0.6rem]">→</span>
          <span className="text-[#FFFFFF]/35 text-[0.6rem] uppercase tracking-widest truncate max-w-[160px]" style={{ fontFamily: "'Inter', sans-serif" }}>
            {translation.title}
          </span>
        </motion.nav>

        {/* Date + reading time */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <time dateTime={article.date} className="text-[#FFFFFF]/30 text-[0.65rem] uppercase tracking-widest" style={{ fontFamily: "'Inter', sans-serif" }}>
            {article.date}
          </time>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-[#FFFFFF] mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 5vw, 3rem)", lineHeight: 1.18, letterSpacing: "-0.01em" }}
        >
          {translation.title}
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-10 h-px" style={{ backgroundColor: color }} aria-hidden="true" />
          <div className="flex-1 h-px bg-[#FFFFFF]/8" aria-hidden="true" />
        </motion.div>

        {/* Lead */}
        <motion.p
          className="text-[#FFFFFF]/90 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 2.2vw, 1.3rem)", lineHeight: 1.8, fontStyle: "italic" }}
        >
          {translation.lead}
        </motion.p>

        {/* Body paragraphs */}
        <div className="flex flex-col gap-7">
          {translation.body.map((paragraph, i) => (
            <motion.p
              key={i}
              className="text-[#FFFFFF]/60"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + i * 0.06, duration: 0.6 }}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.95, fontWeight: 300 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Back link */}
        <motion.div
          className="mt-16 pt-8 border-t border-[#FFFFFF]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Link
            to={`/${lang}`}
            state={{ scrollTarget: "news" }}
            className="inline-flex items-center gap-2 text-[#FFFFFF]/35 hover:text-[#E84B8A] transition-colors text-xs uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft size={12} />
            {t.news.backToNews}
          </Link>
        </motion.div>
      </div>

      {/* ── Lire aussi ── */}
      <ReadAlso currentId={id ?? ""} t={t} />
    </div>
  );
}

// ── Section "Lire aussi" ──
function ReadAlso({ currentId, t }: { currentId: string; t: Translations }) {
  const { lang = "fr" } = useParams<{ lang: string }>();
  const related = articleData.filter((a) => a.id !== currentId).slice(0, 3);

  return (
    <section
      aria-label={t.news.readAlso}
      className="border-t border-[#FFFFFF]/8 py-16 md:py-24 px-6 md:px-12 bg-[#000000]"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        {/* Section header */}
        <div className="flex flex-col gap-6">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-[#E84B8A]" aria-hidden="true" />
            <h2 className="text-[#FFFFFF] uppercase tracking-[0.3em]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem" }}>
              {t.news.readAlso}
            </h2>
            <div className="flex-1 h-px bg-[#FFFFFF]/8" aria-hidden="true" />
          </motion.div>
          
          {/* Decorative accent */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-1 h-1 bg-[#3BA9D9]" />
            <div className="w-1 h-1 bg-[#E84B8A]" />
            <div className="w-1 h-1 bg-[#3BA9D9]" />
          </motion.div>
        </div>

        {/* Cards grid with staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {related.map((art, i) => {
            const idx = articleData.findIndex((a) => a.id === art.id);
            const tr = t.articleList[idx];
            const col = categoryColor[art.category] ?? "#FFFFFF";

            // Staggered vertical offsets for visual dynamism
            const offsetY = i === 1 ? "md:-mt-8" : i === 2 ? "md:mt-4" : "";

            return (
              <motion.div
                key={art.id}
                className={`${offsetY}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/${lang}/article/${art.id}`}
                  aria-label={`${t.news.readMore} — ${tr.title}`}
                  className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A] h-full"
                >
                  <motion.div
                    className="relative border overflow-hidden h-full flex flex-col"
                    style={{ borderColor: "#FFFFFF0F" }}
                    whileHover={{ y: -8, borderColor: "#E84B8A4D" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${col}15 0%, transparent 70%)` }} />
                    
                    {/* Image container */}
                    <div className="overflow-hidden aspect-[4/3] bg-[#111111] relative">
                      <motion.img
                        src={art.image}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                      {/* Image overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      
                      {/* Category tag */}
                      <motion.div
                        className="absolute top-4 left-4"
                        whileHover={{ scale: 1.05, x: 2, y: -2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="px-3 py-1.5 text-[#000000] uppercase tracking-[0.2em] shadow-lg"
                          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 600, backgroundColor: col }}>
                          {art.category}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 p-6 bg-[#000000] flex-1">
                      {/* Date */}
                      <time dateTime={art.date} className="text-[#FFFFFF]/25 text-[0.6rem] uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {art.date}
                      </time>

                      {/* Title */}
                      <h3
                        className="text-[#FFFFFF] line-clamp-2 group-hover:text-[#E84B8A] transition-colors duration-300"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", lineHeight: 1.35 }}
                      >
                        {tr.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[#FFFFFF]/40 text-[0.8rem] line-clamp-2 flex-1" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.75, fontWeight: 300 }}>
                        {tr.excerpt}
                      </p>

                      {/* Read more indicator */}
                      <div className="flex items-center gap-2 mt-2 overflow-hidden">
                        <motion.div
                          className="h-px bg-[#E84B8A]"
                          initial={{ width: 0 }}
                          whileHover={{ width: 24 }}
                          transition={{ duration: 0.4 }}
                        />
                        <span
                          className="text-[#E84B8A]/0 group-hover:text-[#E84B8A] uppercase tracking-[0.2em] transition-colors duration-400"
                          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
                        >
                          {t.news.readMore} →
                        </span>
                      </div>
                    </div>

                    {/* Animated corner accents */}
                    <motion.div
                      className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-400"
                      style={{ borderColor: col }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0 border-b-2 border-l-2 opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-400"
                      style={{ borderColor: col }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="flex items-center gap-3 justify-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="w-12 h-px bg-[#FFFFFF]/5" />
          <div className="w-2 h-2 border border-[#E84B8A]/20 rotate-45" />
          <div className="w-12 h-px bg-[#FFFFFF]/5" />
        </motion.div>
      </div>
    </section>
  );
}

