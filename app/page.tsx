import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { LifeOutsideCode } from "@/components/sections/LifeOutsideCode";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Education />
      <LifeOutsideCode />
      <Contact />
    </>
  );
}
