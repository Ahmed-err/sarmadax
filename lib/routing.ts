import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // English stays at "/", Arabic at "/ar/…" — 'as-needed' omits the prefix
  // for the default locale only.
  localePrefix: "as-needed",
});
