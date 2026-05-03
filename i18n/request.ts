import { getRequestConfig } from "next-intl/server";
import { routing } from "@/lib/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is the `[locale]` segment value from the URL.
  let locale = await requestLocale;

  // Fall back to default if the segment is missing or invalid.
  if (!locale || !routing.locales.includes(locale as "en" | "ar")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
