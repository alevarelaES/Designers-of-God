import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Instagram, Youtube, Send, ArrowUpRight } from "lucide-react";
import { Translations } from "../../i18n";
import { useDeviceTier } from "../../hooks/useDeviceTier";

interface ContactSectionProps {
  t: Translations;
}

const CONTACT_INFO = [
  { icon: MapPin,    text: "Lausanne, CH" },
  { icon: Mail,      text: "info@designersog.ch", href: "mailto:info@designersog.ch" },
  { icon: Instagram, text: "@designers.of.god",   href: "https://www.instagram.com/designers.of.god/" },
];

const SOCIALS = [
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/designers.of.god/", comingSoon: false },
  { label: "YouTube",   icon: Youtube,   href: null,                                           comingSoon: true  },
];

export function ContactSection({ t }: ContactSectionProps) {
  const { tier } = useDeviceTier();
  const { contact } = t;

  const sectionTitle = contact?.sectionTitle ?? "Contact";
  const writeUs      = contact?.writeUs      ?? "Écris-nous";
  const heading      = contact?.heading      ?? "Parlons ensemble";
  const subtext      = contact?.subtext      ?? "";
  const formTitle    = contact?.formTitle    ?? "Envoyer un message";
  const labelName    = contact?.labelName    ?? "Nom complet";
  const labelEmail   = contact?.labelEmail   ?? "Adresse email";
  const labelSubject = contact?.labelSubject ?? "Sujet";
  const labelMessage = contact?.labelMessage ?? "Message";
  const phName       = contact?.placeholderName    ?? "Votre nom";
  const phSubject    = contact?.placeholderSubject ?? "Atelier, collab, question...";
  const phMessage    = contact?.placeholderMessage ?? "Votre message...";
  const submitLabel  = contact?.submit ?? "Envoyer";
  const sentLabel    = contact?.sent   ?? "Message envoyé ✓";
  const thanksLabel  = contact?.thanks ?? "Merci !";
  const socialsLabel = contact?.socials ?? "Réseaux sociaux";

  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      // Configuration d'envoi de mail (Web3Forms / Formspree)
      // Remplacez "YOUR_ACCESS_KEY_HERE" par une clé obtenue sur https://web3forms.com/
      // Ou utilisez une autre API d'envoi.
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", // <-- INSERER LA CLÉ ICI
          name: form.nom,
          email: form.email,
          subject: form.sujet,
          message: form.message,
          from_name: "Designers of God Formulaire",
        }),
      });

      if (response.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 6000);
        setForm({ nom: "", email: "", sujet: "", message: "" });
      } else {
        // En cas d'erreur de clé, au lieu de bloquer, 
        // on déclenche le client mail classique par défaut (fallback)
        triggerMailto();
      }
    } catch (err) {
      triggerMailto();
    } finally {
      setLoading(false);
    }
  };

  const triggerMailto = () => {
    const mailtoLink = `mailto:info@designersog.ch?subject=${encodeURIComponent(form.sujet || "Contact depuis le site")}&body=${encodeURIComponent(form.message + "\n\n---\nDe: " + form.nom + " (" + form.email + ")")}`;
    window.location.href = mailtoLink;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ nom: "", email: "", sujet: "", message: "" });
  };

  // ── Tier-aware animation presets ──────────────────────────────────────────
  // low:    no animations at all
  // medium: single block fade-in, no per-element stagger
  // high:   full animations as designed
  const blockReveal = tier === "low" ? {} : {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: tier === "medium" ? 0.4 : 0.8 },
  };

  const slideReveal = (delay = 0, dir: "left" | "right" | "up" = "up") => {
    if (tier === "low") return {};
    if (tier === "medium") return blockReveal;
    const axis = dir === "left" ? { x: -32 } : dir === "right" ? { x: 32 } : { y: 18 };
    return {
      initial: { opacity: 0, ...axis },
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport: { once: true, margin: "-60px" } as const,
      transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
    };
  };

  return (
    <section id="contact" aria-label={contact.sectionTitle} className="bg-[#000000]">

      {/* ── Section identifier ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-8 md:pt-10">
        <div className="flex items-center gap-4 mb-2">
          <span
            className="text-[#FFFFFF]/25 uppercase tracking-[0.5em] select-none shrink-0"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
          >
            {sectionTitle}
          </span>
          <div className="flex-1 h-px bg-[#FFFFFF]/12" />
          <span
            className="text-[#E84B8A] uppercase tracking-[0.3em] shrink-0"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
          >
            D.O.G
          </span>
        </div>
      </div>

      {/* ── Contact Area ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-6 md:py-8 pb-8 md:pb-12">

        {/* Top heading */}
        <motion.div className="flex flex-col gap-3 mb-6 md:mb-8" {...blockReveal}>
          <div className="flex items-center gap-4">
            <div className="h-px bg-[#E84B8A]" style={{ width: 40 }} />
            <span
              className="text-[#E84B8A] uppercase tracking-[0.35em]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 500 }}
            >
              {writeUs}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  {...(tier === "high" ? {
                    initial: { y: "108%" },
                    whileInView: { y: 0 },
                    viewport: { once: true, margin: "-60px" },
                    transition: { duration: 0.82, delay: 0.05, ease: [0.22, 1, 0.36, 1] },
                  } : {})}
                >
                  <h2
                    className="text-[#FFFFFF] uppercase tracking-widest"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1 }}
                  >
                    {heading}
                  </h2>
                </motion.div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  {...(tier === "high" ? {
                    initial: { y: "108%" },
                    whileInView: { y: 0 },
                    viewport: { once: true, margin: "-60px" },
                    transition: { duration: 0.82, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
                  } : {})}
                >
                  <span
                    className="text-[#3BA9D9]"
                    style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1rem, 3vw, 1.5rem)", fontStyle: "italic" }}
                  >
                    Designers of God
                  </span>
                </motion.div>
              </div>
            </div>

            <p
              className="text-[#FFFFFF]/60 max-w-[380px]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.95, fontWeight: 300 }}
            >
              {subtext}
            </p>
          </div>

          <div className="w-full h-px bg-[#FFFFFF]/8 mt-2" />
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 md:gap-12">

          {/* Left — Contact info + socials */}
          <motion.div className="flex flex-col gap-10" {...slideReveal(0, "left")}>
            {/* Contact details */}
            <ul className="flex flex-col gap-0" role="list">
              {CONTACT_INFO.map(({ icon: Icon, text, href }) => (
                <li
                  key={text}
                  className="flex items-center gap-5 group py-5 border-b border-[#FFFFFF]/6"
                >
                  <div className="w-10 h-10 border border-[#FFFFFF]/12 flex items-center justify-center shrink-0 group-hover:border-[#E84B8A]/50 group-hover:bg-[#E84B8A]/5 transition-all duration-300">
                    <Icon size={14} className="text-[#E84B8A]" aria-hidden="true" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-[#FFFFFF]/75 hover:text-[#FFFFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A]"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 300 }}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {text}
                    </a>
                  ) : (
                    <span
                      className="text-[#FFFFFF]/75"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 300 }}
                    >
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex flex-col gap-5">
              <span
                className="text-[#FFFFFF]/22 uppercase tracking-[0.25em]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
              >
                {socialsLabel}
              </span>
              <div className="flex items-center gap-4">
                {SOCIALS.map(({ label, icon: Icon, href, comingSoon }) => (
                  comingSoon ? (
                    <div
                      key={label}
                      className="inline-flex items-center gap-3 px-5 py-3 border border-[#FFFFFF]/5 opacity-40 cursor-default select-none"
                      aria-label={`${label} — bientôt disponible`}
                    >
                      <Icon size={14} className="text-[#3BA9D9]/50" aria-hidden="true" />
                      <span
                        className="text-[#FFFFFF]/40 italic"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.08em" }}
                      >
                        Ça arrive
                      </span>
                    </div>
                  ) : (
                    <a
                      key={label}
                      href={href!}
                      aria-label={`D.O.G — ${label}`}
                      className="inline-flex items-center gap-3 px-5 py-3 border border-[#FFFFFF]/10 hover:border-[#3BA9D9]/40 hover:bg-[#3BA9D9]/5 transition-all duration-300 focus-visible:outline-none group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={14} className="text-[#3BA9D9]" aria-hidden="true" />
                      <span
                        className="text-[#FFFFFF]/60 group-hover:text-[#FFFFFF]/85 transition-colors duration-300"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.08em" }}
                      >
                        {label}
                      </span>
                      <ArrowUpRight size={10} className="text-[#FFFFFF]/20 group-hover:text-[#3BA9D9] transition-colors duration-300" />
                    </a>
                  )
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div {...slideReveal(tier === "high" ? 0.1 : 0, "right")}>
            <form
              onSubmit={handleSubmit}
              aria-label={contact.formTitle}
              className="relative flex flex-col gap-0 border border-[#FFFFFF]/8 p-8 md:p-10"
              noValidate
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#E84B8A]/50 pointer-events-none" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#E84B8A]/50 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#3BA9D9]/50 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#3BA9D9]/50 pointer-events-none" />

              {/* Form title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-6 bg-[#E84B8A]" />
                <span
                  className="text-[#FFFFFF]/50 uppercase tracking-[0.25em]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 500 }}
                >
                  {formTitle}
                </span>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-0">
                  <label
                    htmlFor="c-nom"
                    className={`uppercase tracking-[0.22em] mb-3 transition-colors duration-300 ${focused === "nom" ? "text-[#E84B8A]" : "text-[#FFFFFF]/60"}`}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
                  >
                    {labelName}
                  </label>
                  <input
                    id="c-nom"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.nom}
                    onChange={(e) => setForm((s) => ({ ...s, nom: e.target.value }))}
                    onFocus={() => setFocused("nom")}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-b border-[#FFFFFF]/15 text-[#FFFFFF] py-3 text-sm outline-none focus:border-[#E84B8A] transition-colors duration-300 placeholder:text-[#FFFFFF]/20"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                    placeholder={phName}
                  />
                </div>

                <div className="flex flex-col gap-0">
                  <label
                    htmlFor="c-email"
                    className={`uppercase tracking-[0.22em] mb-3 transition-colors duration-300 ${focused === "email" ? "text-[#E84B8A]" : "text-[#FFFFFF]/60"}`}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
                  >
                    {labelEmail}
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-b border-[#FFFFFF]/15 text-[#FFFFFF] py-3 text-sm outline-none focus:border-[#E84B8A] transition-colors duration-300 placeholder:text-[#FFFFFF]/20"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-0 mb-6">
                <label
                  htmlFor="c-sujet"
                  className={`uppercase tracking-[0.22em] mb-3 transition-colors duration-300 ${focused === "sujet" ? "text-[#E84B8A]" : "text-[#FFFFFF]/60"}`}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
                >
                  {labelSubject}
                </label>
                <input
                  id="c-sujet"
                  type="text"
                  value={form.sujet}
                  onChange={(e) => setForm((s) => ({ ...s, sujet: e.target.value }))}
                  onFocus={() => setFocused("sujet")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-b border-[#FFFFFF]/15 text-[#FFFFFF] py-3 text-sm outline-none focus:border-[#E84B8A] transition-colors duration-300 placeholder:text-[#FFFFFF]/20"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                  placeholder={phSubject}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-0 mb-8">
                <label
                  htmlFor="c-message"
                  className={`uppercase tracking-[0.22em] mb-3 transition-colors duration-300 ${focused === "message" ? "text-[#E84B8A]" : "text-[#FFFFFF]/60"}`}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500 }}
                >
                  {labelMessage}
                </label>
                <textarea
                  id="c-message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-b border-[#FFFFFF]/15 text-[#FFFFFF] py-3 text-sm outline-none resize-none focus:border-[#E84B8A] transition-colors duration-300 placeholder:text-[#FFFFFF]/20"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, lineHeight: 1.8 }}
                  placeholder={phMessage}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between">
                <motion.button
                  type="submit"
                  disabled={sent || loading}
                  whileHover={tier === "high" && !sent && !loading ? { scale: 1.02 } : undefined}
                  whileTap={!sent && !loading ? { scale: 0.97 } : undefined}
                  className={`relative flex items-center gap-3 px-10 py-4 ${sent ? "bg-[#ffffff] text-[#000000]" : "bg-[#E84B8A] text-[#FFFFFF]"} uppercase tracking-[0.2em] text-xs overflow-hidden transition-all duration-300 hover:bg-[#FFFFFF] hover:text-[#000000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B8A] ${loading || sent ? "opacity-75 cursor-not-allowed" : "cursor-pointer"} group`}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                >
                  <Send size={12} className={`transition-transform duration-300 ${loading || sent ? "" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
                  {loading ? "Envoi..." : (sent ? sentLabel : submitLabel)}
                </motion.button>

                {sent && (
                  <motion.p
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[#3BA9D9]"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 300 }}
                  >
                    {thanksLabel}
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



