"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Star, Shield, Code2, ArrowRight,
  ChevronDown, Smartphone, Bot, Globe,
  Palette, Wrench, Zap, Clock, RefreshCw,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";

const plans = [
  { key: "spark", color: "#0ea5e9", popular: false },
  { key: "launch", color: "#8b5cf6", popular: true },
  { key: "scale", color: "#14b8a6", popular: false },
] as const;

const addOns = [
  { key: "mobile", icon: Smartphone, color: "#8b5cf6" },
  { key: "ai", icon: Bot, color: "#f59e0b" },
  { key: "seo", icon: Globe, color: "#14b8a6" },
  { key: "brand", icon: Palette, color: "#ec4899" },
  { key: "maintenance", icon: Wrench, color: "#6366f1" },
  { key: "priority", icon: Zap, color: "#0ea5e9" },
] as const;

const guaranteeIcons = [Code2, RefreshCw, Shield, Clock];
const guaranteeColors = ["#0ea5e9", "#14b8a6", "#8b5cf6", "#f59e0b"];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={16} className="text-text-muted" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-relaxed text-text-secondary">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  const t = useTranslations("pricingPage");

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main id="main" className="min-h-screen pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Hero */}
          <div className="mb-20 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <span className="text-xs font-medium text-text-secondary">{t("badge")}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("heading1")}{" "}<span className="gradient-text">{t("heading2")}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="mx-auto mb-6 max-w-xl text-base text-text-secondary">
              {t("subtitle")}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
              <span className="text-xs font-medium text-amber-400">{t("spotsLeft")}</span>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan, i) => {
              const features: string[] = t.raw(`plans.${plan.key}.features`) as string[];
              return (
                <motion.div
                  key={plan.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  className="relative"
                  style={{ zIndex: plan.popular ? 1 : 0 }}
                >
                  {/* Gradient border wrapper for popular */}
                  <div
                    className={`h-full rounded-2xl ${plan.popular ? "p-px" : ""}`}
                    style={plan.popular ? {
                      background: `linear-gradient(135deg, ${plan.color}, var(--gradient-end))`,
                    } : {}}
                  >
                    <div className={`relative flex h-full flex-col rounded-2xl p-8 ${
                      plan.popular ? "bg-card" : "glass-card"
                    }`}>
                      {/* Glow */}
                      {plan.popular && (
                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-20"
                          style={{ background: `radial-gradient(circle at 50% 0%, ${plan.color}, transparent 70%)` }} />
                      )}

                      {/* Popular badge */}
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${plan.color}, var(--gradient-end))` }}>
                            <Star size={10} fill="currentColor" />
                            {t("mostPopular")}
                          </span>
                        </div>
                      )}

                      {/* Name + tagline */}
                      <div className="mb-6 mt-2">
                        <div className="mb-1 text-xl font-bold text-foreground"
                          style={plan.popular ? { color: plan.color } : {}}>
                          {t(`plans.${plan.key}.name`)}
                        </div>
                        <p className="text-xs leading-relaxed text-text-secondary">
                          {t(`plans.${plan.key}.tagline`)}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-6">
                        <div className={`text-5xl font-bold tracking-tight ${plan.popular ? "gradient-text" : "text-foreground"}`}>
                          {t(`plans.${plan.key}.price`)}
                        </div>
                        {plan.key !== "scale" && (
                          <div className="mt-1 text-xs text-text-muted">{t("perProject")}</div>
                        )}
                      </div>

                      {/* Timeline pill */}
                      <div className="mb-6 flex items-center gap-2 rounded-xl px-3 py-2"
                        style={{ background: `${plan.color}12`, border: `1px solid ${plan.color}25` }}>
                        <Clock size={13} style={{ color: plan.color }} />
                        <span className="text-xs font-semibold" style={{ color: plan.color }}>
                          {t(`plans.${plan.key}.timeline`)}
                        </span>
                      </div>

                      {/* Features */}
                      <ul className="mb-8 flex flex-col gap-3">
                        {features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2.5">
                            <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                            <span className="text-sm text-text-secondary">{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="mt-auto">
                        <Link
                          href="/contact"
                          className={`shimmer-btn flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all ${
                            plan.popular
                              ? "text-white shadow-lg"
                              : "border border-border text-foreground hover:border-opacity-60"
                          }`}
                          style={plan.popular ? {
                            background: `linear-gradient(135deg, ${plan.color}, var(--gradient-end))`,
                          } : plan.key === "scale" ? {
                            background: `linear-gradient(135deg, ${plan.color}20, var(--gradient-end)15)`,
                            borderColor: `${plan.color}40`,
                            color: plan.color,
                          } : {}}
                        >
                          {plan.key === "scale" ? t("contactUs") : t("getStarted")}
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Every package includes */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="glass-card mb-20 px-8 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex-shrink-0 text-sm font-bold text-foreground">{t("allInclude")}:</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {(t.raw("allIncludeItems") as string[]).map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-accent" />
                    <span className="text-xs text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Add-ons */}
          <div className="mb-20">
            <div className="mb-10 text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {t("addOns")}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.05 }}
                className="text-sm text-text-secondary">
                {t("addOnsDesc")}
              </motion.p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {addOns.map(({ key, icon: Icon, color }, i) => (
                <motion.div key={key}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="glass-card group flex items-start gap-4 p-5 transition-colors hover:border-border-hover">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-0.5 text-sm font-semibold text-foreground">
                      {t(`addOn.${key}.name`)}
                    </div>
                    <div className="mb-2.5 text-xs text-text-secondary">
                      {t(`addOn.${key}.desc`)}
                    </div>
                    <span className="rounded-full px-2.5 py-1 text-xs font-bold"
                      style={{ background: `${color}15`, color }}>
                      {t(`addOn.${key}.price`)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mb-20">
            <div className="mb-10 text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {t("howItWorks")}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.05 }}
                className="text-sm text-text-secondary">
                {t("howItWorksDesc")}
              </motion.p>
            </div>
            <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Connector line */}
              <div className="absolute top-12 left-1/6 right-1/6 hidden h-px md:block"
                style={{ background: "linear-gradient(90deg, transparent, var(--border), var(--border), transparent)" }} />
              {([1, 2, 3] as const).map((step, i) => (
                <motion.div key={step}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="glass-card relative p-8 text-center">
                  <div className="relative mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white"
                    style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}>
                    {step}
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-foreground">{t(`step${step}Title`)}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{t(`step${step}Desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Guarantees */}
          <div className="mb-20">
            <div className="mb-10 text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {t("guarantees")}
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {guaranteeIcons.map((Icon, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }} className="glass-card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: `${guaranteeColors[i]}18`,
                      border: `1px solid ${guaranteeColors[i]}30`,
                    }}>
                    <Icon size={20} style={{ color: guaranteeColors[i] }} />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-foreground">{t(`g${i + 1}Title`)}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{t(`g${i + 1}Desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <div className="mb-10 text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {t("faq")}
              </motion.h2>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card mx-auto max-w-3xl divide-y divide-border px-8">
              {([1, 2, 3, 4, 5, 6] as const).map((k) => (
                <FAQItem key={k} q={t(`faq${k}q`)} a={t(`faq${k}a`)} />
              ))}
            </motion.div>
          </div>

          {/* Final CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="glass-card relative overflow-hidden p-12 text-center"
            style={{ background: "linear-gradient(135deg, var(--gradient-start)08, var(--gradient-end)05)" }}>
            {/* Blob decorations */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, var(--gradient-start), transparent)" }} />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, var(--gradient-end), transparent)" }} />

            <div className="relative">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-text-secondary">Available for new projects</span>
              </motion.div>
              <h2 className="mb-3 text-3xl font-bold text-foreground">{t("ctaTitle")}</h2>
              <p className="mx-auto mb-8 max-w-lg text-sm text-text-secondary">{t("ctaDesc")}</p>
              <Link href="/contact"
                className="shimmer-btn inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-xl"
                style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}>
                {t("ctaBtn")}
                <ArrowRight size={15} />
              </Link>
              <p className="mt-5 text-xs text-text-muted">
                {t("ctaEmail")}{" "}
                <a href="mailto:hello@sarmadax.com"
                  className="text-accent transition-colors hover:underline">
                  hello@sarmadax.com
                </a>
              </p>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
