import type { Dictionary } from "@/types/dictionary";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-accent-support/30 px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
        <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
          © {new Date().getFullYear()} {dict.personalInfo.name}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{dict.footer.tagline}</p>
      </div>
    </footer>
  );
}
