import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { projectMap, projects } from "@/lib/projects";
import { CaseStudyClient } from "@/components/pages/CaseStudyClient";

export async function generateStaticParams() {
  return ["en", "ar"].flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.id }))
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projectMap[slug];
  if (!project) notFound();

  return <CaseStudyClient slug={slug} project={project} />;
}
