import fs from "node:fs";
import path from "node:path";

/**
 * Vista previa de cada caso dentro del sitio (sin salir a Behance).
 *
 * Las imágenes viven en `public/projects/<carpeta>/`. Como Mica nombra las
 * carpetas de forma descriptiva (p. ej. "4.Caso de estudio - Migraciones"),
 * el mapa `CASE_FOLDERS` asocia cada `id` de proyecto con su carpeta. Para
 * sumar un caso nuevo: subí la carpeta a `public/projects/` y agregá una línea
 * acá con `id: "nombre exacto de la carpeta"`.
 *
 * Orden de las imágenes dentro del caso (ver `compareFiles`):
 *   1) las que digan "Hero"/"Portada" van primero,
 *   2) las numeradas (`01 …`, `02 …`) en orden numérico,
 *   3) el resto, alfabético,
 *   4) las que digan "Footer"/"Cierre" van al final.
 * Para controlar el orden con precisión, prefijá los archivos con un número.
 */

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");
const IMAGE_RE = /\.(png|jpe?g|webp|avif|gif)$/i;

const CASE_FOLDERS: Record<string, string> = {
  ember: "1.Caso de Estudio - Ember",
  savia: "2.Caso de Estudio- Savia",
  stakeholders: "3.Caso de estudio - Stakehoders",
  migraciones: "4.Caso de estudio - Migraciones",
  fronteras: "5.Caso de estudio - Fronteras",
  arbolado: "6.Proyecto Arbolado GCBA",
  khalipa: "7.Caso de Estudio - khalipa",
  sisgea: "8.Caso de Estudio - Sisgea",
};

function sortKey(file: string) {
  const base = file.replace(IMAGE_RE, "").trim().toLowerCase();
  const numMatch = base.match(/^(\d+)/);
  let group = 2; // resto (alfabético)
  if (/(hero|portada)/.test(base)) group = 0;
  else if (/(footer|cierre)/.test(base)) group = 3;
  else if (numMatch) group = 1;
  return { group, num: numMatch ? Number.parseInt(numMatch[1], 10) : 0, base };
}

function compareFiles(a: string, b: string) {
  const ka = sortKey(a);
  const kb = sortKey(b);
  if (ka.group !== kb.group) return ka.group - kb.group;
  if (ka.group === 1 && ka.num !== kb.num) return ka.num - kb.num;
  return ka.base.localeCompare(kb.base, undefined, { numeric: true });
}

/** Rutas públicas de las imágenes del caso `id`, ordenadas. Vacío si no hay carpeta. */
export function getCaseImages(id: string): string[] {
  const folder = CASE_FOLDERS[id];
  if (!folder) return [];
  try {
    return fs
      .readdirSync(path.join(PROJECTS_DIR, folder))
      .filter((file) => IMAGE_RE.test(file))
      .sort(compareFiles)
      .map((file) => `/projects/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`);
  } catch {
    return [];
  }
}

/** Mapa `{ [id]: rutas[] }` para el conjunto de ids indicado. */
export function getCaseImagesMap(ids: string[]): Record<string, string[]> {
  return Object.fromEntries(ids.map((id) => [id, getCaseImages(id)]));
}
