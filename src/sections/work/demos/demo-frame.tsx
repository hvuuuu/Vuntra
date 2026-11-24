import type { ReactNode } from "react";

export function DemoFrame({ label, note, children }: { label: string; note: string; children: ReactNode }) {
  return (
    <figure
      aria-label={label}
      className="m-0 flex min-w-0 flex-col gap-4 rounded-[14px] border border-line bg-surface p-[clamp(16px,2vw,26px)]"
    >
      {children}
      <figcaption className="text-[13.5px] text-muted">{note}</figcaption>
    </figure>
  );
}

export function LiveDot({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 label">
      <span className="size-2 rounded-full bg-accent-ink" />
      {children}
    </span>
  );
}
