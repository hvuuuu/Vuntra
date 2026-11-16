"use client";

import { useId, useState } from "react";
import { DemoFrame } from "./demo-frame";

function Subject() {
  return (
    <div className="aspect-square w-[34%] rounded-[50%_50%_46%_46%/58%_58%_42%_42%] bg-accent shadow-[inset_-14px_-18px_0_rgb(0_0_0/0.18)]" />
  );
}

/** A drawn before/after comparison with a draggable divider. */
export function FreeFinedDemo() {
  const [cut, setCut] = useState(52);
  const id = useId();

  return (
    <DemoFrame
      label="Illustration of background removal"
      note="Drawn illustration of the before and after view, not a real model output."
    >
      <div className="relative aspect-16/10 overflow-hidden rounded-[10px] border border-line">
        <div className="absolute inset-0 grid place-items-center bg-linear-135 from-[#5b6b3a] via-[#27301a] via-60% to-[#12160b]">
          <Subject />
        </div>
        <div
          className="absolute inset-0 grid place-items-center bg-[repeating-conic-gradient(var(--line)_0_25%,var(--bg)_0_50%)] bg-size-[22px_22px]"
          style={{ clipPath: `inset(0 0 0 ${cut}%)` }}
        >
          <Subject />
        </div>
        <div className="absolute inset-y-0 w-0.5 -translate-x-px bg-ink" style={{ left: `${cut}%` }} />
        <span className="absolute bottom-2.5 left-2.5 rounded-md bg-bg px-2 py-0.5 font-mono text-xs">Original</span>
        <span className="absolute right-2.5 bottom-2.5 rounded-md bg-bg px-2 py-0.5 font-mono text-xs">
          Background removed
        </span>
      </div>
      <label htmlFor={id} className="label">
        Drag to compare
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={cut}
        onChange={(event) => setCut(Number(event.target.value))}
        className="h-7 w-full accent-accent-ink"
      />
    </DemoFrame>
  );
}
