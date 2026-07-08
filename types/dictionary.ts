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
  /** Optional trailing phrase of `title` to emphasize with a soft marker. Must be an exact suffix of `title`. */
  titleAccent?: string;
  description?: string;
  /** Optional mono keyword tags rendered under the heading, banner-style. */
  tags?: string[];
}

export interface Discipline {
  year: string;
  title: string;
  description: string;
}

export interface CompanyChip {
  name: string;
  /** Optional brand logo (path under /public). Shown instead of the name. */
  logo?: string;
  /**
   * Optional per-logo size override (Tailwind `h-*`/`max-w-*`). Logos ship with
   * different amounts of baked-in padding and aspect ratios, so a single group
   * height makes them look mismatched; this tunes each one to a harmonious size.
   */
  logoClass?: string;
}

export interface AboutCopy extends SectionCopy {
  journeyLabel: string;
  disciplines: Discipline[];
  companiesLabel: string;
  companies: CompanyChip[];
  projectsForLabel: string;
  projectsFor: CompanyChip[];
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
    backToHome: string;
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
  ticker: string[];
  personalInfo: PersonalInfo;
  hero: {
    /** Small kicker above the headline — her role. */
    sectionLabel: string;
    headlinePre: string;
    headlineAccent: string;
    subtitle: string;
    ctaProjects: string;
    ctaContact: string;
  };
  /** Closing contact section (portrait + greeting + CTAs). */
  contact: {
    kicker: string;
    greeting: string;
    body: string;
    cta: string;
  };
  about: AboutCopy;
  profileSummary: string;
  stats: Stat[];
  philosophy: SectionCopy;
  philosophyItems: PhilosophyPrinciple[];
  process: SectionCopy;
  processSteps: ProcessStep[];
  services: SectionCopy;
  servicesItems: ServiceCategory[];
  /** Full-width silence quote used as a transition between blocks. */
  interlude: {
    kicker: string;
    phrasePre: string;
    phraseAccent: string;
    phrasePost: string;
  };
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
    /** Aria label for the card that opens the in-site preview. Template with `{title}`. */
    previewLabel: string;
    /** CTA inside the preview modal that opens the full case on Behance. */
    viewFullCase: string;
    /** Empty state shown when a case has no preview images yet. */
    previewUnavailable: string;
    /** Informative badge: the in-site preview may look lower quality than Behance. */
    previewQualityNote: string;
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
    viewCvButton: string;
    cvModalTitle: string;
    openPdfLink: string;
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
    sendingLabel: string;
    successMessage: string;
    errorMessage: string;
    closeModalLabel: string;
  };
  footer: {
    tagline: string;
    influentialPhrase: string;
    exploreLabel: string;
    connectLabel: string;
  };
  projects: PortfolioProject[];
}
