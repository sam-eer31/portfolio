import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { getImageProps } from "next/image";
import heroBgDesktop from "../../public/backgrounds/hero-bg.webp";
import heroBgMobile from "../../public/backgrounds/hero-p-bg.webp";
import { FloatingNotes } from "../graphics/FloatingNotes";
import { MetricsBar } from "../ui/MetricsBar";
import portfolioData from "../../data/portfolio.json";
import { SECTION_SPACING } from "../../lib/constants";

export function Hero() {
  return (
    <section className={`relative flex items-center overflow-hidden ${SECTION_SPACING}`}>
      {/* Static Background Image masked to flawlessly blend into the site background */}
      <div 
        className="absolute inset-0 z-0"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
      >
        {(() => {
          const common = { alt: "Hero Background - Sameer Shahid Siddiqui Portfolio", fill: true, priority: true, sizes: "100vw" };
          const { props: { srcSet: desktop, ...rest } } = getImageProps({ ...common, src: heroBgDesktop });
          const { props: { srcSet: mobile } } = getImageProps({ ...common, src: heroBgMobile });

          return (
            <picture className="absolute inset-0 w-full h-full">
              <source media="(min-width: 768px)" srcSet={desktop} />
              <source media="(max-width: 767px)" srcSet={mobile} />
              {/* Fallback img element containing the desktop props but styled fully */}
              <img
                {...rest}
                className="object-cover object-center w-full h-full"
                alt="Hero Background - Sameer Shahid Siddiqui Portfolio"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          );
        })()}

        {/* Overlay gradients for perfect text readability and contrast */}
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/50 to-transparent md:w-[120%]" />
        {/* Very soft glow strictly behind the text, optimized with radial gradient instead of blur */}
        <div className="absolute top-1/2 left-[-5%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(4,5,6,0.6) 0%, rgba(4,5,6,0) 70%)", willChange: "transform" }} />
      </div>

      <Container className="relative z-10 w-full h-full flex flex-col justify-start">

        {/* Floating Handwriting Notes */}
        <FloatingNotes />

        {/* Main Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 w-full md:w-3/4 lg:w-3/5 mt-0">

          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <p className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
                {portfolioData.hero.role}
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316]" aria-hidden="true" />
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-serif font-bold tracking-normal leading-[1.05] text-center md:text-left">
              {portfolioData.hero.greeting} <span className="text-[#ff5e3a]">{portfolioData.hero.name}</span>
              <span className="sr-only"> Shahid Siddiqui - Frontend Developer</span>
            </h1>

            <p className="text-lg text-white/80 leading-relaxed max-w-xl pt-3 text-center md:text-justify">
              {portfolioData.hero.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center md:justify-start gap-3 md:gap-4 pt-4">
            <a href={portfolioData.hero.buttons.primary.link} aria-label="View Projects">
              <Button className="h-[42px] md:h-[48px] rounded-[57px] px-5 md:px-8 text-xs md:text-sm font-semibold text-black bg-white hover:bg-slate-100 transition-all whitespace-nowrap">
                {portfolioData.hero.buttons.primary.text}
                <svg className="ml-1.5 md:ml-2 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17l9.2-9.2M17 17V7H7" /></svg>
              </Button>
            </a>
            <a href={portfolioData.hero.buttons.secondary.link} aria-label="Learn more About Me">
              <Button variant="outline" className="h-[42px] md:h-[48px] rounded-full px-5 md:px-8 text-xs md:text-sm font-semibold border-white/20 text-white hover:bg-white/5 transition-all bg-transparent whitespace-nowrap">
                {portfolioData.hero.buttons.secondary.text}
              </Button>
            </a>
          </div>

          {/* Stats Bar */}
          <MetricsBar />

        </div>

        {/* Bottom Elements */}

      </Container>
    </section>
  );
}
