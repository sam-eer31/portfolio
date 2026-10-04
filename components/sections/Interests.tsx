import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";
import { InterestCard } from "../cards/InterestCard";
import { DesktopConnections, TabletConnections } from "../graphics/PathConnections";
import { colorGradients, neonColors, imageDropShadows } from "./InterestConstants";

export function Interests() {
  const data = portfolioData.interests;

  return (
    <section id="interests" className="py-8 md:py-12 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .interests-zoom { zoom: 0.45; }
        @media (min-width: 400px) { .interests-zoom { zoom: 0.6; } }
        @media (min-width: 500px) { .interests-zoom { zoom: 0.75; } }
        @media (min-width: 640px) { .interests-zoom { zoom: 0.8; } }
        @media (min-width: 768px) { .interests-zoom { zoom: 0.8; } }
        @media (min-width: 900px) { .interests-zoom { zoom: 0.85; } }
        @media (min-width: 1024px) { .interests-zoom { zoom: 0.9; } }
        @media (min-width: 1280px) { .interests-zoom { zoom: 1; } }
      `}} />
      <Container className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 relative flex flex-col items-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
            </svg>
            <span className="text-xs font-medium tracking-[0.3em] text-gray-400 uppercase">
              INTERESTS
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-white mb-6 relative z-10">
            Things That Keep Me <span className="relative inline-block text-indigo-500 pb-2">
              Inspired
            </span>
          </h2>
          
          {/* Subheading */}
          <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Good ideas often come from a well-lived life. Here are a few things<br className="hidden md:block" />
            that keep me curious, creative and happy.
            <span className="inline-flex align-middle ml-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-indigo-400 -translate-y-0.5">
                <path d="M12 10L16 4M14 14L21 12M11 17L15 22" />
              </svg>
            </span>
          </p>
        </div>

        {/* Interests Grid with Neon Connections */}
        <div className="relative z-10 w-full flex justify-center interests-zoom pb-10">
          <div className="grid grid-cols-[300px] min-[300px]:grid-cols-[repeat(2,300px)] min-[900px]:grid-cols-[repeat(3,300px)] justify-center gap-x-8 gap-y-16 min-[300px]:gap-y-0 relative">
            {data.items.map((item, index) => {
              const gradient = colorGradients[index % colorGradients.length];
              const dropShadow = imageDropShadows[index % imageDropShadows.length];

              const stagger2Col = index % 2 === 1 ? 'min-[300px]:max-[899px]:mt-16' : '';
              const stagger3Col = index % 3 === 1 ? 'min-[900px]:mt-16' : '';

              return (
                <div
                  key={item.id}
                  className={`relative group flex flex-col items-center w-full ${stagger2Col} ${stagger3Col}`}
                >
                  <InterestCard item={item} index={index} gradient={gradient} dropShadow={dropShadow} />
                  <DesktopConnections index={index} totalItems={data.items.length} neonColors={neonColors} />
                  <TabletConnections index={index} totalItems={data.items.length} neonColors={neonColors} />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
