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
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-60, 60], [5, -5]), { damping: 22, stiffness: 380 });
  const rotateY = useSpring(useTransform(mx, [-60, 60], [-5, 5]), { damping: 22, stiffness: 380 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      className="group glass-card relative overflow-hidden p-6 transition-colors duration-300 hover:border-border-hover"
    >
      {/* Dynamic mouse-tracking sheen */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          background: hovered
            ? `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,255,255,0.07) 0%, ${color}12 32%, transparent 62%)`
            : "none",
        }}
      />

      {/* Ambient top-glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: `radial-gradient(ellipse 100% 60% at 50% 0%, ${color}1a, transparent 70%)` }}
      />

      {/* Top edge accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}90, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 6 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${color}18`, border: `1px solid ${color}35` }}
      >
        <Icon size={20} style={{ color }} />
      </motion.div>

      <h3 className="mb-2 text-base font-semibold text-foreground">{t("title")}</h3>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{t("description")}</p>

      <div className="rounded-lg px-3 py-2 text-xs text-text-muted" style={{ background: "var(--background-secondary)" }}>
        <span className="font-medium" style={{ color }}>{te("delivers")} </span>
        {t("deliverables")}
      </div>

      {/* Corner bracket decorations on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
        className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t"
        style={{ borderColor: `${color}70` }}
      />
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
        className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r"
        style={{ borderColor: `${color}70` }}
      />
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
