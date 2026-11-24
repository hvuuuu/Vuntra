"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useState, type MouseEvent } from "react";

/** Copies the email address. The button leans toward the pointer while hovered. */
export function CopyEmailButton({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy email");
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });

  function follow(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function release() {
    x.set(0);
    y.set(0);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("Copied");
    } catch {
      setLabel("Select the address to copy");
    }
    setTimeout(() => setLabel("Copy email"), 1600);
  }

  return (
    <motion.button
      type="button"
      onClick={() => {
        void copy();
      }}
      onMouseMove={follow}
      onMouseLeave={release}
      style={{ x, y }}
      className="inline-flex min-h-[46px] cursor-pointer items-center rounded-full border border-on-accent px-5 text-[15px] font-semibold transition-colors duration-200 hover:bg-on-accent hover:text-accent"
    >
      <span aria-live="polite">{label}</span>
    </motion.button>
  );
}
