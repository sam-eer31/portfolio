import React from 'react';

export interface AboutBadgeProps {
  badge: {
    sub: string;
    label: string;
    color: string;
    bg: string;
    icon: string;
  };
  className?: string;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'utensils':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      );
    case 'code':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case 'mindset':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" />
          <path d="M9 18h6" /><path d="M10 22h4" />
        </svg>
      );
    case 'opportunities':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
};

export function Badge({ badge, className = "" }: AboutBadgeProps) {
  return (
    <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all hover:bg-white/[0.04] hover:border-white/[0.08] ${className}`}>
      <div className={`p-2.5 rounded-xl ${badge.bg} ${badge.color}`}>
        {getIcon(badge.icon)}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground/80 leading-tight uppercase tracking-wider font-medium">{badge.sub}</span>
        <span className="text-base font-bold text-white/95 leading-tight mt-0.5">{badge.label}</span>
      </div>
    </div>
  );
}
