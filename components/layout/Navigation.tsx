"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { HamburgerToggle } from "../ui/HamburgerToggle";

const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Interests", href: "#interests" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
        {links.map((link) => (
          <a key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            {link.name}
          </a>
        ))}
      </nav>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex items-center">
        <HamburgerToggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      </div>

      {/* Mobile Dropdown - Extension to Header rendered via Portal to prevent backdrop-blur clashing */}
      {mounted
        ? createPortal(
            <div 
              className={`fixed top-16 left-0 w-full bg-background/80 backdrop-blur border-b border-border md:hidden overflow-hidden transition-all duration-700 ease-out shadow-2xl z-40 ${
                isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
              style={{
                // Delay the container from closing immediately so we can see the reverse card animation
                transitionDelay: isOpen ? '0ms' : '200ms'
              }}
            >
              <div 
                className="flex flex-col px-6 py-4 gap-2"
                style={{ perspective: "1000px" }}
              >
                {links.map((link, index) => {
                  // Max delay is 5 * 40 = 200ms. Card duration is 500ms. Total = 700ms, perfectly matching the container's duration-700.
                  const delay = isOpen ? index * 40 : (links.length - 1 - index) * 40;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block bg-white/5 border border-white/5 rounded-lg py-2.5 px-4 text-center transition-all duration-500 hover:bg-white/10"
                      style={{
                        transformOrigin: "top center",
                        transform: isOpen 
                          ? `translateY(0) rotateX(0deg) scale(1)` 
                          : `translateY(-${(index + 1) * 30}px) rotateX(-60deg) scale(0.9)`,
                        opacity: isOpen ? 1 : 0,
                        transitionDelay: `${delay}ms`,
                      }}
                    >
                      <span className="text-xs font-bold text-white/90 tracking-widest uppercase">
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
