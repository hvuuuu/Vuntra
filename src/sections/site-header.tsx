"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { navItems, site } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (y > previous + 4 && y > 240) setHidden(true);
    else if (y < previous - 4 || y <= 240) setHidden(false);
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-60 h-[3px] origin-left bg-accent"
      />
      <header
        data-hidden={hidden}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 bg-linear-to-b from-bg to-transparent px-gutter py-4 transition-transform duration-500 ease-soft data-[hidden=true]:-translate-y-[110%]"
      >
        <a
          href="#top"
          aria-label={`${site.handle}, back to top`}
          className="inline-flex min-h-11 items-center font-display text-2xl font-extrabold tracking-[-0.04em] no-underline"
        >
          {site.handle}
          <span aria-hidden="true" className="ml-1.5 size-2.5 rounded-full bg-accent ring-1 ring-ink ring-inset" />
        </a>
        <div className="flex items-center gap-[clamp(14px,2.4vw,32px)]">
          <nav aria-label="Sections" className="hidden gap-[clamp(14px,2.4vw,32px)] text-[15px] font-medium sm:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center transition-colors hover:text-accent-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
