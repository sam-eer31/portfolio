import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import Link from "next/link";
import { getImageProps } from "next/image";
import heroBgDesktop from "../../public/backgrounds/hero-bg.png";
import heroBgMobile from "../../public/backgrounds/hero-p-bg.png";
import { FloatingNotes } from "../graphics/FloatingNotes";
import { MetricsBar } from "../ui/MetricsBar";
import portfolioData from "../../data/portfolio.json";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden pt-8 md:pt-12 pb-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Caveat:wght@400;500;600;700&display=swap');
        .font-serif-hero { font-family: 'Playfair Display', serif; }
        .font-handwriting { font-family: 'Caveat', cursive; }
      `}</style>

      {/* Static Background Image with proper Art Direction via getImageProps */}
      <div className="absolute inset-0 z-0">
        {(() => {
          const common = { alt: "Hero Background", fill: true, priority: true, sizes: "100vw" };
          const { props: { srcSet: desktop, ...rest } } = getImageProps({ ...common, src: heroBgDesktop });
          const { props: { srcSet: mobile, ...mobileRest } } = getImageProps({ ...common, src: heroBgMobile });

          return (
            <picture className="absolute inset-0 w-full h-full">
              <source media="(min-width: 768px)" srcSet={desktop} />
              <source media="(max-width: 767px)" srcSet={mobile} />
              {/* Fallback img element containing the desktop props but styled fully */}
              <img
                {...rest}
                className="object-cover object-center w-full h-full"
                alt="Hero Background"
              />
            </picture>
          );
        })()}

        {/* Overlay gradients for perfect text readability and contrast */}
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/50 to-transparent md:w-[120%]" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        {/* Very soft glow strictly behind the text, optimized with radial gradient instead of blur */}
        <div className="absolute top-1/2 left-[-5%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(4,5,6,0.6) 0%, rgba(4,5,6,0) 70%)", willChange: "transform" }} />
      </div>

      <Container className="relative z-10 w-full h-full flex flex-col justify-start">

        {/* Floating Handwriting Notes */}
        <FloatingNotes />

        {/* Main Content */}
        <div className="flex flex-col items-start text-left space-y-6 w-full md:w-3/4 lg:w-3/5 mt-0">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <p className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
                {portfolioData.hero.role}
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316]"></div>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-serif-hero font-bold tracking-tight leading-[1.05]">
              {portfolioData.hero.greeting} <br />
              <span className="text-[#ff5e3a]">{portfolioData.hero.name}</span>
            </h1>

            <p className="text-base md:text-lg lg:text-[19px] text-white/90 max-w-xl leading-relaxed pt-3 font-light drop-shadow-lg" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
              {portfolioData.hero.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a href={portfolioData.hero.buttons.primary.link}>
              <Button className="h-[48px] rounded-full px-8 text-sm font-semibold bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                {portfolioData.hero.buttons.primary.text}
                <svg className="ml-2 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17l9.2-9.2M17 17V7H7" /></svg>
              </Button>
            </a>
            <a href={portfolioData.hero.buttons.secondary.link}>
              <Button variant="outline" className="h-[48px] rounded-full px-8 text-sm font-semibold border-white/20 text-white hover:bg-white/5 transition-all bg-transparent">
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
