import { ArrowUpRight } from "lucide-react";
import { ProjectMarquee } from "@/components/portfolio/ProjectMarquee";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/types/dictionary";

export function FeaturedProjects({ dict }: { dict: Dictionary }) {
  const base = dict.locale === "en" ? "/en" : "";
  const featuredProjects = dict.projects.filter((project) => project.featured);

  return (
    <section id="proyectos" aria-labelledby="proyectos-heading" className="overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="proyectos-heading"
          eyebrow={dict.featuredProjects.eyebrow}
          title={dict.featuredProjects.title}
        />
      </div>

      <div className="-mx-6 mt-14 md:-mx-10">
        <ProjectMarquee projects={featuredProjects} dict={dict} />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal delay={0.15} className="mt-14 flex justify-center">
          <Button href={`${base}/proyectos`} variant="outline" className="uppercase">
            {dict.featuredProjectsUi.viewAll}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
