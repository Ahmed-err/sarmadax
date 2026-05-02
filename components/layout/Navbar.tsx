"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { MagneticElement } from "@/components/shared/MagneticElement";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    setHidden(latest > 80 && latest > prev);
    if (latest < prev) setHidden(false);
  });

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/pricing", label: t("pricing") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed left-0 right-0 top-0 z-50"
        style={{ willChange: "transform" }}
      >
        <div
          className={`mx-4 mt-4 rounded-2xl transition-all duration-500 ${
            scrolled ? "glass-card shadow-lg shadow-black/20" : "border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">

            {/* Logo */}
            <MagneticElement strength={0.22}>
              <Link href="/" className="group flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Image
                    src="/images/logo/wordmark.png"
                    alt="Sarmadax"
                    width={160}
                    height={34}
                    className="h-[34px] w-auto object-contain"
                    priority
                  />
                </motion.div>
              </Link>
            </MagneticElement>

            {/* Desktop nav with liquid underline */}
            <nav
              className="relative hidden items-center gap-1 md:flex"
              aria-label="Main navigation"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  className="relative px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-foreground"
                >
                  {link.label}
                  {/* Liquid underline — travels between hovered items via layoutId */}
                  {hoveredLink === link.href && (
                    <motion.span
                      layoutId="nav-liquid-underline"
                      className="absolute inset-x-2 bottom-0 h-px"
                      style={{ background: "var(--accent)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 md:flex">
                <LanguageSwitcher />
              </div>

              <MagneticElement strength={0.28}>
                <Link
                  href="/contact"
                  className="shimmer-btn neon-btn hidden h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 md:flex"
                  style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}
                >
                  {t("startProject")}
                </Link>
              </MagneticElement>

              {/* Mobile toggle */}
              <motion.button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary md:hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isOpen ? <X size={16} /> : <Menu size={16} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            id="mobile-nav"
            className="glass-card-strong fixed left-4 right-4 top-[84px] z-40 p-5 md:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex h-11 items-center rounded-xl px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-card hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
              </div>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="shimmer-btn neon-btn flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-white"
                style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}
              >
                {t("startProject")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay — visible scrim so the menu reads as a layer above the page. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
