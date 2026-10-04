import React from 'react';
import Image from 'next/image';

interface InterestCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
  index: number;
  gradient: string;
  dropShadow: string;
}

export function InterestCard({ item, index, gradient, dropShadow }: InterestCardProps) {
  return (
    <>
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

      <div className="relative -mt-8 md:-mt-12 w-full max-w-[240px] z-20">
        <div className="relative rounded-[20px] overflow-hidden backdrop-blur-[2px] bg-[#0a0a0a]/60 border border-white/5 px-4 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-2">
          
          <div className={`absolute -top-12 -left-12 w-32 h-32 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] ${gradient} to-transparent opacity-30`} />
          
          <div className={`absolute inset-x-0 top-0 h-[1px] bg-linear-to-r ${gradient} opacity-50`} />
          <div className={`absolute inset-y-0 left-0 w-[1px] bg-linear-to-b ${gradient} opacity-30`} />

          <div className="relative flex items-start gap-3">
            <span className={`text-sm md:text-base font-black bg-clip-text text-transparent bg-linear-to-b ${gradient} pt-0.5`}>
              {item.id}
            </span>

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
    </>
  );
}
