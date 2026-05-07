export const BASE_URL = "https://www.designersog.ch";
export const OG_IMAGE  = `${BASE_URL}/og-image.jpeg`;
export const LOGO_URL  = `${BASE_URL}/favicon.jpeg`;

export const HOME_SEO = {
  FR: {
    title:       "Designers of God | D.O.G — Association Créative à Lausanne",
    description: "D.O.G est une association lausannoise qui accompagne les jeunes à travers la création, la vie ensemble et le développement personnel. Ateliers photo, design, collections et projets.",
  },
  EN: {
    title:       "Designers of God | D.O.G — Creative Association in Lausanne",
    description: "D.O.G is a Lausanne-based association supporting young people through creativity, community life and personal development. Photography workshops, design, collections and projects.",
  },
  DE: {
    title:       "Designers of God | D.O.G — Kreativer Verband in Lausanne",
    description: "D.O.G ist ein Lausanner Verein, der Jugendliche durch Kreativität, Gemeinschaftsleben und persönliche Entwicklung begleitet. Fotoworkshops, Design, Kollektionen und Projekte.",
  },
} as const;

export const LANG_TO_CODE: Record<string, string> = {
  FR: "fr",
  EN: "en",
  DE: "de",
};

export function homeHreflang() {
  return [
    { hreflang: "fr",      href: `${BASE_URL}/fr` },
    { hreflang: "en",      href: `${BASE_URL}/en` },
    { hreflang: "de",      href: `${BASE_URL}/de` },
    { hreflang: "x-default", href: `${BASE_URL}/fr` },
  ];
}

export function articleHreflang(id: string) {
  return [
    { hreflang: "fr",      href: `${BASE_URL}/fr/article/${id}` },
    { hreflang: "en",      href: `${BASE_URL}/en/article/${id}` },
    { hreflang: "de",      href: `${BASE_URL}/de/article/${id}` },
    { hreflang: "x-default", href: `${BASE_URL}/fr/article/${id}` },
  ];
}

export function parseArticleDate(dateStr: string): string {
  const [day, month, year] = dateStr.split(".");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
