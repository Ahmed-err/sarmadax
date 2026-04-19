"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const processIcons = [Search, PenTool, Code, Rocket];
const processKeys = ["discovery", "design", "develop", "deploy"] as const;
const colors = ["#0ea5e9", "#8b5cf6", "#14b8a6", "#f59e0b"];

export function ProcessSection() {
  const t = useTranslations("process");
  const te = useTranslations("processExtra");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-24 bg-background-secondary">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6" ref={containerRef}>
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5"
          >
            <span className="text-xs font-medium text-text-secondary">{t("title")}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {t("subtitle").split(" ").slice(0, -3).join(" ")}{" "}
            <span className="gradient-text">{te("headingHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto max-w-lg text-base text-text-secondary"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute top-12 left-0 right-0 hidden h-px bg-border lg:block">
            <motion.div
              style={{
                width: lineWidth,
                background: "linear-gradient(90deg, var(--gradient-start), var(--gradient-end))",
              }}
              className="h-full"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {processKeys.map((key, i) => {
              const Icon = processIcons[i];
              const color = colors[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <motion.div
                    whileInView={{ scale: [0.5, 1.15, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                    className="relative z-10 mb-6 flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center rounded-2xl"
                    style={{ background: "var(--card)", border: `2px solid ${color}40` }}
                  >
                    <span
                      className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${color}18` }}
                    >
                      <Icon size={22} style={{ color }} />
                    </div>
                  </motion.div>

                  {i < processKeys.length - 1 && (
                    <div className="absolute left-1/2 top-24 h-8 w-px -translate-x-1/2 bg-border lg:hidden" />
                  )}

                  <h3 className="mb-2 text-lg font-semibold text-foreground">{t(`${key}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{t(`${key}.description`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
