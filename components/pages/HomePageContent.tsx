import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Frontend } from "@/components/sections/Frontend";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Tools } from "@/components/sections/Tools";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { SetHtmlLang } from "@/components/ui/SetHtmlLang";
import type { Dictionary } from "@/types/dictionary";

export function HomePageContent({ dict }: { dict: Dictionary }) {
  return (
    <>
      <SetHtmlLang locale={dict.locale} />
      <a href="#main-content" className="sr-only-focusable">
        {dict.nav.skipToContent}
      </a>
      <TopBar phrases={dict.ticker} />
      <Header dict={dict} />
      <main id="main-content">
        <Hero dict={dict} />
        <About dict={dict} />
        <Philosophy dict={dict} />
        <Process dict={dict} />
        <Services dict={dict} />
        <Experience dict={dict} />
        <FeaturedProjects dict={dict} />
        <Skills dict={dict} />
        <Tools dict={dict} />
        <Frontend dict={dict} />
        <Education dict={dict} />
        <CTA dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
