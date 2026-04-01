import { motion } from "motion/react";
import { Translations } from "../../i18n";
import { Film, Camera, Pen, Mic, Music, UserCircle, Users, Instagram, Youtube, Mail, MapPin } from "lucide-react";

interface FooterProps {
  t: Translations;
}

// 7 icons matching the 7 programList items:
// Série originale → Film
// Ateliers photo → Camera
// Design & Brand → Pen
// Podcasts → Mic
// Musique → Music
// Développement personnel → UserCircle
// Vie ensemble → Users
const PROGRAM_ICONS = [Film, Camera, Pen, Mic, Music, UserCircle, Users];

const SOCIAL_CONFIGS = [
  { label: "Instagram", handle: "@designers.of.god", href: "https://www.instagram.com/designers.of.god/", icon: Instagram, color: "#E84B8A", comingSoon: false },
  { label: "YouTube",   handle: "Ça arrive bientôt", href: null,                                          icon: Youtube,   color: "#3BA9D9", comingSoon: true  },
];

export function Footer({ t }: FooterProps) {
  const { footer } = t;

  const programList: string[] = footer.programList ?? [];
  const association: string = footer.association ?? "Association";
  const programs: string = footer.programs ?? "Programs";
  const follow: string = footer.follow ?? "Follow";

  return (
    <footer role="contentinfo" className="bg-[#000000] overflow-hidden">

      {/* ── Editorial top banner ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-10 pb-7 border-b border-[#FFFFFF]/8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Big logotype */}
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-[#FFFFFF] tracking-[0.12em] select-none"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", lineHeight: 1 }}
            >
              D.O.G
            </span>
            <span
              className="text-[#E84B8A] select-none"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1rem, 3vw, 1.5rem)", fontStyle: "italic", lineHeight: 1.3 }}
            >
              Designers of God
            </span>
            <span
              className="text-[#FFFFFF]/25 uppercase tracking-[0.25em]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 400, marginTop: "4px" }}
            >
              Lausanne, CH — depuis 2026
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="flex flex-col gap-2 md:items-end"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[#FFFFFF]/55 max-w-[340px] md:text-right"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.85, fontWeight: 300 }}
            >
              {footer.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main three-column content ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8 grid grid-cols-1 md:grid-cols-[1.2fr_1.5fr_1.2fr] gap-10 md:gap-8 lg:gap-16 border-b border-[#FFFFFF]/8">

        {/* Col 1 — Infos */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[#E84B8A] uppercase tracking-[0.28em] text-center"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
          >
            {association}
          </p>
          <div className="flex flex-col gap-3.5">
            <div className="flex items-start gap-3">
              <MapPin size={13} className="text-[#3BA9D9] shrink-0 mt-0.5" />
              <span
                className="text-[#FFFFFF]/45"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.7 }}
              >
                Lausanne, CH
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={13} className="text-[#3BA9D9] shrink-0 mt-0.5" />
              <a
                href="mailto:info@designersog.ch"
                className="text-[#FFFFFF]/65 hover:text-[#FFFFFF] transition-colors duration-200 break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.7 }}
              >
                info@designersog.ch
              </a>
            </div>
          </div>
        </motion.div>

        {/* Col 2 — Programmes */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[#E84B8A] uppercase tracking-[0.28em] text-center"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
          >
            {programs}
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-2.5" role="list">
            {programList.map((label, i) => {
              const Icon = PROGRAM_ICONS[i] ?? Users;
              return (
                <motion.li
                  key={label}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.03, duration: 0.4 }}
                >
                  <Icon size={11} className="text-[#E84B8A] shrink-0" aria-hidden="true" />
                  <span
                    className="text-[#FFFFFF]/55"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 300 }}
                  >
                    {label}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* Col 3 — Réseaux */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[#E84B8A] uppercase tracking-[0.28em] text-center"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
          >
            {follow}
          </p>
          <div className="flex flex-col gap-3">
            {SOCIAL_CONFIGS.map(({ label, handle, href, icon: Icon, color, comingSoon }, i) => (
              comingSoon ? (
                <motion.div
                  key={label}
                  className="flex items-center gap-3 py-2.5 px-3 border border-[#FFFFFF]/5 opacity-50 cursor-default select-none"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 0.5, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center shrink-0"
                    style={{ border: `1px solid ${color}18`, background: `${color}06` }}
                  >
                    <Icon size={15} style={{ color: `${color}60` }} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-[#FFFFFF]/40"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.04em" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-[#FFFFFF]/25 italic"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 300 }}
                    >
                      {handle}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.a
                  key={label}
                  href={href!}
                  aria-label={`D.O.G — ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 py-2.5 px-3 border border-[#FFFFFF]/8 hover:border-[#FFFFFF]/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A]"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                  whileHover={{ x: 3 }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{ border: `1px solid ${color}30`, background: `${color}10` }}
                  >
                    <Icon size={15} style={{ color }} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-[#FFFFFF]/85 group-hover:text-[#FFFFFF] transition-colors duration-200"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.04em" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-[#FFFFFF]/45"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 300 }}
                    >
                      {handle}
                    </span>
                  </div>
                </motion.a>
              )
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        className="max-w-[1280px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p
          className="text-[#FFFFFF]/35 text-center md:text-left"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.08em" }}
        >
          © {new Date().getFullYear()} D.O.G — Designers of God. {footer.rights}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-px bg-[#3BA9D9]/30" />
          <p
            className="text-[#FFFFFF]/30"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.06em" }}
          >
            <span style={{ color: "rgba(59,169,217,0.4)" }}>Lausanne</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>, CH</span>
          </p>
          <div className="w-3 h-px bg-[#E84B8A]/30" />
        </div>
      </motion.div>

    </footer>
  );
}
