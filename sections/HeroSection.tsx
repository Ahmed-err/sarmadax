"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Zap, Shield, Layers } from "lucide-react";
import { SplitText } from "@/components/shared/SplitText";
import { MagneticElement } from "@/components/shared/MagneticElement";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

function FloatingChip({
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
      initial={{ opacity: 0, y: 20, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
  const rx = useSpring(useTransform(y, [-100, 100], [10, -10]), { damping: 30, stiffness: 300 });
  const ry = useSpring(useTransform(x, [-100, 100], [-10, 10]), { damping: 30, stiffness: 300 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
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
  const locale = useLocale();
  const isRTL = locale === "ar";
  const reducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const techStack = ["React", "Next.js", "TypeScript", "Node.js", "AI/ML"];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh items-center overflow-hidden pb-16 pt-28"
    >
      {/* WebGL background — disabled when the user prefers reduced motion. */}
      {!reducedMotion && <HeroCanvas scrollYProgress={scrollYProgress} isRTL={isRTL} />}

      {/* Vignette over canvas */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 50%, transparent 25%, rgba(5,10,15,0.6) 100%)",
        }}
      />

      {/* Scan-line texture */}
      <div className="scan-lines pointer-events-none absolute inset-0 z-[1]" />

      {/* Main content */}
      <div className="relative z-[2] mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* Left — text */}
          <motion.div style={{ y: contentY, opacity: contentOpacity }} className="flex flex-col items-start">

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur-sm px-4 py-2"
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.45, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              />
              <Sparkles size={13} style={{ color: "var(--accent)" }} />
              <span className="text-xs font-medium text-text-secondary">{t("badge")}</span>
            </motion.div>

            {/* Headline with character-level animation */}
            <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl xl:text-7xl">
              <SplitText text={t("headline1")} delay={0.15} stagger={0.018} />
              <br />
              <SplitText text={t("headline2")} delay={0.35} stagger={0.022} gradient />
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.58 }}
              className="mb-8 max-w-lg text-lg leading-relaxed text-text-secondary"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-10 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticElement strength={0.3}>
                <Link
                  href="/contact"
                  className="shimmer-btn neon-btn group flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                  }}
                >
                  {t("cta1")}
                  <motion.div className="transition-transform group-hover:translate-x-1">
                    <ArrowRight size={16} />
                  </motion.div>
                </Link>
              </MagneticElement>

              <MagneticElement strength={0.25}>
                <Link
                  href="/services"
                  className="flex h-12 items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur-sm px-6 text-sm font-semibold text-foreground transition-all hover:border-border-hover hover:bg-card/70"
                >
                  {t("cta2")}
                </Link>
              </MagneticElement>
            </motion.div>

            {/* Tech stack tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-xs text-text-muted">{tc("builtWith")}</span>
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.85 + i * 0.07 }}
                  className="rounded-full border border-border bg-card/50 backdrop-blur-sm px-2.5 py-0.5 text-xs text-text-secondary"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D tilt card */}
          <div className="relative hidden lg:flex lg:items-center lg:justify-center">
            <TiltCard>
              <motion.div
                initial={{ opacity: 0, scale: 0.84 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[480px] w-[420px]"
              >
                <div className="glass-card-strong absolute inset-0 overflow-hidden p-6">
                  <div
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-2xl"
                    style={{ background: "var(--gradient-start)" }}
                  />
                  {/* Animated scan line */}
                  <div className="card-scan-line absolute inset-x-0 top-0 h-px" />

                  {/* Code block */}
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400/60" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                      <div className="h-3 w-3 rounded-full bg-green-400/60" />
                      <span className="ml-2 text-xs text-text-muted">app.tsx</span>
                      <span className="ml-auto text-[10px] font-mono text-emerald-400/70">● live</span>
                    </div>

                    <div className="rounded-xl border border-border/40 bg-background/60 p-4 font-mono text-xs backdrop-blur-sm">
                      <div className="flex flex-col gap-1.5">
                        {[
                          { color: "text-purple-400", text: "export default function" },
                          { color: "text-blue-400", text: "  App() {" },
                          { color: "text-green-400", text: "    return <Product />" },
                          { color: "text-yellow-300/80", text: "    // scales to millions" },
                          { color: "text-pink-400/90", text: "    // ships in weeks" },
                          { color: "text-text-muted", text: "  }" },
                        ].map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.62 + i * 0.09 }}
                            className={line.color}
                          >
                            {line.text}
                          </motion.div>
                        ))}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1.1, repeat: Infinity }}
                          className="mt-1 inline-block h-3 w-1.5 rounded-sm bg-accent/70"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
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
                        transition={{ delay: 1.06 + i * 0.1 }}
                        className="rounded-xl border border-border bg-card/50 p-3 text-center"
                      >
                        <div className="gradient-text text-xl font-bold">{stat.value}</div>
                        <div className="text-xs text-text-muted">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Skill bars */}
                  <div className="relative z-10 mt-5 flex flex-col gap-3">
                    {[
                      { label: tsk("frontend"), pct: 95, color: "var(--gradient-start)" },
                      { label: tsk("backend"), pct: 88, color: "var(--accent-light)" },
                      { label: tsk("design"), pct: 92, color: "#8b5cf6" },
                    ].map((bar, i) => (
                      <div key={bar.label}>
                        <div className="mb-1.5 flex justify-between text-xs">
                          <span className="text-text-secondary">{bar.label}</span>
                          <span className="text-text-muted">{bar.pct}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-border">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${bar.pct}%` }}
                            transition={{ delay: 1.25 + i * 0.15, duration: 0.9, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${bar.color}, var(--gradient-end))` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating chips */}
                <FloatingChip delay={0.9} className="-top-5 -left-8 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow-strong)" }}>
                    <Zap size={14} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{tc("fastDelivery")}</div>
                    <div className="text-[10px] text-text-muted">{tc("weeksNotMonths")}</div>
                  </div>
                </FloatingChip>

                <FloatingChip delay={1.05} className="ltr:-right-4 rtl:-left-4 top-1/3 flex items-center gap-2 z-10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow-strong)" }}>
                    <Shield size={14} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{tc("secureCode")}</div>
                    <div className="text-[10px] text-text-muted">{tc("bestPractices")}</div>
                  </div>
                </FloatingChip>

                <FloatingChip delay={1.2} className="-bottom-5 ltr:-right-6 rtl:-left-6 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow-strong)" }}>
                    <Layers size={14} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{tc("scalable")}</div>
                    <div className="text-[10px] text-text-muted">{tc("builtToGrow")}</div>
                  </div>
                </FloatingChip>
              </motion.div>
            </TiltCard>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-muted">{t("scrollDown")}</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-text-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
