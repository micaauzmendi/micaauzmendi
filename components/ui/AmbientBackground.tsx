export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="bg-grain absolute inset-0 opacity-[0.06] dark:opacity-[0.08]" />
      <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-accent-support/[0.06] blur-3xl" />
      <div className="absolute -right-40 bottom-[-10%] h-[520px] w-[520px] rounded-full bg-accent/[0.06] blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
    </div>
  );
}
