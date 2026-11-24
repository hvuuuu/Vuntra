"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const PLAIN = "I care most about the state behind the screen: who owns it, who is allowed to see it, and";
const HIGHLIGHT = "how it stays in sync.";

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className={highlight ? "text-accent-ink" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

/** A statement whose words light up one by one as the reader scrolls through it. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  const plain = PLAIN.split(" ");
  const words = [...plain, ...HIGHLIGHT.split(" ")];

  return (
    <section aria-label="What I care about" className="px-gutter py-[clamp(96px,14vw,200px)]">
      <p
        ref={ref}
        className="max-w-[15em] font-display text-[clamp(34px,5.6vw,88px)] leading-[1.02] font-semibold tracking-[-0.03em]"
      >
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            highlight={i >= plain.length}
          >
            {word}
          </Word>
        ))}
      </p>
    </section>
  );
}
