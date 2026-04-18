"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, Clock, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const t = useTranslations("contact");
  const te = useTranslations("contactExtra");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", projectType: "", budget: "", message: "" });

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", projectType: "", budget: "", message: "" });
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const projectTypes = [
    ["saas", t("projectTypes.saas")],
    ["webApp", t("projectTypes.webApp")],
    ["mobile", t("projectTypes.mobile")],
    ["design", t("projectTypes.design")],
    ["ai", t("projectTypes.ai")],
    ["ecommerce", t("projectTypes.ecommerce")],
    ["other", t("projectTypes.other")],
  ];

  const budgetRanges = [
    ["small", t("budgetRanges.small")],
    ["medium", t("budgetRanges.medium")],
    ["large", t("budgetRanges.large")],
    ["enterprise", t("budgetRanges.enterprise")],
  ];

  const infoCards = [
    { icon: Mail, title: te("emailTitle"), value: t("info.email"), href: `mailto:${t("info.email")}`, color: "#0ea5e9" },
    { icon: CheckCircle2, title: te("availabilityTitle"), value: t("info.availability"), color: "#14b8a6" },
    { icon: Clock, title: te("responseTitle"), value: t("info.response"), color: "#8b5cf6" },
    { icon: MapPin, title: te("locationTitle"), value: te("locationValue"), color: "#f59e0b" },
  ];

  const inputCls = "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30";

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <span className="text-xs font-medium text-text-secondary">{t("title")}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {te("heading1")}{" "}<span className="gradient-text">{te("heading2")}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto max-w-xl text-base text-text-secondary">
              {t("subtitle")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Info cards */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4 lg:col-span-2">
              {infoCards.map(({ icon: Icon, title, value, href, color }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08 }}
                  className="glass-card flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="mb-0.5 text-xs font-medium text-text-muted">{title}</div>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-foreground hover:text-accent transition-colors">{value}</a>
                    ) : (
                      <div className="text-sm font-medium text-foreground">{value}</div>
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="glass-card p-5" style={{ borderColor: "var(--accent)", borderWidth: "1px" }}>
                <div className="mb-2 text-sm font-semibold text-foreground">{te("readyTitle")}</div>
                <p className="text-xs leading-relaxed text-text-secondary">{te("readyDesc")}</p>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3">
              <div className="glass-card-strong p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-16 text-center">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "var(--accent-glow-strong)" }}>
                        <CheckCircle2 size={32} style={{ color: "var(--accent)" }} />
                      </motion.div>
                      <h3 className="mb-2 text-xl font-bold text-foreground">{t("form.sent")}</h3>
                      <p className="text-sm text-text-secondary">{t("info.response")}</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                            {t("form.name")} <span className="text-accent">*</span>
                          </label>
                          <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
                            placeholder={te("namePlaceholder")} className={inputCls} />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                            {t("form.email")} <span className="text-accent">*</span>
                          </label>
                          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                            placeholder={te("emailPlaceholder")} className={inputCls} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-text-secondary">{t("form.projectType")}</label>
                          <select value={form.projectType} onChange={(e) => update("projectType", e.target.value)} className={`${inputCls} appearance-none`}>
                            <option value="">{te("selectType")}</option>
                            {projectTypes.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-text-secondary">{t("form.budget")}</label>
                          <select value={form.budget} onChange={(e) => update("budget", e.target.value)} className={`${inputCls} appearance-none`}>
                            <option value="">{te("selectRange")}</option>
                            {budgetRanges.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                          {t("form.message")} <span className="text-accent">*</span>
                        </label>
                        <textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)}
                          placeholder={te("messagePlaceholder")} className={`${inputCls} resize-none`} />
                      </div>

                      {status === "error" && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                          <AlertCircle size={15} />
                          {t("form.error")}
                        </motion.div>
                      )}

                      <motion.button type="submit" disabled={status === "sending"} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                        className="shimmer-btn flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                        style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}>
                        {status === "sending" ? (
                          <>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
                            {t("form.sending")}
                          </>
                        ) : (
                          <><Send size={15} />{t("form.send")}</>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
