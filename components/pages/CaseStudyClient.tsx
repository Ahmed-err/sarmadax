"use client";

import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft, ExternalLink, GitBranch,
  CheckCircle2, Lightbulb, Target, TrendingUp, ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Project } from "@/lib/projects";

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export function CaseStudyClient({ slug, project }: { slug: string; project: Project }) {
  const t = useTranslations(`caseStudies.${slug}`);
  const tc = useTranslations("caseStudies");
  const { color, tags, github, live } = project;

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
    { value: t("stat4Value"), label: t("stat4Label") },
  ];

  const results = [t("result1"), t("result2"), t("result3"), t("result4")];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pb-24 pt-28">
        <div className="mx-auto max-w-4xl px-6">

          <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.4 }}>
            <Link
              href="/portfolio"
              className="group mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              {tc("backToPortfolio")}
            </Link>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.5, delay: 0.05 }}>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: `${color}cc` }}>
                {t("category")}
              </span>
              <span className="text-xs text-text-muted">{t("year")}</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("tagline").split("—")[0]}
              {t("tagline").includes("—") && (
                <>—{" "}<span className="gradient-text">{t("tagline").split("—").slice(1).join("—")}</span></>
              )}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              {live && (
                <a href={live} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${color}, var(--gradient-end))` }}>
                  <ExternalLink size={14} />
                  {tc("liveProject")}
                </a>
              )}
              <a href={github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent">
                <GitBranch size={14} />
                {tc("viewCode")}
              </a>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="rounded-2xl p-5 text-center"
                style={{ background: `${color}0d`, border: `1px solid ${color}30` }}>
                <div className="mb-1 text-2xl font-bold" style={{ color }}>{s.value}</div>
                <div className="text-xs text-text-muted">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="my-16 h-px w-full" style={{ background: "var(--border)" }} />

          {[
            { icon: Target, titleKey: "challengeTitle" as const, bodyKey: "challenge" as const },
            { icon: Lightbulb, titleKey: "solutionTitle" as const, bodyKey: "solution" as const },
          ].map(({ icon: Icon, titleKey, bodyKey }) => (
            <motion.div key={titleKey} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}
              transition={{ duration: 0.5 }} className="mb-14">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}18` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h2 className="text-xl font-bold text-foreground">{t(titleKey)}</h2>
              </div>
              <p className="text-base leading-relaxed text-text-secondary">{t(bodyKey)}</p>
            </motion.div>
          ))}

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}
            transition={{ duration: 0.5 }} className="mb-14">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}18` }}>
                <TrendingUp size={18} style={{ color }} />
              </div>
              <h2 className="text-xl font-bold text-foreground">{t("resultsTitle")}</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {results.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{ background: `${color}0d`, border: `1px solid ${color}20` }}>
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color }} />
                  <span className="text-sm text-text-secondary">{r}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}
            transition={{ duration: 0.5 }} className="mb-16">
            <h2 className="mb-4 text-xl font-bold text-foreground">{tc("techStackTitle")}</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}
            transition={{ duration: 0.5 }}
            className="glass-card-strong rounded-2xl p-10 text-center" style={{ borderColor: `${color}30` }}>
            <h2 className="mb-3 text-2xl font-bold text-foreground">{tc("ctaTitle")}</h2>
            <p className="mb-6 text-text-secondary">{tc("ctaDesc")}</p>
            <Link href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${color}, var(--gradient-end))` }}>
              {tc("ctaButton")}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
