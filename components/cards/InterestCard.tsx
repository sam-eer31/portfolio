import React from 'react';
import Image from 'next/image';
import { NeonCard } from './NeonCard';

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

      <NeonCard 
        id={item.id}
        title={item.title}
        description={item.description}
        gradient={gradient}
        className="-mt-8 md:-mt-12"
      />
    </>
  );
}
