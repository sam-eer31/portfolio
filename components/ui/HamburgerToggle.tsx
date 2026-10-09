"use client";

interface HamburgerToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

export function HamburgerToggle({ isOpen, toggle }: HamburgerToggleProps) {
  return (
    <button
      onClick={toggle}
      className="p-2 -mr-2 w-12 h-12 flex flex-col justify-center items-center focus:outline-none group"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-menu"
    >
      <svg 
        viewBox="0 0 32 32" 
        className={`h-full w-full transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? '-rotate-45' : ''}`}
        aria-hidden="true"
      >
        <path 
          className="transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] stroke-white group-hover:stroke-[#FF5E3A]"
          style={{
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 3,
            strokeDasharray: isOpen ? '20 300' : '12 63',
            strokeDashoffset: isOpen ? -32.42 : 0,
          }}
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" 
        />
        <path 
          className="transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] stroke-white group-hover:stroke-[#FF5E3A]"
          style={{
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 3,
          }}
          d="M7 16 27 16" 
        />
      </svg>
    </button>
  );
}
