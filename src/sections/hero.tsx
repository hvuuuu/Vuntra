"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { heroCopy, site } from "@/content/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "22vh"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.1]);

  let letterIndex = 0;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[72svh] flex-col justify-end gap-[clamp(28px,4vw,56px)] px-gutter pt-30 pb-[clamp(40px,6vw,72px)] sm:min-h-[88svh]"
    >
      <motion.h1
        aria-label={site.name}
        style={{ y, scale, opacity }}
        className="origin-bottom-left display text-[clamp(56px,11.4vw,176px)]"
      >
        {site.name.split(" ").map((word) => (
          <span
            key={word}
            aria-hidden="true"
            className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-top"
          >
            {word.split("").map((letter, i) => (
              <span
                key={i}
                className="inline-block animate-rise"
                style={{ animationDelay: `${letterIndex++ * 45 + 150}ms` }}
              >
                {letter}
              </span>
            ))}
            {" "}
          </span>
        ))}
      </motion.h1>

      <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-7">
        <p className="max-w-[24em] text-[clamp(22px,2.5vw,36px)] leading-[1.22] font-medium tracking-[-0.015em] text-pretty">
          {site.role} {heroCopy.introLead} <span className="text-accent-ink">{heroCopy.introHighlight}</span>{" "}
          {heroCopy.introRest}
        </p>
        <div className="flex flex-col items-start gap-3.5">
          <div className="flex gap-5.5 text-base font-medium">
            {heroCopy.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-11 items-center underline transition-colors hover:text-accent-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 label">
            <span aria-hidden="true" className="relative block h-11 w-px overflow-hidden bg-line">
              <span className="absolute inset-0 animate-drip bg-accent-ink" />
            </span>
            {heroCopy.scrollHint}
          </div>
        </div>
      </div>
    </section>
  );
}
