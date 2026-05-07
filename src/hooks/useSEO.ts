import { useEffect } from "react";

interface HreflangEntry {
  hreflang: string;
  href: string;
}

interface SEOConfig {
  title: string;
  description: string;
  lang: string;
  canonical: string;
  ogImage?: string;
  hreflang?: HreflangEntry[];
  jsonLD?: object;
}

export function useSEO({ title, description, lang, canonical, ogImage, hreflang, jsonLD }: SEOConfig) {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;

    setMeta("name",     "description",         description);
    setMeta("property", "og:title",            title);
    setMeta("property", "og:description",      description);
    setMeta("property", "og:url",              canonical);
    setMeta("property", "twitter:title",       title);
    setMeta("property", "twitter:description", description);
    setMeta("property", "twitter:url",         canonical);

    if (ogImage) {
      setMeta("property", "og:image",      ogImage);
      setMeta("property", "twitter:image", ogImage);
    }

    setCanonical(canonical);
    if (hreflang) setHreflang(hreflang);
    if (jsonLD)   setPageJsonLD(jsonLD);
  }, [title, description, lang, canonical, ogImage]);
}

function setMeta(attr: string, name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setHreflang(links: HreflangEntry[]) {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  links.forEach(({ hreflang, href }) => {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  });
}

function setPageJsonLD(data: object) {
  document.querySelector('script[type="application/ld+json"][data-page]')?.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-page", "true");
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
