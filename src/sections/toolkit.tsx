import { toolkit } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function Toolkit() {
  return (
    <section aria-label="Toolkit" className="px-gutter pt-[clamp(48px,6vw,80px)]">
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-12 border-b border-line">
        {toolkit.map((group) => (
          <Reveal key={group.label} className="flex flex-col gap-1.5 border-t border-line py-4.5">
            <dt className="label">{group.label}</dt>
            <dd>{group.items}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
