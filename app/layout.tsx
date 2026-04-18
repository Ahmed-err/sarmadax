import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { WebVitals } from "@/components/shared/WebVitals";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sarmadax — We Build Digital Products That Scale",
    template: "%s | Sarmadax",
  },
  description:
    "Sarmadax is a boutique digital agency specializing in SaaS development, custom web applications, mobile apps, UI/UX design, and AI integration. Fixed pricing. Full ownership.",
  metadataBase: new URL("https://sarmadax.com"),
  openGraph: {
    type: "website",
    siteName: "Sarmadax",
    title: "Sarmadax — We Build Digital Products That Scale",
    description:
      "Boutique digital agency. SaaS · Web Apps · Mobile · AI. Fixed pricing, full source code ownership, fast delivery.",
    url: "https://sarmadax.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarmadax — We Build Digital Products That Scale",
    description:
      "Boutique digital agency. SaaS · Web Apps · Mobile · AI. Fixed pricing, full source code ownership, fast delivery.",
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            <WebVitals />
          </>
        )}
      </body>
    </html>
  );
}
