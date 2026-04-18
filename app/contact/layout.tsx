import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Sarmadax. Tell us about your idea and get a fixed-price proposal within 24 hours. No commitment, no pitch — just an honest conversation.",
  openGraph: {
    title: "Contact | Sarmadax",
    description:
      "Have a project in mind? Get a fixed-price proposal within 24 hours. No commitment required.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
