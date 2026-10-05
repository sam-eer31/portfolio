import React from 'react';
import portfolioData from '../../data/portfolio.json';

export function MetricsBar() {
  return (
    <div className="flex flex-row items-center justify-start gap-2 sm:gap-6 md:gap-12 pt-4 md:pt-6 w-full md:w-auto">
      <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-2.5 md:pl-5">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{portfolioData.hero.stats[0].value}</span>
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </div>
        <span className="text-[9px] md:text-[11px] text-white/50 uppercase tracking-wider font-medium">{portfolioData.hero.stats[0].label}</span>
      </div>
      
      <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-2.5 md:pl-5">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{portfolioData.hero.stats[1].value}</span>
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <span className="text-[9px] md:text-[11px] text-white/50 capitalize tracking-wide font-medium whitespace-nowrap">{portfolioData.hero.stats[1].label}</span>
      </div>

      <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-2.5 md:pl-5">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white/90">∞</span>
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <span className="text-[9px] md:text-[11px] text-white/50 capitalize tracking-wide font-medium whitespace-nowrap">Curiosity to Build</span>
      </div>
    </div>
  );
}
