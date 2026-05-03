import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/sections/HeroSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { StatsSection } from "@/sections/StatsSection";
import { WhyUsSection } from "@/sections/WhyUsSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { FeaturedProjectsSection } from "@/sections/FeaturedProjectsSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { CTASection } from "@/sections/CTASection";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <FeaturedProjectsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
