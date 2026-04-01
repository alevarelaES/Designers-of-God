import { useCallback, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router";
import { Hero } from "../components/sections/Hero";
import { MarqueeTicker } from "../components/sections/MarqueeTicker";
import { ArticleGrid } from "../components/articles/ArticleGrid";
import { AboutSection } from "../components/sections/AboutSection";
import { StatsSection } from "../components/sections/StatsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { SectionDivider } from "../components/sections/SectionDivider";
import { PartnersSection } from "../components/sections/PartnersSection";
import { useLanguage } from "../context/LanguageContext";
import { scrollToSection } from "../utils/scrollToSection";

export function Home() {
  const { t }               = useLanguage();
  const { lang = "fr" }     = useParams<{ lang: string }>();
  const { state: locState } = useLocation();
  // Capture scrollTarget at mount time — stable ref, immune to re-renders
  const scrollTargetRef     = useRef<string | null>(
    (locState as Record<string, unknown> | null)?.scrollTarget as string | null ?? null
  );

  useEffect(() => {
    const target = scrollTargetRef.current;
    if (!target || target === "hero") {
      if (target === "hero") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Clear scrollTarget from the browser history entry so a manual page
    // refresh doesn't re-trigger the scroll (user expects top of page on F5).
    try {
      const hs = window.history.state;
      window.history.replaceState(
        { ...hs, usr: { ...(hs?.usr ?? {}), scrollTarget: undefined } },
        ""
      );
    } catch {
      // replaceState can throw in sandboxed iframes — safe to ignore
    }

    // ── Two-pass scroll strategy ────────────────────────────────────────────
    //
    // Pass 1 (immediate): scroll right away using layout positions.
    //   At this point the AnimatePresence enter animation (650 ms) has just
    //   started. offsetParent-based positions are layout-accurate but images
    //   above the target section may not be loaded yet → slight offset OK.
    //
    // Pass 2 (t = 1000 ms): corrective "instant" scroll after most images
    //   have loaded and the layout has stabilised. If positions haven't
    //   changed (images cached), this is a no-op at the same pixel value.
    //
    // We intentionally use "smooth" for pass 1 (looks intentional to the user)
    // and "instant" for pass 2 (silent correction, barely noticeable).
    scrollToSection(target, "smooth");

    const correctionId = setTimeout(() => {
      scrollToSection(target, "instant");
    }, 1000);

    return () => clearTimeout(correctionId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // ↑ Empty deps: runs once on mount. scrollTargetRef captures the value
  //   at render time so stale-closure is not an issue.

  const handleCtaClick = useCallback(() => {
    scrollToSection("about", "smooth");
  }, []);

  return (
    <>
      <Hero t={t} onCtaClick={handleCtaClick} />
      <MarqueeTicker />
      <AboutSection t={t} />
      <SectionDivider accent="blue" />
      <StatsSection t={t} />
      <SectionDivider accent="pink" />
      <ArticleGrid t={t} />
      <SectionDivider accent="blue" />
      <PartnersSection lang={lang} />
      <SectionDivider accent="pink" />
      <ContactSection t={t} />
    </>
  );
}


