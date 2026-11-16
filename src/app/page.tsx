import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Cursor } from "@/components/cursor";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { SiteHeader } from "@/components/site-header";
import { Statement } from "@/components/statement";
import { Toolkit } from "@/components/toolkit";
import { Work } from "@/components/work";

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
