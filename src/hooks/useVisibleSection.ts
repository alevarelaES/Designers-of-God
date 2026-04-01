import { useState, useEffect, useCallback } from "react";

/**
 * Detects which section is currently visible in the viewport.
 * Pass `pathname` (from useLocation) so the observer re-attaches
 * whenever the route changes and new section elements enter the DOM.
 */
export function useVisibleSection(pathname?: string) {
  const [visibleSection, setVisibleSection] = useState<string>("hero");

  const updateSection = useCallback((id: string) => {
    setVisibleSection(id);
  }, []);

  useEffect(() => {
    // Short delay so AnimatePresence has time to mount the new page's sections
    const setup = () => {
      const sectionDefs = [
        { query: () => document.querySelector("section[data-section='hero']") as Element | null },
        { query: () => document.getElementById("about") },
        { query: () => document.getElementById("stats") },
        { query: () => document.getElementById("news") },
        { query: () => document.getElementById("contact") },
      ];

      const observer = new IntersectionObserver(
        (entries) => {
          let maxRatio = 0;
          let maxSection = "";

          entries.forEach((entry) => {
            if (entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              const id =
                entry.target.getAttribute("data-section") || entry.target.id;
              if (id) maxSection = id;
            }
          });

          if (maxRatio > 0 && maxSection) {
            updateSection(maxSection);
          }
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      sectionDefs.forEach(({ query }) => {
        const el = query();
        if (el) observer.observe(el);
      });

      return observer;
    };

    // Try immediately first (covers same-page language switch where Home is
    // still in the DOM during AnimatePresence exit animation)
    let observer = setup();
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    // If no sections were observed yet (navigated to a new page like ArticleDetail),
    // retry after the exit animation completes (~500ms)
    const attached = [
      document.querySelector("section[data-section='hero']"),
      document.getElementById("about"),
    ].some(Boolean);

    if (!attached) {
      retryTimer = setTimeout(() => {
        observer.disconnect();
        observer = setup();
      }, 520);
    }

    return () => {
      observer.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [pathname, updateSection]); // re-attach when route changes

  return visibleSection;
}