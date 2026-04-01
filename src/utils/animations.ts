/**
 * Global animation constants for D.O.G website
 * Tier-aware: adapts to device capability detected by useDeviceTier
 */
import type { DeviceTier } from "../hooks/useDeviceTier";

// ── Easing curves ──
export const EASINGS = {
  smooth:  [0.22, 1, 0.36, 1] as const,
  snappy:  [0.34, 1.56, 0.64, 1] as const,
  bouncy:  [0.68, -0.55, 0.265, 1.55] as const,
  sharp:   [0.4, 0, 0.2, 1] as const,
};

// ── Durations (ms) ──
export const DURATIONS = {
  instant: 150,
  fast:    250,
  normal:  450,
  medium:  650,
  slow:    850,
};

// ── Stagger delays ──
export const STAGGER = {
  card: 0.07,
  item: 0.05,
  menu: 0.06,
  text: 0.03,
};

// ── Viewport margins for scroll triggers ──
export const VIEWPORT_MARGINS = {
  tight:  "-20px",
  normal: "-60px",
  loose:  "-100px",
};

// ── Page transition variants ──
export const pageTransition = {
  initial: { opacity: 0, y: 16, scale: 0.99 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: DURATIONS.medium / 1000, ease: EASINGS.smooth },
  },
  exit: {
    opacity: 0, y: -8, scale: 1.01,
    transition: { duration: DURATIONS.fast / 1000, ease: EASINGS.sharp },
  },
};

// ── Base fade-in (used by scrollReveal internally) ──
export const fadeInUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: VIEWPORT_MARGINS.normal },
  style:       { willChange: "transform, opacity" },
  transition:  { duration: DURATIONS.medium / 1000, delay, ease: EASINGS.smooth },
});

export const scaleIn = (delay = 0) => ({
  initial:     { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport:    { once: true, margin: VIEWPORT_MARGINS.normal },
  style:       { willChange: "transform, opacity" },
  transition:  { duration: DURATIONS.normal / 1000, delay, ease: EASINGS.smooth },
});

export const slideInLeft = (delay = 0) => ({
  initial:     { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    { once: true, margin: VIEWPORT_MARGINS.normal },
  style:       { willChange: "transform, opacity" },
  transition:  { duration: DURATIONS.normal / 1000, delay, ease: EASINGS.smooth },
});

export const slideInRight = (delay = 0) => ({
  initial:     { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    { once: true, margin: VIEWPORT_MARGINS.normal },
  style:       { willChange: "transform, opacity" },
  transition:  { duration: DURATIONS.normal / 1000, delay, ease: EASINGS.smooth },
});

// ── Button hover states ──
export const buttonHover = {
  scale: 1.04,
  transition: { duration: DURATIONS.fast / 1000, ease: EASINGS.snappy },
};
export const buttonTap = { scale: 0.96 };

// ── Card hover (desktop only) ──
export const cardHover = {
  rest:  { y: 0, scale: 1 },
  hover: {
    y: -10, scale: 1.015,
    transition: { duration: DURATIONS.fast / 1000, ease: EASINGS.snappy },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// TIER-AWARE HELPERS
// Returns motion props that are appropriate for the device capability tier.
// Pass `{}` for low-tier so the element renders immediately without animation.
// ─────────────────────────────────────────────────────────────────────────────

/** Scroll-triggered fade-up, simplified for lower tiers. */
export function scrollReveal(tier: DeviceTier, delay = 0) {
  if (tier === "low") {
    // Content visible immediately — no scroll jank risk
    return {};
  }
  if (tier === "medium") {
    // Simple opacity fade only — no y transform (avoids paint cost)
    return {
      initial:     { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport:    { once: true, margin: VIEWPORT_MARGINS.tight },
      style:       { willChange: "opacity" },
      transition:  { duration: 0.45, delay: Math.min(delay, 0.15) },
    };
  }
  return fadeInUp(delay);
}

/** Slide-in from left, simplified for lower tiers. */
export function scrollSlideLeft(tier: DeviceTier, delay = 0) {
  if (tier === "low") return {};
  if (tier === "medium") return scrollReveal("medium", delay);
  return slideInLeft(delay);
}

/** Scale-in, simplified for lower tiers. */
export function scrollScale(tier: DeviceTier, delay = 0) {
  if (tier === "low") return {};
  if (tier === "medium") return scrollReveal("medium", delay);
  return scaleIn(delay);
}

/** Card hover: only on desktop (high tier) — touch has no hover state. */
export function cardHoverProps(tier: DeviceTier) {
  if (tier !== "high") return {};
  return {
    whileHover: { y: -10, scale: 1.015 },
    transition: { duration: DURATIONS.fast / 1000, ease: EASINGS.snappy },
  };
}

/** Button hover: only on non-touch devices. */
export function btnHoverProps(tier: DeviceTier) {
  if (tier === "low") return { whileTap: buttonTap };
  return { whileHover: buttonHover, whileTap: buttonTap };
}


