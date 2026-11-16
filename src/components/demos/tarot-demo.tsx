"use client";

import { useEffect, useState } from "react";
import { DemoFrame, LiveDot } from "./demo-frame";

const SAMPLE =
  "The Tower in your present position points to a structure that is ready to change. The question is what you choose to rebuild.";
const PAUSE_TICKS = 50;

/** Types a sample reading out character by character, like a streamed LLM response. */
export function TarotDemo() {
  const [tick, setTick] = useState(SAMPLE.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => (t >= SAMPLE.length + PAUSE_TICKS ? 0 : t + 1)), 38);
    return () => clearInterval(id);
  }, []);

  return (
    <DemoFrame
      label="Illustration of a streamed reading"
      note="Sample text for illustration. Real readings are generated per question."
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LiveDot>Streaming</LiveDot>
        <span className="label">3-card spread</span>
      </div>
      <div className="min-h-[9.5em] rounded-[10px] border border-line bg-bg p-4.5 text-[clamp(17px,1.5vw,21px)]">
        {SAMPLE.slice(0, Math.min(tick, SAMPLE.length))}
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1.05em] w-[0.5em] animate-blink bg-accent-ink align-[-0.15em]"
        />
      </div>
    </DemoFrame>
  );
}
