import { site } from "@/content/site";
import { CopyEmailButton } from "./copy-email-button";
import { Reveal } from "./reveal";

const linkClass = "inline-flex min-h-11 items-center underline hover:decoration-[3px]";

export function Contact() {
  return (
    <footer
      id="contact"
      className="mt-[clamp(96px,13vw,180px)] flex flex-col gap-[clamp(28px,4vw,48px)] rounded-t-[28px] bg-accent px-gutter pt-[clamp(64px,9vw,128px)] pb-7 text-on-accent"
    >
      <Reveal>
        <h2 className="display text-[clamp(52px,10vw,160px)]">Let&apos;s build something.</h2>
      </Reveal>
      <Reveal className="flex flex-wrap items-center gap-x-5 gap-y-3.5">
        <a
          href={`mailto:${site.email}`}
          className="font-display text-[clamp(22px,3vw,40px)] font-semibold tracking-[-0.02em] wrap-anywhere underline hover:decoration-[3px]"
        >
          {site.email}
        </a>
        <CopyEmailButton email={site.email} />
      </Reveal>
      <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-2 border-t border-black/25 pt-4.5 text-[15px] font-medium">
        <div className="flex gap-6">
          <a href={site.links.linkedin} className={linkClass}>
            LinkedIn
          </a>
          <a href={site.links.github} className={linkClass}>
            GitHub
          </a>
        </div>
        <span>© 2026 {site.name}</span>
      </div>
    </footer>
  );
}
