import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";
import { Badge, badgeData } from "../ui/Badge";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-8 md:py-12 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        .font-handwriting { font-family: 'Caveat', cursive; }
      `}</style>
      
      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[600px]">
          
          {/* Left Column: Text and Badges */}
          <div className="block pr-0 lg:pr-8 relative z-20 w-full">
            
            {/* Tablet Image Float (Passport style) - Only visible between sm and lg */}
            <div className="hidden sm:block lg:hidden float-right w-[260px] md:w-[320px] ml-8 mb-6 mt-4 relative z-30 transition-transform duration-700 hover:scale-[1.02]">
              <Image 
                src="/about/about-card.png" 
                alt="About" 
                width={320}
                height={400}
                className="w-full h-auto object-contain shadow-2xl rounded-xl"
              />
            </div>

            <div className="flex flex-col items-start text-left mb-8">
              <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                About
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                A developer<br />
                who turns ideas<br />
                into <span className="text-[#FF5E3A]">real experiences.</span>
              </h2>
            </div>
            
            {/* Mobile Image - Visible only below sm screens */}
            <div className="block sm:hidden w-full max-w-[260px] mx-auto my-10 relative z-30 transition-transform duration-700 hover:scale-[1.02]">
              <Image 
                src="/about/about-card.png" 
                alt="About" 
                width={260}
                height={320}
                className="w-full h-auto object-contain shadow-2xl rounded-xl"
              />
            </div>

            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              {portfolioData.about.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Badges - Desktop/Tablet (Flex Wrap) */}
            <div className="hidden sm:flex flex-wrap gap-4 mt-10 clear-both">
              {badgeData.map((badge, index) => (
                <Badge key={index} badge={badge} />
              ))}
            </div>

            {/* Badges - Mobile (Marquee) */}
            <div 
              className="sm:hidden mt-10 clear-both relative w-full overflow-hidden flex whitespace-nowrap -mx-4 px-4"
              style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
            >
              <style>{`
                .animate-marquee {
                  animation: marquee 15s linear infinite;
                  will-change: transform;
                  transform: translateZ(0);
                }
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-100%); }
                }
              `}</style>
              
              <div className="flex w-max animate-marquee shrink-0 gap-4 pr-4">
                {badgeData.map((badge, index) => (
                  <Badge key={index} badge={badge} className="shrink-0" />
                ))}
              </div>
              <div className="flex w-max animate-marquee shrink-0 gap-4 pr-4" aria-hidden="true">
                {badgeData.map((badge, index) => (
                  <Badge key={`dup-${index}`} badge={badge} className="shrink-0" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Desktop only) */}
          <div className="hidden lg:flex relative w-full max-w-[600px] xl:max-w-[700px] mx-auto pointer-events-auto items-center justify-center transition-transform duration-700 hover:scale-[1.02]">
            <Image 
              src="/about/about-card.png" 
              alt="About" 
              width={700}
              height={850}
              priority={false}
              className="w-full h-auto object-contain shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)] rounded-3xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
