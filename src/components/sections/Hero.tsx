import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Translations } from "../../i18n";
import { buttonTap } from "../../utils/animations";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import imgChurch from "figma:asset/7904eed1d96de1c1bd1d41a0f5fd3e3b3d0d118b.png";
import imgSteps from "figma:asset/8b78f1adf998e3c2eff58234a82845b9dfd6f272.png";

const HERO_IMAGES = [
  {
    src: imgChurch,
    alt: "Membre D.O.G assis dans une cathédrale portant un t-shirt Designers of God",
    position: "center 52%",
  },
  {
    src: imgSteps,
    alt: "Membre D.O.G appuyé contre un mur portant un hoodie et un jogging D.O.G",
    position: "center 30%",
  },
];

const DOG_CHARS = ["D", ".", "O", ".", "G"];

// ── Parallax wrapper — only mounted on high tier ──────────────────────────────
// Isolating useScroll here means the scroll listener is never attached on
// medium / low devices, eliminating one source of per-scroll CPU work.
function ParallaxImages({ activeImg, loadedImages }: { activeImg: number; loadedImages: boolean[] }) {
  const { scrollY } = useScroll();
  const parallaxY  = useTransform(scrollY, [0, 600], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0.25]);

  return (
    <>
      <motion.div
        className="absolute -inset-x-0 -top-16 -bottom-16"
        aria-hidden="true"
        style={{ y: parallaxY, willChange: "transform" }}
      >
        {HERO_IMAGES.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            fetchPriority={i === 0 ? "high" : "auto"}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === activeImg ? 1 : 0,
              objectPosition: img.position,
              transition: "opacity 1200ms ease-in-out",
              willChange: "opacity",
              filter: i === 0
                ? "contrast(1.05) brightness(0.72)"
                : "contrast(1.05) brightness(0.96)",
            }}
          />
        ))}
      </motion.div>
      {/* Fade overlay — parallax-synced */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#000]/55 via-[#000]/30 to-[#000]/78"
        aria-hidden="true"
        style={{ opacity: heroOpacity, willChange: "opacity" }}
      />
    </>
  );
}

// ── Static images — no scroll listener ───────────────────────────────────────
function StaticImages({ activeImg, loadedImages }: { activeImg: number; loadedImages: boolean[] }) {
  return (
    <>
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_IMAGES.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            fetchPriority={i === 0 ? "high" : "auto"}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === activeImg ? 1 : 0,
              objectPosition: img.position,
              transition: "opacity 1200ms ease-in-out",
              willChange: "opacity",
              filter: i === 0
                ? "contrast(1.05) brightness(0.72)"
                : "contrast(1.05) brightness(0.96)",
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#000]/55 via-[#000]/30 to-[#000]/78"
        aria-hidden="true"
      />
    </>
  );
}

interface HeroProps {
  t: Translations;
  onCtaClick: () => void;
}

