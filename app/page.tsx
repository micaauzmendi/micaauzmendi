import { HomePageContent } from "@/components/pages/HomePageContent";
import { getDictionary } from "@/data/dictionaries";
import { getCaseImagesMap } from "@/lib/caseImages";

const dict = getDictionary("es");
const caseImages = getCaseImagesMap(dict.projects.map((project) => project.id));

export default function HomePage() {
  return <HomePageContent dict={dict} caseImages={caseImages} />;
}
