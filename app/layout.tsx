import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Jost } from "next/font/google";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const SITE_URL = "https://micaelaauzmendi.com";
const SITE_DESCRIPTION =
  "Micaela Auzmendi — Product Designer especializada en UX/UI, Design Systems e integración de IA en procesos de diseño de producto.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Micaela Auzmendi · Product Designer UX/UI",
    template: "%s · Micaela Auzmendi",
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Micaela Auzmendi · Product Designer UX/UI",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Micaela Auzmendi",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Micaela Auzmendi · Product Designer UX/UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Micaela Auzmendi · Product Designer UX/UI",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const heading = Jost({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${heading.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AmbientBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
