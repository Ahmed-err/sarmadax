"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, GitBranch, ExternalLink } from "lucide-react";

const projectIds = ["electroerp", "printshop", "tajdera", "rudd"] as const;
const colors = ["#0ea5e9", "#8b5cf6", "#14b8a6", "#6366f1"];
const categories = ["ERP / SaaS", "E-Commerce", "Web App", "AI SaaS"];
const statKeys = [
  [["statsModels", "35+"], ["statsRoutes", "23+"], ["statsLang", "2"]],
  [["statsBuilder", "Visual"], ["statsPayment", "Paymob"], ["statsLang", "2"]],
  [["statsRoasts", "50+"], ["statsCategories", "4"], ["statsTiers", "4"]],
  [["statsAvail", "24/7"], ["statsBooking", "Auto"], ["statsInteg", "3+"]],
] as const;
const tagSets = [
  ["Next.js", "PostgreSQL", "Prisma", "NextAuth"],
  ["React", "Express.js", "MongoDB", "Paymob"],
  ["React", "TypeScript", "Vite", "Framer Motion"],
  ["Next.js 15", "OpenAI", "WhatsApp API", "Drizzle"],
];
const githubUrls = [
  "https://github.com/Ahmed-err/ecommerce-accounting-system",
  "https://github.com/Ahmed-err/Print-Shop",
  "https://github.com/Ahmed-err/tajdera",
  "https://github.com/Ahmed-err/Rudd",
];
const liveUrls = ["https://himmat.store", "https://harfoushprint.com", null, null];
const screenshots = [
  "/images/projects/electroerp.png",
  "/images/projects/printshop.png",
  "/images/projects/tajdera.png",
  "/images/projects/rudd.png",
];

function ProjectCard({ id, index }: { id: (typeof projectIds)[number]; index: number }) {
  const t = useTranslations(`featuredProjectsData.${id}`);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const color = colors[index];
  const githubUrl = githubUrls[index];
  const liveUrl = liveUrls[index];
  const screenshot = screenshots[index];

  const onMouseMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className="group glass-card relative overflow-hidden"
      style={{
        boxShadow: hovered ? `0 0 40px ${color}1a, 0 20px 60px rgba(0,0,0,0.3)` : undefined,
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Holographic frame border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-400 z-10"
        style={{
          background: hovered
            ? `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, ${color}20 0%, transparent 55%)`
            : "none",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Top gradient bar */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}${hovered ? "aa" : "40"}, transparent)`,
          transition: "background 0.3s",
        }}
      />

      {/* Screenshot thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={screenshot}
          alt={t("title")}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={70}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Category badge */}
        <div
          className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-xs font-medium text-white z-10"
          style={{ background: `${color}cc` }}
        >
          {categories[index]}
        </div>

        {/* Hover overlay with action buttons */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-3 z-10"
              style={{ background: "rgba(5,10,15,0.65)", backdropFilter: "blur(6px)" }}
            >
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.04 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/25"
                aria-label="GitHub"
              >
                <GitBranch size={16} />
              </motion.a>
              {liveUrl && (
                <motion.a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/25"
                  aria-label="Live"
                >
                  <ExternalLink size={16} />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 text-base font-semibold text-foreground">{t("title")}</h3>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary">{t("description")}</p>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {statKeys[index].map(([key, val]) => (
            <div key={key} className="rounded-lg p-2 text-center" style={{ background: "var(--background-secondary)" }}>
              <div className="text-sm font-bold" style={{ color }}>{val}</div>
              <div className="text-[10px] text-text-muted">{t(key as "statsModels")}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tagSets[index].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-text-secondary transition-colors"
              style={{ borderColor: hovered ? `${color}40` : undefined }}
            >
              {tag}
            </span>
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-accent hover:text-accent"
            >
              {t("viewAll")}
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projectIds.map((id, i) => (
            <ProjectCard key={id} id={id} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
