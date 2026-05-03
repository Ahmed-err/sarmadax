"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

// Updates the <html> lang + dir attributes after client-side hydration.
// For the default locale (en) this is a no-op since the root layout already
// sets lang="en". For Arabic, this ensures correct RTL behaviour post-hydration.
export function HtmlLangDir() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
