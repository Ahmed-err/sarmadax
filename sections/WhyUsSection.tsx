"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Layers, Cpu, Rocket, LifeBuoy } from "lucide-react";

const icons = [Layers, Cpu, Rocket, LifeBuoy];
const keys = ["designCode", "modernStack", "fastDelivery", "ongoingSupport"] as const;
const colors = ["#0ea5e9", "#8b5cf6", "#14b8a6", "#f59e0b"];

export function WhyUsSection() {
  const t = useTranslations("whyUs");
  const te = useTranslations("whyUsExtra");

  return (
    <section id="why-us" className="relative py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 w-fit"
            >
              <span className="text-xs font-medium text-text-secondary">{t("title")}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              {t("subtitle").split(" ").slice(0, 2).join(" ")}{" "}
              <span className="gradient-text">{t("subtitle").split(" ").slice(2).join(" ")}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base leading-relaxed text-text-secondary"
            >
              {te("desc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {["#0ea5e9", "#14b8a6", "#8b5cf6"].map((color, i) => (
                  <div
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background text-xs font-bold text-white"
                    style={{ background: color }}
                  >
                    {["A", "C", "R"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{te("happyClients")}</div>
                <div className="text-xs text-text-muted">{te("countries")}</div>
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {keys.map((key, i) => {
              const Icon = icons[i];
              const color = colors[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 + 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="glass-card group relative overflow-hidden p-5"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 0% 0%, ${color}12, transparent 70%)` }}
                  />
                  <div
                    className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-foreground">{t(`${key}.title`)}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{t(`${key}.description`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
