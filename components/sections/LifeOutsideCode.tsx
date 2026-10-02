import Image from "next/image";
import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";

export function LifeOutsideCode() {
  const data = portfolioData.lifeOutsideCode;

  return (
    <section id="life-outside-code" className="py-24">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="flex flex-col items-start text-left max-w-xl">
            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
              {data.subtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {data.title}
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative">
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory scrollbar-none">
            {data.items.map((item, index) => (
              <div 
                key={index}
                className="snap-start shrink-0 w-48 md:w-56 aspect-[4/5] relative rounded-2xl overflow-hidden group cursor-pointer border border-border/40"
              >
                {/* Background Image */}
                <Image 
                  src={item.image} 
                  alt={item.title.replace('\n', ' ')}
                  fill
                  className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 192px, 224px"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Text Content */}
                <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full flex justify-between items-end">
                  <h3 className="text-white font-semibold text-lg leading-tight whitespace-pre-line">
                    {item.title}
                  </h3>
                  
                  {/* Small decorative icon (like the squiggly arrows in the image) */}
                  <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0 transition-transform">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
