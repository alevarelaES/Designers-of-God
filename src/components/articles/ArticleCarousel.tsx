import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Translations } from "../../i18n";
import { ArticleCard } from "../articles/ArticleCard";
import { useDeviceTier } from "../../hooks/useDeviceTier";

interface ArticleCarouselProps {
  t: Translations;
  startIndex?: number;
  count?: number;
}

function normalize(val: number, totalWidth: number): number {
  if (!totalWidth) return 0;
  let n = val % totalWidth;
  if (n > 0) n -= totalWidth;
  return n;
}

function teleportAnimate(
  x: ReturnType<typeof useMotionValue<number>>,
  target: number,
  totalWidth: number,
  options: Parameters<typeof animate>[2]
): ReturnType<typeof animate> {
  let from = x.get();
  if (target > 0) { from -= totalWidth; target -= totalWidth; x.set(from); }
  else if (target < -totalWidth) { from += totalWidth; target += totalWidth; x.set(from); }
  return animate(x, target, options);
}

const FLYWHEEL_EASE = [0.08, 0.82, 0.17, 1.0] as const;

export function ArticleCarousel({ t, startIndex = 3, count = 4 }: ArticleCarouselProps) {
  const { tier, isTouch } = useDeviceTier();

  const x            = useMotionValue(0);
  const [cardWidth, setCardWidth] = useState(0);
  const isAutoRef    = useRef(true);
  const lastTimeRef  = useRef<number | null>(null);
  const manualAnim   = useRef<ReturnType<typeof animate> | null>(null);
  const resumeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef(false); // ← new: only animate when in viewport
  const containerRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  const trackRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);

  // ── IntersectionObserver: pause rAF when scrolled out of view ─────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Card width ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const gap = 24;
      const w =
        window.innerWidth >= 1024 ? 320 :
        window.innerWidth >= 640  ? 300 : 260;
      const cw = w + gap;
      setCardWidth(cw);
      cardWidthRef.current = cw;
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Auto-scroll rAF — only ticks when carousel is visible ─────────────────
  useEffect(() => {
    if (!cardWidth || tier === "low") return; // low tier: no auto-scroll
    const totalWidth = cardWidth * count;
    // Slower speed on medium saves CPU
    const speed = totalWidth / (tier === "high" ? 30 : 50);

    let raf: number;
    const tick = (ts: number) => {
      // Skip computation entirely when out of viewport
      if (!isVisibleRef.current) {
        lastTimeRef.current = null;
        raf = requestAnimationFrame(tick);
        return;
      }
      if (isAutoRef.current && !hoveredRef.current) {
        if (lastTimeRef.current === null) lastTimeRef.current = ts;
        const dt = Math.min((ts - lastTimeRef.current) / 1000, 0.05); // cap dt at 50ms
        lastTimeRef.current = ts;
        let cur = x.get() - speed * dt;
        if (cur <= -totalWidth) cur += totalWidth;
        x.set(cur);
      } else {
        lastTimeRef.current = null;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cardWidth, count, x, tier]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const pauseAuto = useCallback(() => {
    isAutoRef.current = false;
    lastTimeRef.current = null;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    if (manualAnim.current) { manualAnim.current.stop(); manualAnim.current = null; }
  }, []);

  const resumeAuto = useCallback((delay = 2500) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isAutoRef.current = true;
      lastTimeRef.current = null;
    }, delay);
  }, []);

  // ── Arrow buttons ──────────────────────────────────────────────────────────
  const scrollBy = useCallback((dir: "left" | "right") => {
    if (!cardWidthRef.current) return;
    pauseAuto();
    const totalWidth = cardWidthRef.current * count;
    const amount = cardWidthRef.current * 1.5;
    const target = dir === "left" ? x.get() + amount : x.get() - amount;
    manualAnim.current = teleportAnimate(x, target, totalWidth, {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    });
    resumeAuto(3000);
  }, [count, x, pauseAuto, resumeAuto]);

  // ── Native touch listeners ─────────────────────────────────────────────────
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let startX = 0, startY = 0, prevX = 0;
    let direction: "h" | "v" | null = null;
    const velBuf: Array<{ x: number; t: number }> = [];

    const onStart = (e: TouchEvent) => {
      const t0 = e.touches[0];
      startX = prevX = t0.clientX;
      startY = t0.clientY;
      direction = null;
      velBuf.length = 0;
      velBuf.push({ x: t0.clientX, t: performance.now() });
      pauseAuto();
    };

    const onMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const cx = e.touches[0].clientX;
      const cy = e.touches[0].clientY;
      if (!direction) {
        const adx = Math.abs(cx - startX);
        const ady = Math.abs(cy - startY);
        if (adx > 7 || ady > 7) direction = adx >= ady ? "h" : "v";
        if (!direction) return;
      }
      if (direction === "h") {
        e.preventDefault();
        x.set(x.get() + (cx - prevX));
        const now = performance.now();
        velBuf.push({ x: cx, t: now });
        while (velBuf.length > 1 && velBuf[0].t < now - 130) velBuf.shift();
      }
      prevX = cx;
    };

    const onEnd = () => {
      const cw = cardWidthRef.current;
      if (!cw || direction !== "h") { resumeAuto(600); return; }
      const totalWidth = cw * count;
      const normCurrent = normalize(x.get(), totalWidth);
      x.set(normCurrent);
      let velocity = 0;
      if (velBuf.length >= 2) {
        const first = velBuf[0], last = velBuf[velBuf.length - 1];
        const dt = last.t - first.t;
        if (dt > 0) velocity = (last.x - first.x) / dt;
      }
      const cappedVel = Math.sign(velocity) * Math.min(Math.abs(velocity), 3);
      const momentum  = Math.sign(cappedVel) * Math.min(Math.abs(cappedVel * 900), 2000);
      if (Math.abs(momentum) < 25) { resumeAuto(800); return; }
      const duration = Math.min(1.6, Math.max(0.45, Math.abs(momentum) / 1400));
      manualAnim.current = teleportAnimate(x, normCurrent + momentum, totalWidth, {
        duration,
        ease: FLYWHEEL_EASE,
      });
      resumeAuto(duration * 1000 + 500);
    };

    el.addEventListener("touchstart",  onStart, { passive: true });
    el.addEventListener("touchmove",   onMove,  { passive: false });
    el.addEventListener("touchend",    onEnd,   { passive: true });
    el.addEventListener("touchcancel", onEnd,   { passive: true });
    return () => {
      el.removeEventListener("touchstart",  onStart);
      el.removeEventListener("touchmove",   onMove);
      el.removeEventListener("touchend",    onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [count, x, pauseAuto, resumeAuto]);

  // ── DOM: 2 copies for seamless loop (was 3 — saved 33% of card renders) ───
  const indices   = Array.from({ length: count * 2 }, (_, i) => startIndex + (i % count));
  const cardStyle = { width: cardWidth - 24 };

  // Low tier: static grid, no carousel
  if (tier === "low") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }, (_, i) => (
          <ArticleCard
            key={startIndex + i}
            index={startIndex + i}
            t={t}
            variant="small"
            animationDelay={0}
            inCarousel
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden select-none">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-14 md:w-24 bg-gradient-to-r from-[#000] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-14 md:w-24 bg-gradient-to-l from-[#000] to-transparent z-10 pointer-events-none" />

      {/* Arrow — previous */}
      <button
        onClick={() => scrollBy("left")}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 bg-[#000]/80 border border-[#E84B8A]/30 flex items-center justify-center hover:bg-[#E84B8A]/10 hover:border-[#E84B8A] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A]"
        aria-label="Articles précédents"
      >
        <ChevronLeft size={15} className="text-[#E84B8A]" />
      </button>

      {/* Arrow — next */}
      <button
        onClick={() => scrollBy("right")}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 bg-[#000]/80 border border-[#3BA9D9]/30 flex items-center justify-center hover:bg-[#3BA9D9]/10 hover:border-[#3BA9D9] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA9D9]"
        aria-label="Articles suivants"
      >
        <ChevronRight size={15} className="text-[#3BA9D9]" />
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="py-4"
        style={{ touchAction: "pan-y" }}
        onMouseEnter={() => { if (!isTouch) { setHovered(true);  hoveredRef.current = true;  } }}
        onMouseLeave={() => { if (!isTouch) { setHovered(false); hoveredRef.current = false; } }}
      >
        <motion.div
          className="flex gap-6"
          style={{ x, willChange: "transform" }}
          aria-label="Carrousel d'articles"
        >
          {indices.map((articleIndex, i) => (
            <div
              key={`${articleIndex}-${i}`}
              className="flex-shrink-0"
              style={cardStyle}
            >
              <ArticleCard
                index={articleIndex}
                t={t}
                variant="small"
                animationDelay={0}
                inCarousel
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}





