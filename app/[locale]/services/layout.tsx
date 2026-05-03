import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end digital services: SaaS development, custom web apps, mobile apps, UI/UX design, AI integration, and more. Fixed pricing, full source code ownership.",
  openGraph: {
    title: "Services | Sarmadax",
    description:
      "SaaS development, web apps, mobile, AI integration, and design — all under one roof. Fixed-price packages, fast delivery.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
