import { experienceNote, roles } from "@/content/site";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-[clamp(28px,4vw,48px)] px-gutter pt-[clamp(88px,12vw,168px)]">
      <Reveal>
        <h2 className="display text-[clamp(46px,7.4vw,112px)]">Experience</h2>
      </Reveal>
      <div className="border-b border-line">
        {roles.map((role, index) => (
          <Reveal key={role.company} delay={index * 0.08}>
            <div className="group/row grid grid-cols-1 items-baseline gap-x-6 gap-y-1.5 border-t border-line py-6.5 transition-[padding] duration-400 ease-soft hover:pl-4 sm:grid-cols-[90px_minmax(0,1fr)] lg:grid-cols-[120px_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1.6fr)]">
              <p className="label">{role.period}</p>
              <h3 className="font-display text-[clamp(30px,3.6vw,52px)] leading-none font-bold tracking-[-0.03em] transition-colors duration-300 group-hover/row:text-accent-ink">
                {role.company}
              </h3>
              <p className="font-medium sm:col-start-2 lg:col-start-auto">{role.title}</p>
              <p className="text-muted sm:col-start-2 lg:col-start-auto">{role.summary}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="max-w-[34em] text-[clamp(20px,2vw,28px)] leading-[1.3] font-medium text-pretty">
          {experienceNote}
        </p>
      </Reveal>
    </section>
  );
}
