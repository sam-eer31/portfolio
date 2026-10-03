import Image from "next/image";
import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";

const colorGradients = [
  "from-purple-500 to-indigo-500", // Coding (Purple/Blue)
  "from-pink-500 to-rose-500",     // UI Design (Pink/Red)
  "from-cyan-400 to-blue-500",     // Gaming (Cyan/Blue)
  "from-orange-500 to-red-500",    // Fitness (Orange/Red)
  "from-yellow-400 to-orange-500", // Food (Yellow/Orange)
  "from-green-400 to-emerald-500", // Reading (Green/Emerald)
];

const neonColors = [
  "#a855f7", // Coding (Purple)
  "#ec4899", // UI Design (Pink)
  "#22d3ee", // Gaming (Cyan)
  "#f97316", // Fitness (Orange)
  "#facc15", // Food (Yellow)
  "#10b981", // Reading (Emerald)
];

const imageDropShadows = [
  "drop-shadow(0 0 20px rgba(168,85,247,0.4))",
  "drop-shadow(0 0 20px rgba(236,72,153,0.4))",
  "drop-shadow(0 0 20px rgba(34,211,238,0.4))",
  "drop-shadow(0 0 20px rgba(249,115,22,0.4))",
  "drop-shadow(0 0 20px rgba(250,204,21,0.4))",
  "drop-shadow(0 0 20px rgba(16,185,129,0.4))",
];

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
                  {/* Image Container with Hover Effects (Transparent, no box) */}
                  <div
                    className="relative w-full aspect-[4/3] scale-110 md:scale-125 transition-transform duration-500 group-hover:scale-[1.35] group-hover:-translate-y-4 z-10"
                    style={{ filter: dropShadow }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={index <= 2}
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 768px) 300px, (max-width: 1200px) 400px, 500px"
                    />
                  </div>

                  {/* Floating Glass Card (Positioned independently under the image) */}
                  <div className="relative -mt-8 md:-mt-12 w-full max-w-[240px] z-20">
                    <div className="relative rounded-[20px] overflow-hidden backdrop-blur-[2px] bg-[#0a0a0a]/60 border border-white/5 px-4 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-2">
                      
                      {/* Concentrated Top-Left Glow (matches the image's lighting) */}
                      <div className={`absolute -top-12 -left-12 w-32 h-32 bg-linear-to-br ${gradient} blur-[40px] opacity-40`} />
                      
                      {/* Top and Left border highlight with neon color */}
                      <div className={`absolute inset-x-0 top-0 h-[1px] bg-linear-to-r ${gradient} opacity-50`} />
                      <div className={`absolute inset-y-0 left-0 w-[1px] bg-linear-to-b ${gradient} opacity-30`} />

                      <div className="relative flex items-start gap-3">
                        {/* Number Indicator */}
                        <span className={`text-sm md:text-base font-black bg-clip-text text-transparent bg-linear-to-b ${gradient} pt-0.5`}>
                          {item.id}
                        </span>

                        {/* Text Content */}
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-base md:text-lg mb-1 tracking-wide">
                            {item.title}
                          </h3>
                          <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed font-light">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* === 3-COLUMN CONNECTIONS (Desktop) === */}
                  {index < data.items.length - 1 && (
                    <div
                      className={`absolute ${index === 2
                          ? 'right-[50%] w-[calc(200%+4rem)] h-[350px] top-[40%]'
                          : 'top-[40%] left-[50%] w-[calc(100%+2rem)] h-[150px] -translate-y-1/2'
                        } pointer-events-none hidden min-[900px]:block -z-10`}
                    >
                      {(() => {
                        const strokeColor = neonColors[index];
                        const nextStrokeColor = neonColors[index + 1];

                        if (index === 2) {
                          return (
                            <>
                              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                                <defs>
                                  <linearGradient id={`grad-${index}`} x1="100%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor={strokeColor} />
                                    <stop offset="100%" stopColor={nextStrokeColor} />
                                  </linearGradient>
                                </defs>

                                {/* Sweeping S-Curve: Emerge right, 180 left, 180 right to connect */}
                                <path
                                  d="M 100,0 C 130,0 150,50 50,50 S -50,100 0,100"
                                  stroke={`url(#grad-${index})`}
                                  strokeWidth="1.5"
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  style={{ filter: `drop-shadow(0 0 6px ${strokeColor})` }}
                                />
                                <path
                                  d="M 100,0 C 130,0 150,50 50,50 S -50,100 0,100"
                                  stroke={`url(#grad-${index})`}
                                  strokeWidth="4"
                                  opacity="0.3"
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  style={{ filter: `blur(4px)` }}
                                />
                              </svg>

                              {/* Glowing Connection Dots */}
                              <div
                                className="absolute right-0 top-0 w-2.5 h-2.5 -mr-[5px] -mt-[5px] rounded-full z-10"
                                style={{
                                  backgroundColor: strokeColor,
                                  boxShadow: `0 0 15px 2px ${strokeColor}`
                                }}
                              />
                              <div
                                className="absolute left-0 bottom-0 w-2.5 h-2.5 -ml-[5px] -mb-[5px] rounded-full z-10"
                                style={{
                                  backgroundColor: nextStrokeColor,
                                  boxShadow: `0 0 15px 2px ${nextStrokeColor}`
                                }}
                              />
                            </>
                          );
                        }

                        const isFirstCol = index % 3 === 0;
                        // Middle column is staggered down by mt-16 (4rem = 64px)
                        const yOffsetPx = isFirstCol ? 64 : -64;
                        const yOffsetViewBox = yOffsetPx / 1.5; // container is 150px tall, viewBox is 100, so scale factor is 1.5

                        const isUpCurve = index === 1 || index === 3;

                        return (
                          <>
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                              <defs>
                                <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor={strokeColor} />
                                  <stop offset="100%" stopColor={nextStrokeColor} />
                                </linearGradient>
                              </defs>

                              {/* Main glowing line */}
                              <path
                                d={isUpCurve
                                  ? `M 0,50 C 30,-50 70,-50 100,${50 + yOffsetViewBox}`
                                  : `M 0,50 C 30,150 70,150 100,${50 + yOffsetViewBox}`}
                                stroke={`url(#grad-${index})`}
                                strokeWidth="1.5"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                style={{ filter: `drop-shadow(0 0 6px ${strokeColor})` }}
                              />

                              {/* Diffused thick glow behind it */}
                              <path
                                d={isUpCurve
                                  ? `M 0,50 C 30,-50 70,-50 100,${50 + yOffsetViewBox}`
                                  : `M 0,50 C 30,150 70,150 100,${50 + yOffsetViewBox}`}
                                stroke={`url(#grad-${index})`}
                                strokeWidth="4"
                                opacity="0.3"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                style={{ filter: `blur(4px)` }}
                              />
                            </svg>

                            {/* Glowing Connection Dots */}
                            <div
                              className="absolute left-0 w-2.5 h-2.5 -ml-[5px] rounded-full z-10"
                              style={{
                                top: '50%', marginTop: '-5px',
                                backgroundColor: strokeColor,
                                boxShadow: `0 0 15px 2px ${strokeColor}`
                              }}
                            />
                            <div
                              className="absolute right-0 w-2.5 h-2.5 -mr-[5px] rounded-full z-10"
                              style={{
                                top: `calc(50% + ${yOffsetPx}px)`, marginTop: '-5px',
                                backgroundColor: nextStrokeColor,
                                boxShadow: `0 0 15px 2px ${nextStrokeColor}`
                              }}
                            />
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {/* === 2-COLUMN CONNECTIONS (Tablet) === */}
                  {index < data.items.length - 1 && (
                    <div
                      className={`absolute ${index === 1 || index === 3
                          ? 'right-[50%] w-[calc(100%+2rem)] h-[350px] top-[40%]'
                          : 'top-[40%] left-[50%] w-[calc(100%+2rem)] h-[150px] -translate-y-1/2'
                        } pointer-events-none hidden min-[300px]:max-[899px]:block -z-10`}
                    >
                      {(() => {
                        const strokeColor = neonColors[index];
                        const nextStrokeColor = neonColors[index + 1];

                        // Vertical wrap-around (Right Col -> Left Col next row)
                        if (index === 1 || index === 3) {
                          return (
                            <>
                              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                                <defs>
                                  <linearGradient id={`grad-2c-${index}`} x1="100%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor={strokeColor} />
                                    <stop offset="100%" stopColor={nextStrokeColor} />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M 100,0 C 150,0 150,50 50,50 S -50,100 0,100"
                                  stroke={`url(#grad-2c-${index})`}
                                  strokeWidth="1.5"
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  style={{ filter: `drop-shadow(0 0 6px ${strokeColor})` }}
                                />
                                <path
                                  d="M 100,0 C 150,0 150,50 50,50 S -50,100 0,100"
                                  stroke={`url(#grad-2c-${index})`}
                                  strokeWidth="4"
                                  opacity="0.3"
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  style={{ filter: `blur(4px)` }}
                                />
                              </svg>
                              <div className="absolute top-0 right-0 w-2 h-2 rounded-full translate-x-1/2 -translate-y-1/2 bg-white" style={{ boxShadow: `0 0 15px 2px ${strokeColor}` }} />
                              <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 translate-y-1/2 bg-white" style={{ boxShadow: `0 0 15px 2px ${nextStrokeColor}` }} />
                            </>
                          );
                        }

                        // Horizontal connection (Left Col -> Right Col)
                        const yOffsetPx = 64; // mt-16 = 64px down-stagger
                        const yOffsetViewBox = yOffsetPx / 1.5; // container is 150px tall, viewBox is 100 -> scale 1.5

                        return (
                          <>
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                              <defs>
                                <linearGradient id={`grad-2c-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor={strokeColor} />
                                  <stop offset="100%" stopColor={nextStrokeColor} />
                                </linearGradient>
                              </defs>
                              <path
                                d={`M 0,50 C 40,50 60,${50 + yOffsetViewBox} 100,${50 + yOffsetViewBox}`}
                                stroke={`url(#grad-2c-${index})`}
                                strokeWidth="1.5"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                style={{ filter: `drop-shadow(0 0 6px ${strokeColor})` }}
                              />
                              <path
                                d={`M 0,50 C 40,50 60,${50 + yOffsetViewBox} 100,${50 + yOffsetViewBox}`}
                                stroke={`url(#grad-2c-${index})`}
                                strokeWidth="4"
                                opacity="0.3"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                style={{ filter: `blur(4px)` }}
                              />
                            </svg>
                            <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-white" style={{ boxShadow: `0 0 15px 2px ${strokeColor}` }} />
                            <div className="absolute left-full w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-white" style={{ top: `calc(50% + ${yOffsetPx}px)`, boxShadow: `0 0 15px 2px ${nextStrokeColor}` }} />
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
