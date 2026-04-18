"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  const t = useTranslations("cta");
  const te = useTranslations("ctaExtra");

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-start)" }}
        />
        <div
          className="absolute right-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
          style={{ background: "var(--gradient-end)" }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
        >
          <Sparkles size={13} style={{ color: "var(--accent)" }} />
          <span className="text-xs font-medium text-text-secondary">{te("badge")}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
        >
          {t("title").replace("?", "")}<span className="gradient-text">?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-text-secondary"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="shimmer-btn group flex h-14 items-center gap-3 rounded-full px-8 text-base font-semibold text-white shadow-xl transition-all hover:shadow-[0_0_40px_var(--accent-glow-strong)]"
            style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}
          >
            {t("button")}
            <motion.div className="transition-transform group-hover:translate-x-1">
              <ArrowRight size={18} />
            </motion.div>
          </Link>
          <Link
            href="/portfolio"
            className="flex h-14 items-center gap-2 rounded-full border border-border px-8 text-base font-semibold text-text-secondary transition-all hover:border-border-hover hover:text-foreground"
          >
            {te("seeWork")}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8"
        >
          {[te("noContracts"), te("transparentPricing"), te("responseTime")].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-text-muted">
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gradient-start)" }} />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
