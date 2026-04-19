"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, GitBranch, Layers } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";

type Category = "all" | "web" | "saas" | "ecommerce" | "finance";

const categoryKeys: Category[] = ["all", "web", "saas", "ecommerce", "finance"];

const projects: {
  id: string;
  category: Category;
  year: string;
  color: string;
  tags: string[];
  github: string;
  live: string | null;
}[] = [
  {
    id: "electroerp",
    category: "saas",
    year: "2026",
    color: "#0ea5e9",
    tags: ["Next.js", "PostgreSQL", "Prisma", "NextAuth"],
    github: "https://github.com/Ahmed-err/ecommerce-accounting-system",
    live: "https://himmat.store",
  },
  {
    id: "printshop",
    category: "ecommerce",
    year: "2026",
    color: "#8b5cf6",
    tags: ["React", "Express.js", "MongoDB", "Paymob"],
    github: "https://github.com/Ahmed-err/Print-Shop",
    live: "https://harfoushprint.com",
  },
  {
    id: "tajdera",
    category: "finance",
    year: "2026",
    color: "#14b8a6",
    tags: ["React", "TypeScript", "Vite", "Framer Motion"],
    github: "https://github.com/Ahmed-err/tajdera",
    live: null,
  },
  {
    id: "portfolio",
    category: "web",
    year: "2026",
    color: "#f59e0b",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Resend"],
    github: "https://github.com/Ahmed-err/SE-PORTFOLIO",
    live: null,
  },
];

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const te = useTranslations("portfolioExtra");
  const tp = useTranslations("portfolioProjects");
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
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

          {/* Filter tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mb-10 flex flex-wrap justify-center gap-2">
            {categoryKeys.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors"
                style={{ color: active === cat ? "white" : "var(--text-secondary)" }}>
                {active === cat && (
                  <motion.div layoutId="active-tab" className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                {active !== cat && <span className="absolute inset-0 rounded-full border border-border" />}
                <span className="relative">{t(cat as "all")}</span>
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article key={project.id} layout
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }} className="glass-card group relative overflow-hidden">
                  <Link href={`/portfolio/${project.id}`} className="absolute inset-0 z-10" aria-label={`View ${project.id} case study`} />
                  <div className="relative flex h-40 items-center justify-center overflow-hidden"
                    style={{ background: `${project.color}12` }}>
                    <div className="bg-dots absolute inset-0 opacity-20" />
                    <motion.div whileHover={{ scale: 1.15, rotate: 5 }} transition={{ duration: 0.3 }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}>
                      <Layers size={28} style={{ color: project.color }} />
                    </motion.div>
                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{ background: "rgba(5,10,15,0.7)", backdropFilter: "blur(4px)" }}>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20" aria-label="GitHub">
                        <GitBranch size={14} />
                      </a>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20" aria-label="Live">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 rounded-full bg-card/80 px-2 py-0.5 text-xs text-text-muted backdrop-blur-sm">
                      {project.year}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1.5 text-sm font-bold text-foreground">{tp(`${project.id}.title`)}</h3>
                    <p className="mb-4 text-xs leading-relaxed text-text-secondary line-clamp-2">{tp(`${project.id}.description`)}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-text-muted">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
