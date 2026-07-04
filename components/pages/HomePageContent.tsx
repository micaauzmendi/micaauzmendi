import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Epilogue } from "@/components/sections/Epilogue";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Frontend } from "@/components/sections/Frontend";
import { Interlude } from "@/components/sections/Interlude";
import { Philosophy } from "@/components/sections/Philosophy";
import { Process } from "@/components/sections/Process";
import { Prologue } from "@/components/sections/Prologue";
import { Skills } from "@/components/sections/Skills";
import { Tools } from "@/components/sections/Tools";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SetHtmlLang } from "@/components/ui/SetHtmlLang";
import type { Dictionary } from "@/types/dictionary";

/**
 * The portfolio reads as a book: a prologue that opens a question, nine chapters
 * that each answer a different one, a silent interlude at its conceptual center,
 * and an epilogue where the portrait and the greeting finally arrive.
 */
export function HomePageContent({ dict }: { dict: Dictionary }) {
  return (
    <>
      <SetHtmlLang locale={dict.locale} />
      <a href="#main-content" className="sr-only-focusable">
        {dict.nav.skipToContent}
      </a>
      <Header dict={dict} />
      <main id="main-content">
        <Prologue dict={dict} />

        <About dict={dict} numeral="I" />

        <Interlude dict={dict} />

        <Process dict={dict} numeral="II" />
        <Philosophy dict={dict} numeral="III" />
        <Experience dict={dict} numeral="IV" />
        <FeaturedProjects dict={dict} numeral="V" />
        <Skills dict={dict} numeral="VI" />
        <Tools dict={dict} numeral="VII" />
        <Frontend dict={dict} numeral="VIII" />
        <Education dict={dict} numeral="IX" />

        <Epilogue dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
