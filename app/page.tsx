import { HomePageContent } from "@/components/pages/HomePageContent";
import { getDictionary } from "@/data/dictionaries";

export default function HomePage() {
  return <HomePageContent dict={getDictionary("es")} />;
}
