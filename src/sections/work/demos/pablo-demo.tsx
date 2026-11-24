"use client";

import { useEffect, useState } from "react";
import { DemoFrame, LiveDot } from "./demo-frame";

const TURN_SECONDS = 45;

function Pane({ title, rows }: { title: string; rows: { key: string; value: string; masked?: boolean }[] }) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-line bg-bg p-3.5 font-mono text-[13px] leading-[1.7] whitespace-pre">
      <div className="text-muted">{`// ${title}`}</div>
      {rows.map((row) => (
        <div key={row.key}>
          <span className="text-muted">{`${row.key}:`.padEnd(10)}</span>
          <span className={row.masked ? "text-accent-ink" : undefined}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

/** Illustrates per-player masking: what the server stores vs. what one client receives. */
export function PabloDemo() {
  const [seconds, setSeconds] = useState(TURN_SECONDS);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s <= 1 ? TURN_SECONDS : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <DemoFrame
      label="Illustration of per-player masking"
      note="Simplified illustration. The card you shouldn't see is never in your payload, so DevTools has nothing to find."
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LiveDot>Room update pushed</LiveDot>
        <span className="label tabular-nums">Turn timer {seconds}s</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-3">
        <Pane
          title="what the server holds"
          rows={[
            { key: "you", value: "[7, K, 2, 9]" },
            { key: "opponent", value: "[4, Q, 8, A]" },
            { key: "drawPile", value: "[J, 3, 6, …]" },
          ]}
        />
        <Pane
          title="what your browser gets"
          rows={[
            { key: "you", value: "[7, K, 2, 9]" },
            { key: "opponent", value: "[■, ■, ■, ■]", masked: true },
            { key: "drawPile", value: "■ × 40", masked: true },
          ]}
        />
      </div>
    </DemoFrame>
  );
}
