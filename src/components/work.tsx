"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { projects, type Project, type ProjectId } from "@/content/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ButtonLink } from "./button-link";
import { FreeFinedDemo } from "./demos/freefined-demo";
import { PabloDemo } from "./demos/pablo-demo";
import { TarotDemo } from "./demos/tarot-demo";
import { Reveal } from "./reveal";

const demos: Record<ProjectId, ReactNode> = {
  pablo: <PabloDemo />,
  freefined: <FreeFinedDemo />,
  "tarot-reader": <TarotDemo />,
};

const pad = (n: number) => String(n).padStart(2, "0");

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  return (
    <article className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-center gap-[clamp(28px,4vw,64px)] border-t border-line px-gutter py-[clamp(40px,6vw,64px)] group-data-[pinned=true]:h-full group-data-[pinned=true]:w-screen group-data-[pinned=true]:shrink-0 group-data-[pinned=true]:grid-cols-2 group-data-[pinned=true]:border-t-0 group-data-[pinned=true]:pt-30 group-data-[pinned=true]:pb-14">
      <div className="flex min-w-0 flex-col gap-5.5">
        <p className="label">
          {pad(index + 1)} / {project.kicker}
        </p>
        <h3 className="display text-[clamp(52px,7.6vw,124px)]">{project.title}</h3>
        <p className="max-w-[30em] text-[clamp(19px,1.7vw,24px)] leading-[1.35] text-pretty">{project.pitch}</p>
        <ul className="border-b border-line text-base leading-[1.4] text-muted">
          {project.points.map((point) => (
            <li key={point} className="border-t border-line py-2.5">
              {point}
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-full border border-line px-2.5 py-1.5 font-mono text-[12.5px] text-muted">
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <ButtonLink variant="fill" href={project.live.href} target="_blank" rel="noreferrer">
            {project.live.label}
          </ButtonLink>
          <ButtonLink href={project.repo} target="_blank" rel="noreferrer">
            GitHub
          </ButtonLink>
        </div>
      </div>
      {demos[project.id]}
    </article>
  );
}

/**
 * Projects section. On large screens the section pins and vertical scroll drives
 * a horizontal track; on small screens the panels simply stack.
 */
export function Work() {
  const ref = useRef<HTMLElement>(null);
  const pinned = useMediaQuery(
    "(min-width: 960px) and (min-height: 660px) and (prefers-reduced-motion: no-preference)",
  );
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const last = projects.length - 1;
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${last * 100}vw`]);

  useMotionValueEvent(scrollYProgress, "change", (value) => setActive(Math.round(value * last)));

  return (
    <>
      <div
        id="work"
        className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 px-gutter pb-[clamp(28px,4vw,48px)]"
      >
        <Reveal>
          <h2 className="display text-[clamp(46px,7.4vw,112px)]">Selected work</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[30ch] text-muted">Three personal projects, each live and open source.</p>
        </Reveal>
      </div>

      <section
        ref={ref}
        aria-label="Projects"
        data-pinned={pinned}
        className="group relative"
        style={pinned ? { height: `calc(100svh + ${last * 100}vw)` } : undefined}
      >
        <div className="group-data-[pinned=true]:sticky group-data-[pinned=true]:top-0 group-data-[pinned=true]:h-svh group-data-[pinned=true]:overflow-hidden">
          {pinned && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-19 z-10 flex items-center gap-4.5 px-gutter label"
            >
              <span className="tabular-nums">
                {pad(active + 1)} / {pad(projects.length)}
              </span>
              <span className="relative h-px flex-1 bg-line">
                <motion.span
                  style={{ scaleX: scrollYProgress }}
                  className="absolute inset-x-0 -inset-y-px origin-left bg-accent-ink"
                />
              </span>
              <span>Keep scrolling</span>
            </div>
          )}
          <motion.div
            style={pinned ? { x } : undefined}
            className="flex flex-col group-data-[pinned=true]:h-full group-data-[pinned=true]:flex-row group-data-[pinned=true]:will-change-transform"
          >
            {projects.map((project, index) => (
              <ProjectPanel key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
