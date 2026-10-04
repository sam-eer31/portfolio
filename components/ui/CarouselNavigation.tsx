import React from 'react';

interface CarouselNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  text: string;
  nextDisabled?: boolean;
  prevDisabled?: boolean;
  className?: string;
}

export function CarouselNavigation({ 
  onNext, 
  onPrev, 
  text, 
  nextDisabled = false,
  prevDisabled = false,
  className = ""
}: CarouselNavigationProps) {
  return (
    <div className={`flex justify-center items-center mt-6 md:mt-8 z-20 relative w-full px-4 ${className}`}>
      <div className="flex items-center justify-between w-full max-w-[360px] md:max-w-[420px]">
        <button
          onClick={onPrev}
          disabled={prevDisabled}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed text-white/50 hover:text-white shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <span className="text-white/40 font-medium tracking-widest uppercase text-[9px] md:text-xs select-none text-center flex-1 px-4 leading-tight">
          {text}
        </span>

        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed text-white/50 hover:text-white shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
