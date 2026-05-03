import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Sarmadax's portfolio of SaaS platforms, web applications, mobile apps, and AI-powered products built for clients worldwide.",
  openGraph: {
    title: "Portfolio | Sarmadax",
    description:
      "Real projects, real results. SaaS platforms, web apps, mobile apps, and AI products — see what we've built.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
