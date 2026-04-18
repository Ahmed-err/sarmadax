"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code2, Palette, Heart, Star, Award, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";

const techStack = [
  { name: "Next.js", categoryKey: "Frontend" },
  { name: "React", categoryKey: "Frontend" },
  { name: "TypeScript", categoryKey: "Language" },
  { name: "Node.js", categoryKey: "Backend" },
  { name: "PostgreSQL", categoryKey: "Database" },
  { name: "Tailwind CSS", categoryKey: "Styling" },
  { name: "Framer Motion", categoryKey: "Animation" },
  { name: "React Native", categoryKey: "Mobile" },
  { name: "OpenAI", categoryKey: "AI" },
  { name: "Stripe", categoryKey: "Payments" },
  { name: "AWS", categoryKey: "Cloud" },
  { name: "Figma", categoryKey: "Design" },
];

const values = ["quality", "transparency", "innovation", "partnership"] as const;
const valueIcons = [Star, CheckCircle2, Award, Heart];
const valueColors = ["#0ea5e9", "#14b8a6", "#8b5cf6", "#ec4899"];

export default function AboutPage() {
  const t = useTranslations("about");
  const te = useTranslations("aboutExtra");
  const tc = useTranslations("techCategories");

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-20 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <span className="text-xs font-medium text-text-secondary">{t("title")}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {te("heading1")}{" "}<span className="gradient-text">{te("heading2")}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="mx-auto max-w-xl text-base text-text-secondary">
              {t("subtitle")}
            </motion.p>
          </div>

          {/* Story + Mission */}
          <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[
              { titleKey: "storyTitle", bodyKey: "story", icon: Code2, color: "#0ea5e9" },
              { titleKey: "missionTitle", bodyKey: "mission", icon: Palette, color: "#14b8a6" },
            ].map(({ titleKey, bodyKey, icon: Icon, color }, i) => (
              <motion.div key={titleKey} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }} className="glass-card p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h2 className="mb-3 text-xl font-bold text-foreground">{t(titleKey as "storyTitle")}</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{t(bodyKey as "story")}</p>
              </motion.div>
            ))}
          </div>

          {/* Founder card */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="glass-card-strong mb-20 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="relative flex flex-col items-center justify-center p-10"
                style={{ background: "linear-gradient(135deg, var(--gradient-start)15, var(--gradient-end)10)", borderRight: "1px solid var(--border)" }}>
                <div className="absolute h-48 w-48 rounded-full border border-border opacity-30"
                  style={{ animation: "rotate-gradient 20s linear infinite" }} />
                <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white"
                  style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}>
                  {t("founderName")[0]}
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{t("founderName")}</div>
                  <div className="text-sm text-accent">{t("founderRole")}</div>
                </div>
                <div className="mt-4 flex items-center gap-1.5">
                  <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-text-muted">{te("available")}</span>
                </div>
              </div>

              <div className="col-span-2 p-8 lg:p-10">
                <h2 className="mb-2 text-xl font-bold text-foreground">{t("founderTitle")}</h2>
                <p className="mb-6 text-sm leading-relaxed text-text-secondary">{t("founderBio")}</p>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  {[
                    { val: "5+", label: te("yearsExpLabel") },
                    { val: "50+", label: te("projectsLabel") },
                    { val: "30+", label: te("clientsLabel") },
                  ].map(({ val, label }) => (
                    <div key={label} className="rounded-xl bg-card p-3 text-center">
                      <div className="gradient-text text-xl font-bold">{val}</div>
                      <div className="text-xs text-text-muted">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[te("skillFullStack"), te("skillUIUX"), te("skillSaaS"), te("skillAI")].map((skill) => (
                    <span key={skill} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-text-secondary">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <div className="mb-20">
            <div className="mb-10 text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {t("valuesTitle")}
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((key, i) => {
                const Icon = valueIcons[i];
                const color = valueColors[i];
                return (
                  <motion.div key={key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }} className="glass-card p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{t(`values.${key}.title`)}</h3>
                    <p className="text-xs leading-relaxed text-text-secondary">{t(`values.${key}.description`)}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <div className="mb-10 text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {t("techTitle")}
              </motion.h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {techStack.map((tech, i) => (
                <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }} whileHover={{ scale: 1.05, y: -2 }}
                  className="glass-card flex flex-col items-center gap-1.5 p-4 text-center">
                  <span className="text-sm font-semibold text-foreground">{tech.name}</span>
                  <span className="rounded-full bg-card px-2 py-0.5 text-[10px] text-text-muted">
                    {tc(tech.categoryKey as "Frontend")}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
