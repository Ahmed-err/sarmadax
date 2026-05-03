"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";
import { useTransition } from "react";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "en" ? "ar" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      disabled={isPending}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-9 w-[52px] items-center justify-center rounded-full border border-border text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
      aria-label={locale === "en" ? "Switch to Arabic" : "التحويل للإنجليزية"}
    >
      {locale === "en" ? "AR" : "EN"}
    </motion.button>
  );
}
