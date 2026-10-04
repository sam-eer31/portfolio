import React from 'react';

export function FloatingNotes() {
  return (
    <>
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
    </>
  );
}
