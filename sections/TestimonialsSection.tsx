"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const colors = ["#0ea5e9", "#14b8a6", "#8b5cf6", "#f59e0b"];
const avatars = ["SJ", "MC", "EW", "AR"];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const td = useTranslations("testimonialsData");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const count = 4;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % count);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + count) % count); };
  const next = () => { setDirection(1); setCurrent((c) => (c + 1) % count); };

  const id = String(current + 1) as "1" | "2" | "3" | "4";
  const color = colors[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.96 }),
  };

  return (
    <section id="testimonials" className="relative py-24 bg-background-secondary overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--gradient-start)" }}
      />

      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
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
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {t("subtitle").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="gradient-text">{t("subtitle").split(" ").slice(-2).join(" ")}</span>
          </motion.h2>
        </div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card-strong p-8 md:p-10"
            >
              <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${color}18` }}
              >
                <Quote size={22} style={{ color }} />
              </div>

              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>

              <blockquote className="mb-8 text-lg leading-relaxed text-foreground md:text-xl">
                &ldquo;{td(`${id}.text`)}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${color}, var(--gradient-end))` }}
                >
                  {avatars[current]}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{td(`${id}.name`)}</div>
                  <div className="text-sm text-text-secondary">{td(`${id}.role`)}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`Go to testimonial ${i + 1}`}>
                <div
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === current ? 24 : 8, height: 8, background: i === current ? "var(--accent)" : "var(--border)" }}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
