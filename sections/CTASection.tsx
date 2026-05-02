"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticElement } from "@/components/shared/MagneticElement";

export function CTASection() {
  const t = useTranslations("cta");
  const te = useTranslations("ctaExtra");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24">

      {/* Rotating conic vortex */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={inView ? { rotate: 360 } : {}}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="cta-vortex absolute h-[600px] w-[600px] rounded-full opacity-30"
        />
        <motion.div
          animate={inView ? { rotate: -360 } : {}}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="cta-vortex-inner absolute h-[380px] w-[380px] rounded-full opacity-20"
        />
      </div>

      {/* Radial blobs */}
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

      <div className="relative mx-auto max-w-4xl px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur-sm px-4 py-2"
        >
          <Sparkles size={13} style={{ color: "var(--accent)" }} />
          <span className="text-xs font-medium text-text-secondary">{te("badge")}</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
        >
          {t("title").replace("?", "")}<span className="gradient-text">?</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-text-secondary"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticElement strength={0.35}>
            <Link
              href="/contact"
              className="shimmer-btn neon-btn group flex h-14 items-center gap-3 rounded-full px-8 text-base font-semibold text-white shadow-xl"
              style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}
            >
              {t("button")}
              <motion.div className="transition-transform group-hover:translate-x-1">
                <ArrowRight size={18} />
              </motion.div>
            </Link>
          </MagneticElement>

          <MagneticElement strength={0.28}>
            <Link
              href="/portfolio"
              className="flex h-14 items-center gap-2 rounded-full border border-border px-8 text-base font-semibold text-text-secondary transition-all hover:border-border-hover hover:text-foreground"
            >
              {te("seeWork")}
            </Link>
          </MagneticElement>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
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
