"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, Clock, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const t = useTranslations("contact");
  const te = useTranslations("contactExtra");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", projectType: "", budget: "", message: "" });
  // Honeypot field — kept in state so React owns the value, but never shown
  // and never sent by humans. If populated, the API silently no-ops.
  const [honeypot, setHoneypot] = useState("");

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
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

  const WhatsAppIcon = () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  const infoCards = [
    { icon: Mail,          title: te("emailTitle"),        value: t("info.email"),        href: `mailto:${t("info.email")}`,          color: "#0ea5e9" },
    { icon: WhatsAppIcon,  title: te("whatsappTitle"),     value: t("info.whatsapp"),     href: "https://wa.me/201094985025",           color: "#25D366" },
    { icon: Phone,         title: te("phoneTitle"),        value: t("info.phone"),        href: "tel:+201094985025",                   color: "#14b8a6" },
    { icon: CheckCircle2,  title: te("availabilityTitle"), value: t("info.availability"),                                              color: "#8b5cf6" },
    { icon: Clock,         title: te("responseTitle"),     value: t("info.response"),                                                  color: "#f59e0b" },
    { icon: MapPin,        title: te("locationTitle"),     value: te("locationValue"),                                                 color: "#64748b" },
  ];

  const inputCls = "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30";

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main id="main" className="min-h-screen pt-28 pb-24">
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
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} noValidate className="flex flex-col gap-4">
                      {/* Honeypot — hidden from humans/AT, irresistible to naive bots. */}
                      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                        <label htmlFor="website">Website (leave empty)</label>
                        <input
                          id="website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="cf-name" className="mb-1.5 block text-xs font-medium text-text-secondary">
                            {t("form.name")} <span className="text-accent">*</span>
                          </label>
                          <input required id="cf-name" name="name" type="text" autoComplete="name" maxLength={120}
                            value={form.name} onChange={(e) => update("name", e.target.value)}
                            placeholder={te("namePlaceholder")} className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="cf-email" className="mb-1.5 block text-xs font-medium text-text-secondary">
                            {t("form.email")} <span className="text-accent">*</span>
                          </label>
                          <input required id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254}
                            value={form.email} onChange={(e) => update("email", e.target.value)}
                            placeholder={te("emailPlaceholder")} className={inputCls} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="cf-project-type" className="mb-1.5 block text-xs font-medium text-text-secondary">{t("form.projectType")}</label>
                          <select id="cf-project-type" name="projectType" value={form.projectType} onChange={(e) => update("projectType", e.target.value)} className={`${inputCls} appearance-none`}>
                            <option value="">{te("selectType")}</option>
                            {projectTypes.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="cf-budget" className="mb-1.5 block text-xs font-medium text-text-secondary">{t("form.budget")}</label>
                          <select id="cf-budget" name="budget" value={form.budget} onChange={(e) => update("budget", e.target.value)} className={`${inputCls} appearance-none`}>
                            <option value="">{te("selectRange")}</option>
                            {budgetRanges.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-medium text-text-secondary">
                          {t("form.message")} <span className="text-accent">*</span>
                        </label>
                        <textarea required id="cf-message" name="message" rows={5} maxLength={5000}
                          value={form.message} onChange={(e) => update("message", e.target.value)}
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