export function Hero({ t, onCtaClick }: HeroProps) {
  const { tier, isMobile } = useDeviceTier();

  const [activeImg, setActiveImg] = useState(0);
  const [ready, setReady] = useState(false);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    HERO_IMAGES.map(() => false)
  );

  useEffect(() => {
    HERO_IMAGES.forEach((img, i) => {
      const el = new window.Image();
      el.src = img.src;
      const markLoaded = () =>
        setLoadedImages((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      if (el.complete) markLoaded();
      else el.onload = markLoaded;
    });
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  useEffect(() => {
    const delay = tier === "high" ? 7000 : 9000;
    const id = setInterval(() => setActiveImg((i) => (i + 1) % HERO_IMAGES.length), delay);
    return () => clearInterval(id);
  }, [tier]);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  const firstLoaded = loadedImages[0];

  const tx = (delay: number) => ({
    transform: ready ? "translateY(0)" : "translateY(110%)",
    opacity: ready ? 1 : 0,
    transition: `transform 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 500ms ease ${delay}ms`,
  });

  return (
    <section
      id="hero"
      data-section="hero"
      aria-label="Hero — Designers of God"
      className="relative w-full h-[100svh] md:h-screen min-h-[560px] overflow-hidden flex flex-col select-none"
    >
      {/* Loading placeholder */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(160deg,#0d0d0d 0%,#14080f 50%,#000 100%)",
          opacity: firstLoaded ? 0 : 1,
          transition: "opacity 900ms ease-in-out",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 65%, rgba(232,75,138,0.08) 0%, transparent 65%)",
            animation: firstLoaded ? "none" : "dog-pulse 2.2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Background images — parallax only on high tier */}
      {tier === "high"
        ? <ParallaxImages activeImg={activeImg} loadedImages={loadedImages} />
        : <StaticImages   activeImg={activeImg} loadedImages={loadedImages} />
      }

      {/* Side gradients */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#000]/30 via-transparent to-[#000]/30"
        aria-hidden="true"
      />

      {/* Pink glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] md:w-[640px] h-[100px] md:h-[200px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(232,75,138,0.10) 0%, transparent 70%)",
          filter: isMobile ? "blur(40px)" : "blur(110px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-16 md:pt-20 pb-6 px-6">
        <div className="flex flex-col items-center text-center max-w-[700px] mx-auto w-full">

          {/* D.O.G logo */}
          <div
            className="flex items-center justify-center mb-1 md:mb-3"
            aria-label="D.O.G"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 16vw, 7rem)",
              lineHeight: 1,
              letterSpacing: "0.18em",
            }}
          >
            {DOG_CHARS.map((char, i) => (
              <div key={i} style={{ overflow: "hidden", display: "inline-block" }}>
                <span
                  className="text-[#FFFFFF] inline-block"
                  style={{
                    ...tx(220 + i * 45),
                    textShadow: "0 4px 28px rgba(0,0,0,0.55)",
                  }}
                >
                  {char}
                </span>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div style={{ overflow: "hidden" }}>
            <span
              className="text-[#E84B8A] block mb-3 md:mb-6 inline-block"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(1rem, 4vw, 1.85rem)",
                fontStyle: "italic",
                lineHeight: 1.4,
                ...tx(480),
              }}
            >
              Designers of God
            </span>
          </div>

          {/* Separator */}
          <div
            className="h-px bg-[#FFFFFF]/20 mb-3 md:mb-6"
            style={{
              width: ready ? 44 : 0,
              transition: "width 500ms ease 580ms",
            }}
          />

          {/* H1 */}
          <div style={{ overflow: "hidden" }}>
            <h1
              className="text-[#FFFFFF] tracking-wide uppercase mb-2 md:mb-4 inline-block"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(0.85rem, 2.8vw, 1.7rem)",
                lineHeight: 1.3,
                textShadow: "0 2px 18px rgba(0,0,0,0.45)",
                ...tx(620),
              }}
            >
              {t.hero.heading}
            </h1>
          </div>

          {/* Subheading */}
          <p
            className="text-[#FFFFFF]/75 max-w-[440px] mb-5 md:mb-8 line-clamp-2 md:line-clamp-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              lineHeight: 1.85,
              fontWeight: 300,
              opacity: ready ? 1 : 0,
              transition: "opacity 700ms ease 740ms",
            }}
          >
            {t.hero.subheading}
          </p>

          {/* CTA */}
          <motion.button
            onClick={onCtaClick}
            aria-label={`${t.hero.cta} — D.O.G Designers of God`}
            whileHover={tier === "high" ? { scale: 1.04 } : undefined}
            whileTap={buttonTap}
            className="px-8 md:px-10 py-3 md:py-3.5 bg-[#E84B8A] text-[#FFFFFF] uppercase tracking-[0.25em] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] cursor-pointer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 650ms ease 860ms, transform 650ms ease 860ms",
            }}
          >
            {t.hero.cta}
          </motion.button>

          {/* Slide indicators */}
          <div
            className="flex items-center gap-2 mt-4 md:mt-6"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 500ms ease 1000ms" }}
            role="tablist"
            aria-label="Navigation slides hero"
          >
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeImg}
                aria-label={`Image ${i + 1}`}
                onClick={() => setActiveImg(i)}
                className="h-px focus-visible:outline-none cursor-pointer transition-all duration-400"
                style={{
                  width: i === activeImg ? 30 : 10,
                  backgroundColor: i === activeImg ? "#E84B8A" : "rgba(255,255,255,0.22)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-4 md:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: ready ? 0.45 : 0, transition: "opacity 700ms ease 1150ms" }}
      >
        <span
          className="text-[#FFFFFF] uppercase tracking-widest hidden md:block"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem" }}
        >
          {t.hero.scrollHint}
        </span>
        <ArrowDown size={11} className="text-[#FFFFFF] animate-[dog-bounce_2s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes dog-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @keyframes dog-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </section>
  );
}




