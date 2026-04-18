"use client";

import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Zap, Shield, Layers } from "lucide-react";

function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass-card absolute p-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { damping: 30, stiffness: 300 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { damping: 30, stiffness: 300 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");
  const tc = useTranslations("heroCards");
  const ts = useTranslations("heroStats");
  const tsk = useTranslations("heroSkills");

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const techStack = ["React", "Next.js", "TypeScript", "Node.js", "AI/ML"];

  return (
    <section
      ref={ref}
      className="relative flex min-h-dvh items-center overflow-hidden pb-16 pt-28"
    >
      {/* Mesh gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--gradient-start), transparent 70%)",
            animation: "mesh-float-1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/4 -right-40 h-[500px] w-[500px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--gradient-end), transparent 70%)",
            animation: "mesh-float-2 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--gradient-start), transparent 70%)",
            animation: "mesh-float-3 16s ease-in-out infinite",
          }}
        />
        <div className="bg-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: Content */}
          <motion.div style={{ y, opacity }} className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--gradient-start)" }}
              />
              <Sparkles size={13} style={{ color: "var(--accent)" }} />
              <span className="text-xs font-medium text-text-secondary">{t("badge")}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl xl:text-7xl"
            >
              {t("headline1")}
              <br />
              <span className="gradient-text">{t("headline2")}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mb-8 max-w-lg text-lg leading-relaxed text-text-secondary"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mb-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/contact"
                className="shimmer-btn group flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-[0_0_30px_var(--accent-glow-strong)]"
                style={{
                  background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                }}
              >
                {t("cta1")}
                <motion.div className="transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </motion.div>
              </Link>
              <Link
                href="/services"
                className="flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-semibold text-foreground transition-all hover:border-border-hover hover:bg-card"
              >
                {t("cta2")}
              </Link>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-xs text-text-muted">{tc("builtWith")}</span>
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.06 }}
                  className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-text-secondary"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Visual */}
          <div className="relative hidden lg:flex lg:items-center lg:justify-center">
            <TiltCard>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative h-[480px] w-[420px]"
              >
                {/* Main card */}
                <div className="glass-card-strong absolute inset-0 overflow-hidden p-6">
                  <div
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-2xl"
                    style={{ background: "var(--gradient-start)" }}
                  />
                  {/* Code preview */}
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400/60" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                      <div className="h-3 w-3 rounded-full bg-green-400/60" />
                      <span className="ml-2 text-xs text-text-muted">app.tsx</span>
                    </div>
                    <div className="rounded-xl bg-background/50 p-4 font-mono text-xs">
                      <div className="flex flex-col gap-1">
                        {[
                          { color: "text-purple-400", text: "export default function" },
                          { color: "text-blue-400", text: "  App()" },
                          { color: "text-text-muted", text: "  {" },
                          { color: "text-green-400", text: "    return <Product />" },
                          { color: "text-yellow-400", text: "    // Scale to millions" },
                          { color: "text-text-muted", text: "  }" },
                        ].map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.08 }}
                            className={line.color}
                          >
                            {line.text}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="relative z-10 mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: ts("projects"), value: "50+" },
                      { label: ts("clients"), value: "30+" },
                      { label: ts("years"), value: "5+" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="rounded-xl border border-border bg-card/50 p-3 text-center"
                      >
                        <div className="text-xl font-bold gradient-text">{stat.value}</div>
                        <div className="text-xs text-text-muted">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress bars */}
                  <div className="relative z-10 mt-5 flex flex-col gap-3">
                    {[
                      { label: tsk("frontend"), pct: 95 },
                      { label: tsk("backend"), pct: 88 },
                      { label: tsk("design"), pct: 92 },
                    ].map((bar, i) => (
                      <div key={bar.label}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-text-secondary">{bar.label}</span>
                          <span className="text-text-muted">{bar.pct}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-border">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${bar.pct}%` }}
                            transition={{ delay: 1.2 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(90deg, var(--gradient-start), var(--gradient-end))",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating chips */}
                <FloatingCard delay={0.8} className="-top-5 -left-8 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow-strong)" }}>
                    <Zap size={14} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{tc("fastDelivery")}</div>
                    <div className="text-[10px] text-text-muted">{tc("weeksNotMonths")}</div>
                  </div>
                </FloatingCard>

                <FloatingCard delay={1.0} className="-right-8 top-1/3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow-strong)" }}>
                    <Shield size={14} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{tc("secureCode")}</div>
                    <div className="text-[10px] text-text-muted">{tc("bestPractices")}</div>
                  </div>
                </FloatingCard>

                <FloatingCard delay={1.2} className="-bottom-5 -right-6 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow-strong)" }}>
                    <Layers size={14} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{tc("scalable")}</div>
                    <div className="text-[10px] text-text-muted">{tc("builtToGrow")}</div>
                  </div>
                </FloatingCard>
              </motion.div>
            </TiltCard>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-muted">{t("scrollDown")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-text-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
