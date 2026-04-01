import { useMemo } from "react";

export type DeviceTier = "high" | "medium" | "low";

export interface DeviceInfo {
  tier: DeviceTier;
  /** User prefers reduced motion */
  reduced: boolean;
  /** Touch-capable device */
  isTouch: boolean;
  /** Viewport width < 768px */
  isMobile: boolean;
  /** Viewport width < 1024px */
  isTablet: boolean;
}

/**
 * Detects device capability once on mount.
 * Returns a stable object — safe to destructure at top of any component.
 *
 * Tier rules:
 *  low    → prefers-reduced-motion OR (mobile + low RAM / cores)
 *  medium → mobile/tablet without low specs
 *  high   → desktop or high-spec device
 */
export function useDeviceTier(): DeviceInfo {
  return useMemo<DeviceInfo>(() => {
    if (typeof window === "undefined") {
      return { tier: "high", reduced: false, isTouch: false, isMobile: false, isTablet: false };
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const isTouch = navigator.maxTouchPoints > 0;

    // Chrome/Edge expose deviceMemory (in GB); default to a generous value on unknown browsers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const memory: number = (navigator as any).deviceMemory ?? 8;
    const cores: number = navigator.hardwareConcurrency ?? 8;

    let tier: DeviceTier;
    if (reduced) {
      tier = "low";
    } else if (isMobile && (memory <= 2 || cores <= 2)) {
      // Low-end phone
      tier = "low";
    } else if (isMobile || isTablet) {
      // Normal phone / tablet
      tier = "medium";
    } else {
      // Desktop — still check hardware (catches old PCs)
      if (memory <= 2 || cores <= 2) {
        tier = "low";
      } else if (memory <= 4 || cores <= 4) {
        tier = "medium";
      } else {
        tier = "high";
      }
    }

    return { tier, reduced, isTouch, isMobile, isTablet };
  }, []);
}