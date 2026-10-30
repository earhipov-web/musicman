export function PageIntro({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 md:pt-28 md:pb-20">
      <h1 className="max-w-4xl font-display text-4xl leading-[1.08] font-medium tracking-tight sm:text-6xl">{title}</h1>
      <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ash sm:text-xl">{lead}</p>
    </div>
  );
}
