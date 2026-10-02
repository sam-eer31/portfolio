import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";

const badgeData = [
  {
    sub: "Good",
    label: "Coffee",
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" />
      </svg>
    )
  },
  {
    sub: "Clean",
    label: "Code",
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    )
  },
  {
    sub: "Curious",
    label: "Mindset",
    color: "text-[#EAB308]",
    bg: "bg-[#EAB308]/10",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" />
        <path d="M9 18h6" /><path d="M10 22h4" />
      </svg>
    )
  },
  {
    sub: "Open to",
    label: "Opportunities",
    color: "text-[#F97316]",
    bg: "bg-[#F97316]/10",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
];

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        .font-handwriting { font-family: 'Caveat', cursive; }
      `}</style>
      
      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[600px]">
          
          {/* Left Column: Text and Badges */}
          <div className="block pr-0 lg:pr-8 relative z-20 py-12 lg:py-0 w-full">
            
            {/* Tablet Image Float (Passport style) - Only visible between sm and lg */}
            <div className="hidden sm:block lg:hidden float-right w-[260px] md:w-[320px] ml-8 mb-6 mt-4 relative z-30 transition-transform duration-700 hover:scale-[1.02]">
              <img 
                src="/about-card.png" 
                alt="About" 
                className="w-full h-auto object-contain drop-shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5E3A]" />
              <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                / ABOUT
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
              A developer<br />
              who turns ideas<br />
              into <span className="text-[#FF5E3A]">real experiences.</span>
            </h2>
            
            {/* Mobile Image - Visible only below sm screens */}
            <div className="block sm:hidden w-full max-w-[340px] mx-auto my-10 relative z-30 transition-transform duration-700 hover:scale-[1.02]">
              <img 
                src="/about-card.png" 
                alt="About" 
                className="w-full h-auto object-contain drop-shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)]"
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
                <div key={index} className="flex items-center gap-3 px-4 py-2.5 rounded-[20px] bg-[#0A0D18] border border-white/5 transition-colors hover:bg-white/5">
                  <div className={`p-2 rounded-xl ${badge.bg} ${badge.color}`}>
                    {badge.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-muted-foreground leading-tight">{badge.sub}</span>
                    <span className="text-sm font-medium text-white/90 leading-tight">{badge.label}</span>
                  </div>
                </div>
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
                }
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-100%); }
                }
              `}</style>
              
              <div className="flex w-max animate-marquee shrink-0 gap-4 pr-4">
                {badgeData.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3 px-4 py-2.5 rounded-[20px] bg-[#0A0D18] border border-white/5 shrink-0">
                    <div className={`p-2 rounded-xl ${badge.bg} ${badge.color}`}>
                      {badge.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-muted-foreground leading-tight">{badge.sub}</span>
                      <span className="text-sm font-medium text-white/90 leading-tight">{badge.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-max animate-marquee shrink-0 gap-4 pr-4" aria-hidden="true">
                {badgeData.map((badge, index) => (
                  <div key={`dup-${index}`} className="flex items-center gap-3 px-4 py-2.5 rounded-[20px] bg-[#0A0D18] border border-white/5 shrink-0">
                    <div className={`p-2 rounded-xl ${badge.bg} ${badge.color}`}>
                      {badge.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-muted-foreground leading-tight">{badge.sub}</span>
                      <span className="text-sm font-medium text-white/90 leading-tight">{badge.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Desktop only) */}
          <div className="hidden lg:flex relative w-full max-w-[500px] mx-auto pointer-events-auto items-center justify-center transition-transform duration-700 hover:scale-[1.02]">
            <img 
              src="/about-card.png" 
              alt="About" 
              className="w-full h-auto object-contain drop-shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
