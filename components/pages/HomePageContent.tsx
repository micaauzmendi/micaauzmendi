import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Epilogue } from "@/components/sections/Epilogue";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Frontend } from "@/components/sections/Frontend";
import { Hero } from "@/components/sections/Hero";
import { Interlude } from "@/components/sections/Interlude";
import { Philosophy } from "@/components/sections/Philosophy";
import { Process } from "@/components/sections/Process";
import { Skills } from "@/components/sections/Skills";
import { Tools } from "@/components/sections/Tools";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SetHtmlLang } from "@/components/ui/SetHtmlLang";
import type { Dictionary } from "@/types/dictionary";

/**
 * A recruiter-first portfolio: an opening that states who she is and points
 * straight to the work, the projects surfaced early, and the supporting story
 * (process, experience, skills) below for anyone who wants the depth.
 */
export function HomePageContent({
  dict,
  caseImages,
}: {
  dict: Dictionary;
  caseImages?: Record<string, string[]>;
}) {
  return (
    <>
      <SetHtmlLang locale={dict.locale} />
      <a href="#main-content" className="sr-only-focusable">
        {dict.nav.skipToContent}
      </a>
      <Header dict={dict} />
      <main id="main-content">
        <Hero dict={dict} />

        <FeaturedProjects dict={dict} caseImages={caseImages} />
        <Experience dict={dict} />

        <Interlude dict={dict} />

        <About dict={dict} />
        <Process dict={dict} />
        <Philosophy dict={dict} />
        <Skills dict={dict} />
        <Tools dict={dict} />
        <Frontend dict={dict} />
        <Education dict={dict} />

        <Epilogue dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
