import { About } from "@/sections/about";
import { Contact } from "@/sections/contact";
import { Cursor } from "@/sections/cursor";
import { Experience } from "@/sections/experience";
import { Hero } from "@/sections/hero";
import { Marquee } from "@/sections/marquee";
import { SiteHeader } from "@/sections/site-header";
import { Statement } from "@/sections/statement";
import { Toolkit } from "@/sections/toolkit";
import { Work } from "@/sections/work/work";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Cursor />
      <main id="top">
        <Hero />
        <Statement />
        <Work />
        <Experience />
        <Marquee />
        <Toolkit />
        <About />
      </main>
      <Contact />
    </>
  );
}
