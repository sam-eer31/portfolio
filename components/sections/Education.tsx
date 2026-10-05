import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";
import { SECTION_SPACING } from "../../lib/constants";

export function Education() {
  const education = portfolioData.education;

  return (
    <section id="education" className={`${SECTION_SPACING}`}>
      <Container>
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-10 relative flex flex-col items-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
            </svg>
            <span className="text-xs font-medium tracking-[0.3em] text-gray-400 uppercase">
              EDUCATION
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-normal text-white relative z-10">
            A journey of <span className="relative inline-block text-yellow-500 pb-2">continuous learning.</span>
          </h2>
        </div>

        {/* Timeline Section */}
        <div className="w-full max-w-4xl mx-auto">
          {education.map((item, index) => (
            <div key={index} className="flex gap-6 group">
              {/* Date (Desktop - Left of Dot) */}
              <div className="hidden md:block w-36 shrink-0 text-muted-foreground text-right font-medium">
                {item.period}
              </div>

              {/* Timeline graphic */}
              <div className="relative flex flex-col items-center w-4 shrink-0">
                {/* Vertical Line */}
                {index !== education.length - 1 && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[1px] h-full bg-border/40 z-0" />
                )}
                {/* Glowing Dot */}
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.8)] relative z-10 mt-1.5" />
              </div>

              {/* Content */}
              <div className={`flex flex-col flex-1 ${index !== education.length - 1 ? 'pb-16' : ''}`}>
                {/* Date (Mobile - Above Title) */}
                <div className="md:hidden text-muted-foreground text-left font-medium mb-1">
                  {item.period}
                </div>
                
                {/* Details */}
                <div className="flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                    {item.degree}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.institution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
