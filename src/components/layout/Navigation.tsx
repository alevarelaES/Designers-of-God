import { useState, useEffect } from "react";
import { X, Menu, Instagram, ChevronDown } from "lucide-react";
import { Link, useLocation, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Translations } from "../../i18n";
import { DURATIONS } from "../../utils/animations";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { scrollToSection } from "../../utils/scrollToSection";

interface NavigationProps {
  t: Translations;
  /** Currently visible section id, tracked by Root via useVisibleSection. */
  visibleSection?: string;
}

const LANGS = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
] as const;

/** Replaces the /:lang segment in the current pathname */
function useLangSwitch() {
  const { pathname } = useLocation();
  return (targetLang: string) =>
    pathname.replace(/^\/(fr|en|de)/, `/${targetLang}`);
}

/**
 * Language dropdown.
 *
 * On change: navigate to the same path under the new lang, carrying
 * `scrollTarget` in location.state so Home.tsx can restore the position.
 * No sessionStorage needed — location.state is atomic and race-free.
 */
function LangSwitcher({
  size = "sm",
  visibleSection,
  onLanguageChange,
}: {
  size?: "sm" | "lg";
  visibleSection?: string;
  onLanguageChange?: () => void;
}) {
  const { lang: currentLang = "fr" } = useParams<{ lang: string }>();
  const buildPath = useLangSwitch();
  const navigate  = useNavigate();

  const isLg = size === "lg";

  const handleChange = (newLang: string) => {
    if (onLanguageChange) onLanguageChange();

    // Pass the visible section as scrollTarget so Home.tsx can restore position
    navigate(buildPath(newLang), {
      replace: true,
      state: { scrollTarget: visibleSection || "hero" },
    });
  };

  return (
    <motion.div
      className="relative flex items-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: DURATIONS.instant / 1000 }}
    >
      <select
        value={currentLang}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Language / Langue / Sprache"
        className={`appearance-none bg-transparent border border-[#FFFFFF]/15 text-[#FFFFFF]/70 hover:border-[#E84B8A]/50 hover:text-[#FFFFFF] cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A] ${
          isLg ? "pl-4 pr-8 py-3 text-sm" : "pl-3 pr-7 py-2 text-[0.6rem]"
        }`}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.18em",
          transitionDuration: `${DURATIONS.fast}ms`,
        }}
      >
        {LANGS.map(({ code, label }) => (
          <option key={code} value={code} style={{ background: "#000000", color: "#FFFFFF" }}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={isLg ? 14 : 10}
        className="absolute right-2 pointer-events-none text-[#FFFFFF]/40"
        aria-hidden="true"
      />
    </motion.div>
  );
}

export function Navigation({ t, visibleSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname }            = useLocation();
  const { lang = "fr" }         = useParams<{ lang: string }>();
  const { tier }                = useDeviceTier();
  const navigate                = useNavigate();

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => { 
    setMenuOpen(false); 
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const solidNav = scrolled || !isHome;

  // ── Section link click handler ─────────────────────────────────────────────
  //
  // ON HOME  → scroll directly (images already loaded, layout stable).
  // OFF HOME → navigate to home carrying scrollTarget in location.state.
  //            Root.tsx sees hasScrollTarget=true and skips scrollTo(0).
  //            Home.tsx reads state.scrollTarget and does a two-pass scroll.
  //
  // WHY location.state instead of sessionStorage:
  //   location.state is ATOMIC — it travels with the navigation event, no
  //   window between "write" (here) and "read" (Home.tsx).  sessionStorage
  //   had race conditions in React 18 Strict Mode double-effect invocations.
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (isHome) {
      // Already home, images loaded → direct, immediate scroll
      scrollToSection(sectionId, "smooth");
    } else {
      // Cross-page: carry target through navigation state
      navigate(`/${lang}`, { state: { scrollTarget: sectionId } });
    }
  };

  const navLinks = [
    { label: t.nav.about,   sectionId: "about" },
    { label: t.nav.news,    sectionId: "news"  },
    { label: t.nav.contact, sectionId: "contact" },
  ];

  const navInitial = tier === "low" ? undefined : { y: -80, opacity: 0 };
  const navAnimate = tier === "low" ? undefined : { y: 0, opacity: 1 };

  return (
    <>
      {/* ── Main header bar ── */}
      <motion.header
        role="banner"
        initial={navInitial}
        animate={navAnimate}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          solidNav
            ? "bg-[#000000]/95 backdrop-blur-md border-b border-[#FFFFFF]/8"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo — always goes to home top */}
          <Link
            to={`/${lang}`}
            aria-label="D.O.G — Designers of God, accueil"
            className="flex flex-col items-start select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A] z-[60] relative"
          >
            <span
              className="text-[#FFFFFF] tracking-widest"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", lineHeight: 1 }}
            >
              D.O.G
            </span>
            <span
              className="text-[#3BA9D9]"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "0.8rem", lineHeight: 1.2, fontStyle: "italic" }}
            >
              Designers of God
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={`#${link.sectionId}`}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                initial={tier === "low" ? undefined : { opacity: 0, y: -8 }}
                animate={tier === "low" ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
                className="relative text-[#FFFFFF] uppercase tracking-widest text-xs hover:text-[#E84B8A] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A] group cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E84B8A] transition-all duration-250 group-hover:w-full" />
              </motion.a>
            ))}

            <motion.div
              initial={tier === "low" ? undefined : { opacity: 0, y: -8 }}
              animate={tier === "low" ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <LangSwitcher size="sm" visibleSection={visibleSection} />
            </motion.div>

            <motion.a
              href="https://www.instagram.com/designers.of.god/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="D.O.G sur Instagram"
              initial={tier === "low" ? undefined : { opacity: 0, y: -8 }}
              animate={tier === "low" ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.4 }}
              className="flex items-center justify-center w-8 h-8 border border-[#FFFFFF]/15 text-[#FFFFFF]/60 hover:text-[#E84B8A] hover:border-[#E84B8A]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A]"
            >
              <Instagram size={14} aria-hidden="true" />
            </motion.a>
          </nav>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-[#FFFFFF] p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A] z-[60] relative"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Full-screen mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed inset-0 z-40 bg-[#000000] flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#FFFFFF]/8 shrink-0">
              <Link
                to={`/${lang}`}
                onClick={() => setMenuOpen(false)}
                aria-label="D.O.G — Designers of God, accueil"
                className="flex flex-col items-start select-none"
              >
                <span
                  className="text-[#FFFFFF] tracking-widest"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", lineHeight: 1 }}
                >
                  D.O.G
                </span>
                <span
                  className="text-[#3BA9D9]"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: "0.8rem", lineHeight: 1.2, fontStyle: "italic" }}
                >
                  Designers of God
                </span>
              </Link>
            </div>

            {/* Nav links */}
            <nav
              aria-label="Navigation mobile"
              className="flex-1 flex flex-col items-center justify-center gap-8 px-6"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={`#${link.sectionId}`}
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                  initial={{ opacity: 0, y: tier === "low" ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[#FFFFFF] uppercase tracking-[0.3em] hover:text-[#E84B8A] transition-colors duration-200 focus-visible:outline-none cursor-pointer"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.75rem, 8vw, 2.75rem)",
                    lineHeight: 1.1,
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: tier === "low" ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.22, duration: 0.35 }}
              >
                <LangSwitcher
                  size="lg"
                  visibleSection={visibleSection}
                  onLanguageChange={() => setMenuOpen(false)}
                />
              </motion.div>

              <motion.a
                href="https://www.instagram.com/designers.of.god/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="D.O.G sur Instagram"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: tier === "low" ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.28, duration: 0.35 }}
                className="flex items-center gap-3 text-[#FFFFFF]/50 hover:text-[#E84B8A] transition-colors duration-200 focus-visible:outline-none"
              >
                <Instagram size={22} aria-hidden="true" />
                <span
                  className="uppercase tracking-[0.25em]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 400 }}
                >
                  Instagram
                </span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}




