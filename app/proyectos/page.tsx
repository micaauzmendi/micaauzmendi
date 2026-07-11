import { redirect } from "next/navigation";

// La interfaz /proyectos está OCULTA por ahora: los trabajos viven en la
// sección "#proyectos" del home (grilla editorial con vista previa in-site).
// El código sigue intacto en ProyectosPageContent — para reactivar la página,
// borrá este redirect y restaurá el render original (ver historial de git).
export default function ProyectosPage() {
  redirect("/#proyectos");
}
