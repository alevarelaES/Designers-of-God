import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import { Translations } from "../../i18n";
import { useDeviceTier } from "../../hooks/useDeviceTier";

interface StatsSectionProps {
  t: Translations;
}

// Lightweight counter — pure rAF, no MotionValues, no springs, no subscribers.
// Fires once when in view, then stops. Zero ongoing CPU cost.
function Counter({
  to,
  suffix = "",
  animate: shouldAnimate,
}: {
  to: number;
  suffix?: string;
  animate: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(shouldAnimate ? "0" : String(to));
  const started = useRef(false);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!shouldAnimate || !isInView || started.current) return;
    started.current = true;

    const duration = 900; // ms
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(String(Math.round(eased * to)));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, shouldAnimate, to]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const STAT_VALUES = [15, 5, 2];

export function StatsSection({ t }: StatsSectionProps) {
  const { tier } = useDeviceTier();
  const { contact } = t;

  const stats = contact?.stats ?? [
    { suffix: "+",    label: "Jeunes accompagnés" },
    { suffix: "",     label: "Programmes actifs" },
    { suffix: " ans", label: "D'existence" },
  ];
  const sectionTitle = contact?.sectionTitle ?? "Contact";

  const shouldAnimate = tier !== "low";

  return (
    <section id="stats" aria-label={`${sectionTitle} — Statistics`} className="bg-[#000000] py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#FFFFFF]/8 overflow-hidden">
          {stats.map(({ suffix, label }, i) => (
            <div
              key={label}
              className="bg-[#000000] flex flex-col items-center justify-center gap-2 py-10 md:py-12 px-6 text-center"
            >
              <span
                className="text-[#E84B8A]"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1 }}
              >
                <Counter to={STAT_VALUES[i]} suffix={suffix} animate={shouldAnimate} />
              </span>
              <span
                className="text-[#FFFFFF]/55 uppercase tracking-[0.15em]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", fontWeight: 400 }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




