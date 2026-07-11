import { redirect } from "next/navigation";

// The /en/proyectos interface is HIDDEN for now: the work lives in the home's
// "#proyectos" section (editorial grid with in-site preview). The code stays
// intact in ProyectosPageContent — to bring the page back, remove this redirect
// and restore the original render (see git history).
export default function ProyectosPageEn() {
  redirect("/en/#proyectos");
}
