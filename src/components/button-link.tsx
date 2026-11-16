import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<"a"> & { variant?: "outline" | "fill" };

const base =
  "inline-flex min-h-[46px] items-center gap-2 rounded-full border px-5 text-[15px] font-semibold no-underline transition-colors duration-200";
const variants = {
  outline: "border-ink hover:bg-ink hover:text-bg",
  fill: "border-accent bg-accent text-on-accent hover:border-ink hover:bg-ink hover:text-bg",
};

export function ButtonLink({ variant = "outline", className = "", ...props }: ButtonLinkProps) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
