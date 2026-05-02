// Single source of truth for portfolio project metadata.
// i18n strings live in messages/{en,ar}.json under `caseStudies.<id>` /
// `portfolioProjects.<id>` / `featuredProjectsData.<id>`.

export type ProjectCategory = "web" | "saas" | "ecommerce" | "finance";

export interface Project {
  id: string;
  category: ProjectCategory;
  year: string;
  color: string;
  tags: string[];
  github: string;
  live: string | null;
  screenshot: string;
}

export const projects: Project[] = [
  {
    id: "electroerp",
    category: "saas",
    year: "2026",
    color: "#0ea5e9",
    tags: ["Next.js", "PostgreSQL", "Prisma", "NextAuth", "Cloudinary", "Stripe", "Nodemailer"],
    github: "https://github.com/Ahmed-err/ecommerce-accounting-system",
    live: "https://himmat.store",
    screenshot: "/images/projects/electroerp.png",
  },
  {
    id: "printshop",
    category: "ecommerce",
    year: "2026",
    color: "#8b5cf6",
    tags: ["React", "Express.js", "MongoDB", "Paymob", "Cloudinary", "Twilio", "Railway"],
    github: "https://github.com/Ahmed-err/Print-Shop",
    live: "https://harfoushprint.com",
    screenshot: "/images/projects/printshop.png",
  },
  {
    id: "tajdera",
    category: "finance",
    year: "2026",
    color: "#14b8a6",
    tags: ["React", "TypeScript", "Vite", "Framer Motion", "Tailwind CSS", "LocalStorage"],
    github: "https://github.com/Ahmed-err/tajdera",
    live: null,
    screenshot: "/images/projects/tajdera.png",
  },
  {
    id: "rudd",
    category: "saas",
    year: "2026",
    color: "#6366f1",
    tags: ["Next.js 15", "OpenAI", "WhatsApp Cloud API", "Google Calendar API", "Drizzle ORM", "Clerk", "Inngest", "Neon Postgres"],
    github: "https://github.com/Ahmed-err/Rudd",
    live: null,
    screenshot: "/images/projects/rudd.png",
  },
  {
    id: "portfolio",
    category: "web",
    year: "2026",
    color: "#f59e0b",
    tags: ["Next.js", "TypeScript", "Framer Motion", "next-intl", "Tailwind CSS", "Resend"],
    github: "https://github.com/Ahmed-err/SE-PORTFOLIO",
    live: null,
    screenshot: "/images/projects/seportfolio.png",
  },
];

export const projectIds = projects.map((p) => p.id);
export const projectMap = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<string, Project>;
