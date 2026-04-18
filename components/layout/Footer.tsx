"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code2, GitBranch, X, Globe, Mail, ArrowUpRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function Footer() {
  const t = useTranslations("footer");
  const te = useTranslations("footerExtra");
  const nav = useTranslations("nav");
  const s = useTranslations("services");

  const services = [
    { label: s("saas.title"), href: "/services#saas" },
    { label: s("webApp.title"), href: "/services#webApp" },
    { label: s("mobile.title"), href: "/services#mobile" },
    { label: s("design.title"), href: "/services#design" },
    { label: s("ai.title"), href: "/services#ai" },
  ];

  const company = [
    { label: nav("about"), href: "/about" },
    { label: nav("portfolio"), href: "/portfolio" },
    { label: nav("pricing"), href: "/pricing" },
    { label: nav("contact"), href: "/contact" },
    { label: t("privacy"), href: "/privacy" },
    { label: t("terms"), href: "/terms" },
  ];

  const social = [
    { icon: GitBranch, href: "https://github.com/sarmadaxdev", label: "GitHub" },
    { icon: X, href: "https://twitter.com", label: "Twitter" },
    { icon: Globe, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@sarmadax.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <motion.div custom={0} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}>
                <Code2 size={16} className="text-white" />
              </div>
              <span className="text-base font-semibold tracking-tight">Sarma<span className="gradient-text">dax</span></span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary">{t("tagline")}</p>
            <div className="flex items-center gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent hover:text-accent">
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t("services")}</h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-accent">
                    {item.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div custom={2} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t("company")}</h3>
            <ul className="flex flex-col gap-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-accent">
                    {item.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA card */}
          <motion.div custom={3} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="glass-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow-strong)" }}>
                <Mail size={18} style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-foreground">{te("startProject")}</h3>
              <p className="mb-4 text-xs leading-relaxed text-text-secondary">{te("startProjectDesc")}</p>
              <Link href="/contact" className="shimmer-btn flex h-9 w-full items-center justify-center rounded-xl text-sm font-medium text-white"
                style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}>
                {te("getInTouch")}
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row"
        >
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} Sarmadax. {t("rights")}</p>
          <p className="text-xs text-text-muted">{te("crafted")}</p>
        </motion.div>
      </div>
    </footer>
  );
}
