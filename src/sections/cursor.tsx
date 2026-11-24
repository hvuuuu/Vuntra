"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

/** A dot that trails the pointer and grows over interactive elements. Mouse only. */
export function Cursor() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    function move(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setActive(event.target instanceof Element && event.target.closest("a, button, input") !== null);
    }
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none fixed top-0 left-0 z-70 mix-blend-difference"
    >
      <div
        data-active={active}
        className="size-3.5 -translate-1/2 rounded-full bg-accent transition-[width,height] duration-200 data-[active=true]:size-14"
      />
    </motion.div>
  );
}
