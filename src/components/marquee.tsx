"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { marquee } from "@/content/site";

/** Two rows of tech names that slide in opposite directions as the page scrolls. */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <div ref={ref} aria-hidden="true" className="mt-[clamp(64px,9vw,120px)] flex flex-col gap-2.5 overflow-hidden py-2">
      {marquee.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          style={{ x: rowIndex === 0 ? left : right }}
          className="flex w-max gap-[0.6em] font-display text-[clamp(40px,6.4vw,96px)] leading-[1.05] font-bold tracking-[-0.035em] whitespace-nowrap will-change-transform"
        >
          {[...row, ...row, ...row].map((word, i) => (
            <span key={i} className="even:text-transparent even:[-webkit-text-stroke:1px_var(--muted)]">
              {word}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
