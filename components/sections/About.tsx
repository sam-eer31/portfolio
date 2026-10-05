import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";
import { Badge } from "../ui/Badge";
import Image from "next/image";
import { SECTION_SPACING } from "../../lib/constants";

export function About() {
  return (
    <section id="about" className={`${SECTION_SPACING} relative overflow-hidden`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        .font-handwriting { font-family: 'Caveat', cursive; }
      `}</style>

      <Container>
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-10 relative flex flex-col items-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF5E3A]">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
            </svg>
            <span className="text-xs font-medium tracking-[0.3em] text-gray-400 uppercase">
              ABOUT
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
            A developer who turns ideas<br />
            into <span className="relative inline-block text-[#FF5E3A] pb-2">real experiences.</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">

          {/* Text Description */}
          <div className="order-2 lg:order-1 text-lg text-muted-foreground leading-relaxed space-y-6">
            {portfolioData.about.description.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative w-full max-w-[320px] md:max-w-[400px] lg:max-w-[500px] mx-auto pointer-events-auto flex items-center justify-center transition-transform duration-700 hover:scale-[1.02]">
            <Image
              src={portfolioData.about.image}
              alt="About"
              width={700}
              height={850}
              priority={false}
              className="w-full h-auto object-contain rounded-3xl"
            />
          </div>
        </div>

        {/* Tags Row */}
        <div className="relative w-[100vw] -ml-[50vw] left-1/2 md:w-full md:ml-0 md:left-auto overflow-hidden md:overflow-visible">
          {/* Fading edges for marquee on mobile */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#040506] to-transparent z-10 md:hidden pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#040506] to-transparent z-10 md:hidden pointer-events-none" />
          
          <div className="flex w-max md:w-full md:flex-wrap md:justify-center animate-[marquee_15s_linear_infinite] md:animate-none hover:[animation-play-state:paused]">
            <div className="flex gap-4 pr-4 md:pr-0 md:gap-4">
              {portfolioData.about.tags.map((badge: any, index: number) => (
                <Badge key={index} badge={badge} />
              ))}
            </div>
            {/* Second Set (Duplicate for seamless scroll, hidden on md) */}
            <div className="flex gap-4 pr-4 md:hidden" aria-hidden="true">
              {portfolioData.about.tags.map((badge: any, index: number) => (
                <Badge key={`dup-${index}`} badge={badge} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
