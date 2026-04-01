/**
 * Utility: scroll to a home-page section, accounting for the fixed navbar.
 *
 * WHY NOT getBoundingClientRect():
 *   getBoundingClientRect() returns the VISUAL position including CSS transforms
 *   on ancestor elements. During AnimatePresence enter animations (scale: 0.99,
 *   y: 16px), this gives a wrong value. We walk the offsetParent chain instead —
 *   offsetTop is layout-based and unaffected by CSS transforms.
 *
 * WHY TWO-PASS SCROLLING (handled by the caller, not here):
 *   Images that lazy-load above the target section push it down after the first
 *   scroll. The caller does an "instant" corrective scroll ~1 s later.
 */

/** Fixed navbar height in px for the current viewport. */
export function getNavHeight(): number {
  return window.innerWidth >= 768 ? 80 : 64;
}

/**
 * Walk the offsetParent chain to get an element's absolute top position
 * relative to the document. Unlike getBoundingClientRect(), this is NOT
 * affected by CSS transforms on ancestor elements.
 */
function getAbsoluteTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

/**
 * Scroll so that the section with the given id sits just below the fixed
 * navbar. Silent no-op when the element is not found.
 */
export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth"
): void {
  if (sectionId === "hero") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.getElementById(sectionId);
  if (!el) return;
  const top = Math.max(0, getAbsoluteTop(el) - getNavHeight());
  window.scrollTo({ top, behavior });
}
