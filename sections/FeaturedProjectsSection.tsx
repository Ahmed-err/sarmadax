"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, GitBranch, ExternalLink, Layers } from "lucide-react";

const projectIds = ["electroerp", "printshop", "tajdera"] as const;
const colors = ["#0ea5e9", "#8b5cf6", "#14b8a6"];
const gradients = ["from-sky-500/20 to-cyan-500/10", "from-violet-500/20 to-purple-500/10", "from-teal-500/20 to-emerald-500/10"];
const categories = ["ERP / SaaS", "E-Commerce", "Web App"];
const statKeys = [
  [["statsModels", "35+"], ["statsRoutes", "23+"], ["statsLang", "2"]],
  [["statsBuilder", "Visual"], ["statsPayment", "Paymob"], ["statsLang", "2"]],
  [["statsRoasts", "50+"], ["statsCategories", "4"], ["statsTiers", "4"]],
] as const;
const tagSets = [
  ["Next.js", "PostgreSQL", "Prisma", "NextAuth"],
  ["React", "Express.js", "MongoDB", "Paymob"],
  ["React", "TypeScript", "Vite", "Framer Motion"],
];
const githubUrls = [
  "https://github.com/Ahmed-err/ecommerce-accounting-system",
  "https://github.com/Ahmed-err/Print-Shop",
  "https://github.com/Ahmed-err/tajdera",
];
const liveUrls = [
  "https://himmat.store",
  "https://harfoushprint.com",
  null,
];

function ProjectCard({ id, index }: { id: (typeof projectIds)[number]; index: number }) {
  const t = useTranslations(`featuredProjectsData.${id}`);
  const [hovered, setHovered] = useState(false);
  const color = colors[index];
  const githubUrl = githubUrls[index];
  const liveUrl = liveUrls[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group glass-card relative overflow-hidden"
    >
      <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${gradients[index]}`}>
        <motion.div animate={{ rotate: hovered ? 5 : 0, scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.4 }} className="absolute inset-0 bg-dots opacity-20" />
        <motion.div
          animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{ background: `${color}20`, border: `1px solid ${color}40`, boxShadow: hovered ? `0 20px 40px ${color}30` : "none" }}
        >
          <Layers size={32} style={{ color }} />
        </motion.div>

        <div className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-xs font-medium text-white" style={{ background: `${color}80` }}>
          {categories[index]}
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
              style={{ background: "rgba(5, 10, 15, 0.6)", backdropFilter: "blur(4px)" }}
            >
              <motion.a href={githubUrl} target="_blank" rel="noopener noreferrer" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.05 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20" aria-label="View on GitHub">
                <GitBranch size={16} />
              </motion.a>
              {liveUrl && (
                <motion.a href={liveUrl} target="_blank" rel="noopener noreferrer" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20" aria-label="View live">
                  <ExternalLink size={16} />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-base font-semibold text-foreground">{t("title")}</h3>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary">{t("description")}</p>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {statKeys[index].map(([key, val]) => (
            <div key={key} className="rounded-lg p-2 text-center" style={{ background: "var(--background-secondary)" }}>
              <div className="text-sm font-bold" style={{ color }}>{val}</div>
              <div className="text-[10px] text-text-muted">{t(key as "statsUsers")}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tagSets[index].map((tag) => (
            <span key={tag} className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-text-secondary">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProjectsSection() {
  const t = useTranslations("featuredProjects");

  return (
    <section id="work" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5"
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
              {t("subtitle").split(" ").slice(0, -3).join(" ")}{" "}
              <span className="gradient-text">{t("subtitle").split(" ").slice(-3).join(" ")}</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Link href="/portfolio" className="group flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-accent hover:text-accent">
              {t("viewAll")}
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectIds.map((id, i) => <ProjectCard key={id} id={id} index={i} />)}
        </div>
      </div>
    </section>
  );
}
