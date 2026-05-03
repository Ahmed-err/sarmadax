"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      // Intentional: skips animation entirely when motion is reduced.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(end);
      return;
    }
    let raf = 0;
    const startTime = performance.now();
    const totalMs = duration * 1000;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / totalMs);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reducedMotion]);

  return <span ref={ref}>{count}</span>;
}

function OrbitalRing({
  color,
  radius,
  delay,
  clockwise,
}: {
  color: string;
  radius: number;
  delay: number;
  clockwise: boolean;
}) {
  const ref = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true });

  const size = radius * 2 + 12;
  const circumference = 2 * Math.PI * radius;

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={`${color}18`} strokeWidth="1" />
        {/* Animated fill */}
        <motion.circle
          ref={ref}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.72} ${circumference * 0.28}`}
          initial={{ strokeDashoffset: circumference, opacity: 0, rotate: -90 }}
          animate={inView ? {
            strokeDashoffset: [circumference, 0],
            opacity: 0.55,
            rotate: clockwise ? [-90, 270] : [-90, -450],
          } : {}}
          transition={{
            strokeDashoffset: { delay, duration: 1.4, ease: "easeOut" },
            opacity: { delay, duration: 0.4 },
            rotate: {
              delay: delay + 1.2,
              // Stable per-radius duration — was Math.random() during render,
              // which violated react-hooks/purity and could produce different
              // values across renders.
              duration: 8 + (radius % 5),
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
        />
        {/* Glowing dot at the tip */}
        <motion.circle
          cx={size / 2}
          cy={size / 2 - radius}
          r="2.5"
          fill={color}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0.9, 0.5, 0.9] } : {}}
          transition={{ delay: delay + 1.2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { value: 50, suffix: "+", label: t("projects"), color: "#0ea5e9", r: 48 },
    { value: 30, suffix: "+", label: t("clients"), color: "#14b8a6", r: 44 },
    { value: 20, suffix: "+", label: t("technologies"), color: "#8b5cf6", r: 46 },
    { value: 5, suffix: "+", label: t("experience"), color: "#ec4899", r: 42 },
  ];

  return (
    <section className="relative overflow-hidden py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="glass-card grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative flex flex-col items-center justify-center px-6 py-10 text-center"
            >
              {/* Separator */}
              {i > 0 && <div className="absolute inset-y-6 left-0 w-px bg-border" />}

              {/* Orbital rings */}
              <OrbitalRing color={stat.color} radius={stat.r} delay={i * 0.12 + 0.2} clockwise={i % 2 === 0} />

              {/* Number */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 mb-1 text-5xl font-bold tabular-nums tracking-tight"
                style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}50` }}
              >
                <CountUp end={stat.value} />
                <span>{stat.suffix}</span>
              </motion.div>

              <div className="relative z-10 text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
