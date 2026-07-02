# Portfolio Interactivo — Micaela Auzmendi

CV interactivo de una sola página + portfolio completo, en **español e inglés**, construido como un producto digital premium: editorial, visual, con animaciones sutiles y una paleta cálida propia. Todo el contenido vive en dos diccionarios de datos editables (uno por idioma), separados del código de los componentes.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens de color/tipografía en `app/globals.css` vía `@theme`, con soporte de modo claro/oscuro por variables CSS)
- **Framer Motion** para animaciones (fade/blur/slide en scroll, contador animado, header con transición, microinteracciones)
- **next-themes** para el toggle de modo oscuro (sin flicker de hidratación)
- **Lucide React** para iconografía lineal
- **tailwind-merge** para resolver conflictos de clases Tailwind entre componentes base y overrides
- Fuentes vía `next/font/google`: **Jost** (títulos), **DM Sans** (cuerpo), **JetBrains Mono** (labels/tags)
- Sin backend — sitio 100% estático (`next build` genera páginas estáticas, incluidas las de `/en`)

## Correr el proyecto localmente

Requisitos: [Node.js](https://nodejs.org) 20 o superior.

```bash
npm install
npm run dev
```

Esto abre el sitio en `http://localhost:3000`. Los cambios se reflejan al instante (hot reload).

Antes de subir cambios, conviene correr:

```bash
npm run lint    # ESLint + reglas de accesibilidad (jsx-a11y)
npm run build   # build de producción + chequeo de tipos
```

## Deploy en Vercel (recomendado)

Vercel detecta automáticamente que es un proyecto Next.js y no requiere configuración manual.

1. Subí este proyecto a un repositorio de GitHub (o GitLab/Bitbucket).
2. Entrá a [vercel.com](https://vercel.com) e iniciá sesión (podés usar tu cuenta de GitHub).
3. Click en **"Add New… → Project"** y seleccioná el repositorio.
4. Vercel detecta el framework (Next.js) y build command automáticamente.
5. Click en **Deploy**. En 1-2 minutos vas a tener una URL pública.
6. En **Settings → Domains** podés conectar tu dominio propio.

Cada `git push` a la rama principal redeploya automáticamente.

## Idiomas (Español / Inglés)

El sitio completo existe en dos idiomas, como rutas paralelas — sin librerías de i18n:

- **Español** (default): `/` y `/proyectos`
- **Inglés**: `/en` y `/en/proyectos`

Un botón "EN" / "ES" en el header cambia de idioma manteniendo la página actual. Cada ruta importa el diccionario correspondiente y le pasa el mismo contenido a los mismos componentes — no hay componentes duplicados por idioma.

## Estructura del proyecto

```
app/
├── layout.tsx           # fonts, metadata (SEO/OG) por defecto en español, ThemeProvider
├── page.tsx              # landing en español
├── en/page.tsx            # landing en inglés (mismo componente, dict distinto)
├── proyectos/page.tsx      # portfolio completo en español
├── en/proyectos/page.tsx    # portfolio completo en inglés
└── globals.css              # tokens de color (claro/oscuro), tipografía, texturas, utilidades base

components/
├── ui/                  # primitivas reutilizables: Button, Card, Tag, Reveal, AnimatedCounter,
│                          ThemeToggle, DecorativeLine, AmbientBackground, SetHtmlLang
├── layout/               # Header (nav + selector de idioma + menú mobile) y Footer
├── sections/              # las 12 secciones de la landing (Hero, About, Philosophy, Services, ...)
├── portfolio/              # ProjectIndexList (filtro por categoría + listado editorial)
└── pages/                   # HomePageContent y ProyectosPageContent — el contenido real de cada
                                página, reutilizado por las rutas /es y /en

data/dictionaries/
├── es.ts                 # TODO el contenido en español: CV, filosofía, proceso, servicios,
│                           los 17 proyectos reales de Behance, microcopy de UI
├── en.ts                  # la traducción completa al inglés, misma forma que es.ts
└── index.ts                 # getDictionary(locale) — elige uno u otro

types/
├── content.ts            # interfaces de los datos (experiencia, proyectos, skills, etc.)
└── dictionary.ts           # forma completa del diccionario (Dictionary) que consume cada sección

lib/
├── icons.ts               # mapa nombre-de-ícono → componente Lucide (los diccionarios guardan
│                            el nombre como string, nunca el componente, para poder pasarlo
│                            a Client Components sin romper la serialización de React Server Components)
├── format.ts                # formatTemplate() — interpola "{count}", "{title}", etc. en templates
├── navigation.ts              # buildNavLinks(dict) — arma los links del header según el idioma
└── publicFile.ts                # publicFileExists() — chequea si una foto ya fue subida a /public

public/
├── projects/              # imágenes de portada de los 17 proyectos (descargadas de Behance)
└── photos/                  # fotos personales — vacía hasta que subas las tuyas (ver abajo)
```

## Cómo actualizar el contenido (CV, filosofía, proceso, servicios, skills, educación)

Todo el texto vive en **`data/dictionaries/es.ts`** y su espejo **`data/dictionaries/en.ts`** — misma forma, contenido traducido. Agregar una experiencia nueva, por ejemplo, es agregar un objeto a `experienceItems` **en los dos archivos** — los componentes lo renderizan automáticamente en ambos idiomas.

Si en algún campo no tenés todavía la traducción al inglés, dejá el mismo texto en español en `en.ts` como placeholder — nunca dejes el campo vacío o el tipo de TypeScript se queja.

## Cómo actualizar el portfolio (los 17 proyectos)

Los proyectos viven en el array `projects` dentro de **cada diccionario** (`es.ts` / `en.ts`), con los datos reales publicados en [behance.net/micaauzmendi](https://www.behance.net/micaauzmendi). Cada uno tiene: `title`, `category` (`"UX/UI"` | `"Branding"` | `"Branding & UX/UI"`), `description`, `image` (ruta en `/public/projects`), `behanceUrl`, y opcionalmente `featured: true` para que aparezca también en la landing (sección "Proyectos destacados", actualmente 6 casos elegidos a mano).

- **Agregar un proyecto nuevo**: sumá un objeto a `projects` en los dos diccionarios y su imagen de portada a `public/projects/`.
- **Cambiar cuáles se destacan en la landing**: marcá/desmarcá `featured: true` en el proyecto correspondiente.
- **Actualizar una imagen**: reemplazá el archivo en `public/projects/` (mismo nombre) — se actualiza en los dos idiomas a la vez, ya que ambos diccionarios apuntan a la misma imagen.

## Cómo subir tus fotos personales

El sitio ya tiene los espacios reservados y el código listo — solo falta que arrastres los archivos a `public/photos/` con estos nombres exactos:

- **`public/photos/retrato-principal.jpg`** → tu foto principal (la del CV), se muestra grande al lado del texto del Hero.
- **`public/photos/yo-no-fui-emprendedora.jpg`** → la foto de tu época de emprendedora, se muestra en la línea de tiempo de Experiencia, en la entrada de "Yo No Fui Diseño".

En cuanto el archivo exista con ese nombre, aparece automáticamente (no hace falta tocar código ni volver a hacer build en desarrollo). Si preferís otro nombre de archivo, actualizá `PORTRAIT_PATH` en `components/pages/HomePageContent.tsx` o el campo `photo` de la entrada `yonofui` en ambos diccionarios.

## Pendientes antes de publicar

- **Fotos personales**: ver sección de arriba — todavía no están subidas.
- **CV descargable**: el botón "Descargar CV" / "Download CV" apunta a `public/cv-mica-auzmendi.pdf`, que todavía no existe — hay que agregar el PDF real ahí (uno solo, se usa en los dos idiomas).
- **Dominio real**: `app/layout.tsx` y `app/sitemap.ts` usan `https://micaelaauzmendi.com` como placeholder para las metadatas de Open Graph — actualizar cuando se defina el dominio final.

## Nota sobre el contenido

El texto del CV (experiencia, skills, educación) está tomado literal del CV real. Los proyectos del portfolio usan los títulos, categorías, descripciones e imágenes reales publicados en Behance — no son contenido inventado. Filosofía de diseño, proceso de Product Design y la sección de Servicios son copy nueva, autorada para este sitio en base al perfil profesional real. La traducción al inglés (`en.ts`) mantiene los nombres propios (empresas, proyectos, herramientas) sin traducir.
