import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent, fixed-price packages for SaaS development, web apps, mobile apps, AI integration, and more. No hidden fees — pick a plan and start building.",
  openGraph: {
    title: "Pricing | Sarmadax",
    description: "Fixed-price packages. SaaS, web apps, mobile, AI, design — pick a plan or customize. No surprises.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
