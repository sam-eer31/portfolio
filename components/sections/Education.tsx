import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";

export function Education() {
  const education = portfolioData.education;

  return (
    <section id="education" className="py-8 md:py-12">
      <Container>
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-start text-left">
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
            Education
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            A journey of continuous learning.
          </h2>
        </div>

        {/* Timeline Section */}
        <div className="w-full max-w-4xl">
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
                <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(7,140,140,0.8)] relative z-10 mt-1.5" />
              </div>

              {/* Content */}
              <div className="pb-16 flex flex-col flex-1">
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
