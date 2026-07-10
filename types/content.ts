export interface SocialLink {
  label: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  linkedin: SocialLink;
  behance: SocialLink;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  yearLabel: string;
  projects: string[];
  /** One elegant line summarizing the impact of this chapter of the career. */
  impact?: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  /** Short strategic framing of the capability, shown above the tags. */
  summary?: string;
  items: string[];
}

export interface Certification {
  title: string;
  /** Optional issuing institution, shown under the title like the degree. */
  institution?: string;
  period: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface EducationData {
  degree: {
    title: string;
    institution: string;
    period: string;
  };
  certifications: Certification[];
  languages: Language[];
}

export interface PhilosophyPrinciple {
  icon: IconName;
  title: string;
  description: string;
}

export interface ProcessStep {
  icon: IconName;
  step: string;
  title: string;
  description: string;
}

export type ProjectCategory = "UX/UI" | "Brands";

/** Discipline/support tags used by the /proyectos filter chips. A project can
 *  carry several (e.g. a re-branding that also shipped a UX/UI flow). Kept as
 *  language-neutral ids; the chip labels are localized in the dictionary. */
export type ProjectTag =
  | "ux-ui"
  | "branding"
  | "mobile"
  | "web-sistemas"
  | "ecommerce"
  | "textil";

export interface PortfolioProject {
  id: string;
  title: string;
  category: ProjectCategory;
  /** Optional discipline label shown on the card in place of `category`
   *  (e.g. "Diseño Textil"). `category` is still used for filtering. */
  label?: string;
  /** Filter chips match against these. Language-neutral ids. */
  tags?: ProjectTag[];
  year?: string;
  description: string;
  image: string;
  behanceUrl: string;
  featured?: boolean;
}

export type IconName =
  | "PenTool"
  | "Layers"
  | "NotebookPen"
  | "Code2"
  | "MessageSquare"
  | "Sparkles"
  | "FileCode"
  | "Palette"
  | "Braces"
  | "Atom"
  | "Triangle"
  | "Shield"
  | "LayoutGrid"
  | "ShoppingBag"
  | "Megaphone"
  | "Brush"
  | "Compass"
  | "Target"
  | "CheckCircle2"
  | "Rocket"
  | "Users"
  | "Bot";

export interface IconItem {
  name: string;
  icon: IconName;
}

export interface ServiceCategory {
  category: string;
  icon: IconName;
  items: string[];
}
