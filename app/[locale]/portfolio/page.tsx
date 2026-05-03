"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/navigation";
import { ExternalLink, GitBranch } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projects, type ProjectCategory } from "@/lib/projects";

type Category = "all" | ProjectCategory;

const categoryKeys: Category[] = ["all", "web", "saas", "ecommerce", "finance"];

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const te = useTranslations("portfolioExtra");
  const tp = useTranslations("portfolioProjects");
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28 pb-24">
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
              <button key={cat} type="button" onClick={() => setActive(cat)}
                aria-pressed={active === cat}
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

          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article key={project.id} layout
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }} className="glass-card group relative overflow-hidden">
                  <Link href={`/portfolio/${project.id}`} className="absolute inset-0 z-10" aria-label={`View ${project.id} case study`} />
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.screenshot}
                      alt={tp(`${project.id}.title`)}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={70}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
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
                    <div className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-medium text-white z-20"
                      style={{ background: `${project.color}cc` }}>
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
