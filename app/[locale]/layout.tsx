import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { GoogleAnalytics } from "@next/third-parties/google";
import { WebVitals } from "@/components/shared/WebVitals";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SkipLink } from "@/components/shared/SkipLink";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { HtmlLangDir } from "@/components/shared/HtmlLangDir";
import { routing } from "@/lib/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Required for every server component in this segment tree to be static.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <ThemeProvider>
      <SmoothScroll>
        <NextIntlClientProvider messages={messages}>
          <HtmlLangDir />
          <SkipLink />
          <CustomCursor />
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </SmoothScroll>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          <WebVitals />
        </>
      )}
    </ThemeProvider>
  );
}
