"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { value: 50, suffix: "+", label: t("projects"), color: "#0ea5e9" },
    { value: 30, suffix: "+", label: t("clients"), color: "#14b8a6" },
    { value: 20, suffix: "+", label: t("technologies"), color: "#8b5cf6" },
    { value: 5, suffix: "+", label: t("experience"), color: "#ec4899" },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Divider line */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="glass-card grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center relative"
            >
              {/* Separator lines */}
              {i > 0 && (
                <div className="absolute left-0 inset-y-6 w-px bg-border" />
              )}

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 300, damping: 20 }}
                className="mb-1 text-5xl font-bold tabular-nums tracking-tight"
                style={{ color: stat.color }}
              >
                <CountUp end={stat.value} />
                <span>{stat.suffix}</span>
              </motion.div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
