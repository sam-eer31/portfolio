import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import Link from "next/link";
import { getImageProps } from "next/image";
import heroBgDesktop from "../../public/hero-bg.png";
import heroBgMobile from "../../public/hero-p-bg.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden pt-8 md:pt-12 pb-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Caveat:wght@400;500;600;700&display=swap');
        .font-serif-hero { font-family: 'Playfair Display', serif; }
        .font-handwriting { font-family: 'Caveat', cursive; }
        .spin-slow { animation: spin 10s linear infinite; }
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
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      </div>

      <Container className="relative z-10 w-full h-full flex flex-col justify-start">
        
        {/* Floating Handwriting Notes */}
        <div className="hidden xl:block absolute top-[5%] left-[42%] font-handwriting text-white/80 text-xl -rotate-6">
          Always <br/> learning <br/> something <br/> new
          <svg className="absolute -bottom-8 -right-8 w-12 h-12 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 3c4 10, 12 12, 18 16 M15 19l6 0l0 -6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="hidden xl:block absolute top-[10%] right-[8%] font-handwriting text-white/80 text-xl rotate-3">
          Turning <br/> ideas into <br/> real products
          <svg className="absolute -bottom-10 -left-6 w-12 h-12 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 3c-4 10, -12 12, -18 16 M9 19l-6 0l0 -6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="hidden xl:block absolute bottom-[28%] right-[15%] font-handwriting text-white/80 text-xl -rotate-2">
          <svg className="absolute -top-12 -left-8 w-12 h-12 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 21c-4 -10, -12 -12, -18 -16 M9 5l-6 0l0 6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Clean code.<br/>Better experiences.
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-start text-left space-y-6 w-full md:w-3/4 lg:w-3/5 mt-0">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <p className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
                FRONTEND DEVELOPER
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316]"></div>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-serif-hero font-bold tracking-tight leading-[1.05]">
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F97316] to-[#FDBA74]">Sameer</span>
            </h1>
            
            <p className="text-[15px] md:text-base text-white/70 max-w-md leading-relaxed pt-2 font-light">
              I&apos;m a frontend developer who enjoys turning ideas into clean, responsive and interactive web experiences. I love working on real problems, learning new tools, and making the web feel a little more thoughtful.
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects">
              <Button className="h-[48px] rounded-full px-8 text-sm font-semibold bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                View My Work
                <svg className="ml-2 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </Button>
            </a>
            <a href="#about">
              <Button variant="outline" className="h-[48px] rounded-full px-8 text-sm font-semibold border-white/20 text-white hover:bg-white/5 transition-all bg-transparent">
                About Me
              </Button>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-row items-center justify-between md:justify-start gap-2 sm:gap-6 md:gap-12 pt-4 md:pt-6 w-full md:w-auto">
            <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-2.5 md:pl-5">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">9.02</span>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <span className="text-[9px] md:text-[11px] text-white/50 uppercase tracking-wider font-medium">CGPA</span>
            </div>
            
            <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-2.5 md:pl-5">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">2+</span>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <span className="text-[9px] md:text-[11px] text-white/50 capitalize tracking-wide font-medium whitespace-nowrap">Major Projects</span>
            </div>

            <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-2.5 md:pl-5">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white/90">∞</span>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-[9px] md:text-[11px] text-white/50 capitalize tracking-wide font-medium whitespace-nowrap">Curiosity to Build</span>
            </div>
          </div>
          
        </div>

        {/* Bottom Elements */}

        <div className="absolute bottom-12 right-4 md:right-12 hidden md:flex items-center justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center border border-white/5 rounded-full backdrop-blur-sm bg-black/20">
            <svg className="absolute inset-0 w-full h-full spin-slow" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="8.5" fontWeight="600" fill="rgba(255,255,255,0.4)" letterSpacing="2">
                <textPath href="#circlePath" startOffset="0%">
                  LET'S BUILD SOMETHING GREAT • 
                </textPath>
              </text>
            </svg>
            <div className="w-2 h-2 rounded-full bg-[#F97316] shadow-[0_0_12px_#F97316]"></div>
          </div>
        </div>

      </Container>
    </section>
  );
}
