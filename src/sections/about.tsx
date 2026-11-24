import { aboutCopy, facts } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-end gap-x-24 gap-y-10 px-gutter pt-[clamp(88px,12vw,168px)]"
    >
      <Reveal>
        <h2 className="display text-[clamp(46px,7.4vw,112px)]">{aboutCopy.heading}</h2>
      </Reveal>
      <Reveal className="flex flex-col gap-7">
        <p className="max-w-[34em] text-[clamp(20px,2vw,28px)] leading-[1.3] font-medium text-pretty">
          {aboutCopy.bio}
        </p>
        <dl className="flex flex-wrap gap-x-12 gap-y-5.5">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1">
              <dt className="label">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
