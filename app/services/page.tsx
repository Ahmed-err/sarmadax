"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Globe, Smartphone, Palette,
  Bot, Plug, ShoppingCart, Wrench, ArrowRight, CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";

const serviceKeys = ["saas", "webApp", "mobile", "design", "ai", "api", "ecommerce", "maintenance"] as const;
const serviceIcons = [LayoutDashboard, Globe, Smartphone, Palette, Bot, Plug, ShoppingCart, Wrench];
const serviceColors = ["#0ea5e9", "#14b8a6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#f97316", "#6366f1"];

export default function ServicesPage() {
  const t = useTranslations("services");
  const te = useTranslations("servicesPageExtra");

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <span className="text-xs font-medium text-text-secondary">{t("title")}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {te("heading1")}{" "}<span className="gradient-text">{te("heading2")}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="mx-auto max-w-xl text-base text-text-secondary">
              {t("subtitle")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {serviceKeys.map((key, i) => {
              const Icon = serviceIcons[i];
              const color = serviceColors[i];
              const featuresRaw = te.raw(`features.${key}`);
              const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];

              return (
                <motion.div key={key} id={key}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ delay: (i % 2) * 0.1, duration: 0.5 }}
                  className="glass-card group relative overflow-hidden p-8 transition-colors hover:border-border-hover">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 0% 0%, ${color}10, transparent 60%)` }} />
                  <div className="relative flex flex-col gap-5 md:flex-row">
                    <motion.div whileHover={{ scale: 1.08 }}
                      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                      <Icon size={24} style={{ color }} />
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-lg font-bold text-foreground">{t(`${key}.title`)}</h2>
                      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{t(`${key}.description`)}</p>
                      {features.length > 0 && (
                        <div className="mb-4 grid grid-cols-2 gap-2">
                          {features.map((f: string) => (
                            <div key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                              <CheckCircle2 size={12} style={{ color, flexShrink: 0 }} />
                              {f}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs text-text-muted"
                        style={{ background: "var(--background-secondary)" }}>
                        {t(`${key}.deliverables`)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="glass-card mt-16 p-10 text-center"
            style={{ background: "linear-gradient(135deg, var(--gradient-start)08, var(--gradient-end)05)" }}>
            <h2 className="mb-3 text-2xl font-bold text-foreground">{te("notSure")}</h2>
            <p className="mx-auto mb-8 max-w-md text-sm text-text-secondary">{te("notSureDesc")}</p>
            <Link href="/contact" className="shimmer-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}>
              {te("bookCall")}
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
