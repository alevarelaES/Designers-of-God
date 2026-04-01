import { useRef, useEffect, useCallback } from "react";
import { Film, Camera, Pen, Mic, Music, UserCircle, Users } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useDeviceTier } from "../../hooks/useDeviceTier";

const ICONS = [Film, Camera, Pen, Mic, Music, UserCircle, Users];

const LOOP_FRACTION = 1 / 7;
const AUTO_SPEED = 0.55; // px per frame at 60fps

export function MarqueeTicker() {
  const { t } = useLanguage();
  const { tier } = useDeviceTier();

  const labels: string[] = t.footer?.programList ?? [
    "Série Originale",
    "Ateliers Photo",
    "Design & Brand",
    "Podcasts",
    "Musique",
    "Développement Personnel",
    "Vie Ensemble",
  ];

  const ITEMS = labels.map((label, i) => ({ icon: ICONS[i] ?? UserCircle, label }));
  const REPEATED = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);

  const offsetRef       = useRef(0);
  const rafRef          = useRef<number>(0);
  const isDragging      = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartOffset = useRef(0);
  const velocityRef     = useRef(0);
  const prevClientX     = useRef(0);
  const tileWidth       = useRef(0);
  const isVisibleRef    = useRef(false); // only animate when in viewport

  // Throttle: skip every other frame on medium tier (≈30fps)
  const frameSkipRef = useRef(0);
  const skipFrames = tier === "medium" ? 1 : 0;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => { tileWidth.current = track.scrollWidth * LOOP_FRACTION; };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // IntersectionObserver — pause rAF when scrolled out of view
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

  const normalise = (v: number) => {
    const t = tileWidth.current;
    if (!t) return v;
    let n = v % t;
    if (n > 0) n -= t;
    return n;
  };

  useEffect(() => {
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);

      // Skip frames on medium tier (30fps-ish)
      if (skipFrames > 0) {
        frameSkipRef.current = (frameSkipRef.current + 1) % (skipFrames + 1);
        if (frameSkipRef.current !== 0) return;
      }

      // Do nothing when out of viewport
      if (!isVisibleRef.current) {
        velocityRef.current = -AUTO_SPEED; // reset so it restarts smoothly
        return;
      }

      if (!isDragging.current) {
        velocityRef.current =
          velocityRef.current * 0.94 + (-AUTO_SPEED) * (1 - 0.94);
        offsetRef.current = normalise(offsetRef.current + velocityRef.current);
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
    };
    velocityRef.current = -AUTO_SPEED;
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [skipFrames]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    prevClientX.current = e.clientX;
    velocityRef.current = 0;
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    velocityRef.current = e.clientX - prevClientX.current;
    prevClientX.current = e.clientX;
    const delta = e.clientX - dragStartX.current;
    offsetRef.current = normalise(dragStartOffset.current + delta);
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-[#000000] border-y border-[#FFFFFF]/8 py-3.5 cursor-grab active:cursor-grabbing select-none"
      aria-label="Programmes D.O.G"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#000000] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#000000] to-transparent" />
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap will-change-transform"
        style={{ userSelect: "none" }}
      >
        {REPEATED.map(({ icon: Icon, label }, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 mx-8"
            aria-hidden={i >= ITEMS.length}
          >
            <Icon size={12} className="text-[#E84B8A] shrink-0" />
            <span
              className="text-[#FFFFFF]/70 uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 500 }}
            >
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}



