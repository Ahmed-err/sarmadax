import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, fixed-price packages for web and app development. Spark from $1,500, Launch from $4,500, or a fully custom Scale engagement. 50/50 payment — you own everything.",
  openGraph: {
    title: "Pricing | Sarmadax",
    description:
      "Fixed-price packages with no surprises. Spark $1,500 · Launch $4,500 · Scale custom. Full source code ownership on every project.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
