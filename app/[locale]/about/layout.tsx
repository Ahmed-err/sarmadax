import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sarmadax is a boutique digital agency founded by Ahmed — a full-stack software engineer and graphic designer. Learn about our story, values, and the technology we build with.",
  openGraph: {
    title: "About | Sarmadax",
    description:
      "Founded by a developer who designs and a designer who codes. Learn the story behind Sarmadax.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
