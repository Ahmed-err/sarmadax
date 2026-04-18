"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  LayoutDashboard, Globe, Smartphone, Palette,
  Bot, Plug, ShoppingCart, Wrench,
} from "lucide-react";

const serviceIcons = [
  LayoutDashboard, Globe, Smartphone, Palette,
  Bot, Plug, ShoppingCart, Wrench,
];

const serviceKeys = [
  "saas", "webApp", "mobile", "design",
  "ai", "api", "ecommerce", "maintenance",
] as const;

const iconColors = [
  "#0ea5e9", "#14b8a6", "#8b5cf6", "#ec4899",
  "#f59e0b", "#10b981", "#f97316", "#6366f1",
];

function ServiceCard({ serviceKey, index }: { serviceKey: (typeof serviceKeys)[number]; index: number }) {
  const t = useTranslations(`services.${serviceKey}`);
  const te = useTranslations("servicesExtra");
  const Icon = serviceIcons[index];
  const color = iconColors[index];
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [4, -4]), { damping: 25, stiffness: 400 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-4, 4]), { damping: 25, stiffness: 400 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
      className="group glass-card relative overflow-hidden p-6 transition-colors duration-300 hover:border-border-hover"
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)` }}
      />
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={20} style={{ color }} />
      </motion.div>
      <h3 className="mb-2 text-base font-semibold text-foreground">{t("title")}</h3>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{t("description")}</p>
      <div className="rounded-lg px-3 py-2 text-xs text-text-muted" style={{ background: "var(--background-secondary)" }}>
        <span className="font-medium" style={{ color }}>{te("delivers")} </span>
        {t("deliverables")}
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const t = useTranslations("services");
  const te = useTranslations("servicesExtra");

  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
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
            {t("title")}{" "}
            <span className="gradient-text">{te("headingHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto max-w-xl text-base text-text-secondary"
          >
            {t("subtitle")}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceKeys.map((key, i) => (
            <ServiceCard key={key} serviceKey={key} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
