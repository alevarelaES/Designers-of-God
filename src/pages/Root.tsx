import { Outlet, useLocation, useParams, Navigate } from "react-router";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "../components/layout/Navigation";
import { Footer } from "../components/layout/Footer";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../i18n";
import { useVisibleSection } from "../hooks/useVisibleSection";
import { pageTransition } from "../utils/animations";

const URL_TO_LANG: Record<string, Language> = {
  fr: "FR",
  en: "EN",
  de: "DE",
};

// Matches /{lang} and /{lang}/
const HOME_RE = /^\/(fr|en|de)\/?$/;

export function Root() {
  const { lang: langParam }     = useParams<{ lang: string }>();
  const { t, setLang }          = useLanguage();
  const { pathname, state: locState } = useLocation();
  const visibleSection          = useVisibleSection(pathname);

  const validLang = langParam && langParam in URL_TO_LANG
    ? URL_TO_LANG[langParam]
    : null;

  // Keep LanguageContext in sync with URL
  useEffect(() => {
    if (validLang) setLang(validLang);
  }, [validLang]);

  // Disable browser's own scroll restoration — we manage it entirely
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  const prevPathRef = useRef(pathname);

  // ── Scroll management on route change ──────────────────────────────────────
  //
  // Single rule: scroll to top on EVERY navigation UNLESS we are going to the
  // home page AND the navigation carries an explicit scrollTarget in
  // location.state (set by Navigation, ArticleDetail, LangSwitcher).
  // In that case, Home.tsx handles the scroll after it mounts.
  //
  // This replaces the previous multi-key sessionStorage coordination which had
  // race conditions between Root and Home.
  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    const isNowHome  = HOME_RE.test(pathname);

    // Home navigation with an explicit scroll target → Home.tsx takes over
    const hasScrollTarget = !!(locState as Record<string, unknown> | null)?.scrollTarget;
    if (isNowHome && hasScrollTarget) return;

    // Everything else: fresh page → top
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]); // locState intentionally omitted: both change together on navigate()

  if (!validLang) return <Navigate to="/fr" replace />;

  return (
    <div className="min-h-screen bg-[#000000] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#FFFFFF] focus:text-[#000000] focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Aller au contenu
      </a>
      <Navigation t={t} visibleSection={visibleSection} />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer t={t} />
    </div>
  );
}



