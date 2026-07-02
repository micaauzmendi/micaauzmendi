import type {
  EducationData,
  ExperienceEntry,
  IconItem,
  PersonalInfo,
  PhilosophyPrinciple,
  PortfolioProject,
  ProcessStep,
  ServiceCategory,
  SkillCategory,
  Stat,
} from "@/types/content";

export type Locale = "es" | "en";

export interface SectionCopy {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface Dictionary {
  locale: Locale;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    sobreMi: string;
    proceso: string;
    servicios: string;
    experiencia: string;
    portfolio: string;
    skills: string;
    contacto: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    mobileNav: string;
    switchToLanguageLabel: string;
    switchToLanguageShort: string;
  };
  theme: {
    toLight: string;
    toDark: string;
  };
  personalInfo: PersonalInfo;
  hero: {
    sectionLabel: string;
    headlinePre: string;
    headlineAccent: string;
    headlinePost: string;
    ctaProjects: string;
    ctaContact: string;
    nextSectionLabel: string;
  };
  about: SectionCopy;
  profileSummary: string;
  stats: Stat[];
  philosophy: SectionCopy;
  philosophyItems: PhilosophyPrinciple[];
  process: SectionCopy;
  processSteps: ProcessStep[];
  services: SectionCopy;
  servicesItems: ServiceCategory[];
  experience: SectionCopy;
  experienceItems: ExperienceEntry[];
  experienceUi: {
    seeMore: string;
    seeLess: string;
  };
  featuredProjects: SectionCopy;
  featuredProjectsUi: {
    /** Template with a `{count}` placeholder. */
    viewAll: string;
    /** Template with a `{title}` placeholder. */
    caseStudyLabel: string;
  };
  portfolioPage: {
    eyebrow: string;
    /** Template with a `{count}` placeholder. */
    title: string;
    description: string;
    behanceLinkLabel: string;
    filterAllLabel: string;
    filterGroupLabel: string;
  };
  skills: SectionCopy;
  skillsItems: SkillCategory[];
  tools: SectionCopy;
  toolsItems: IconItem[];
  frontend: SectionCopy;
  frontendItems: IconItem[];
  education: SectionCopy;
  educationData: EducationData;
  educationUi: {
    degree: string;
    certifications: string;
    languages: string;
  };
  cta: {
    eyebrow: string;
    headlinePre: string;
    headlineAccent: string;
    headlinePost: string;
    responsePromise: string;
    emailButton: string;
    downloadCvButton: string;
    linkedinLabel: string;
    behanceLabel: string;
    modalTitle: string;
    modalDescription: string;
    nameLabel: string;
    namePlaceholder: string;
    emailFieldLabel: string;
    emailFieldPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    defaultMessage: string;
    whatsappButton: string;
    sendEmailButton: string;
    closeModalLabel: string;
  };
  footer: {
    tagline: string;
  };
  projects: PortfolioProject[];
}
