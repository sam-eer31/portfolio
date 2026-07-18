import React, { useState } from 'react';
import { useTheme, THEMES } from '../theme/ThemeContext';
import type { ThemeName } from '../theme/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { themeName, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Nice technical abbreviated labels for each theme
  const themeLabels: Record<ThemeName, string> = {
    blue: 'SYS.OPT_01 // BLUE',
    red: 'SYS.OPT_02 // RED',
    green: 'SYS.OPT_03 // GREEN',
    yellow: 'SYS.OPT_04 // YELLOW',
    purple: 'SYS.OPT_05 // PURPLE',
  };

  return (
    <div 
      className="theme-switcher-container hud-interactive" 
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
        fontFamily: "var(--font-mono)",
        fontSize: '0.65rem',
        letterSpacing: '0.08em',
      }}
    >
      {/* Collapsible Dropdown Panel */}
      <div 
        style={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
          transformOrigin: 'bottom right',
          transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
          background: 'rgba(10, 10, 10, 0.85)',
          border: '1px solid var(--theme-glass-border)',
          borderRadius: '4px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          width: '180px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 15px var(--theme-glow-secondary)',
          clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
        }}
      >
        <div style={{ 
          color: 'var(--theme-text-muted)', 
          fontSize: '0.55rem', 
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '6px',
          marginBottom: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>THEME_SELECTOR.EXE</span>
          <span style={{ color: 'var(--theme-primary)', animation: 'pulse-glow 2s infinite alternate' }}>● LIVE</span>
        </div>

        {(Object.keys(THEMES) as ThemeName[]).map((name) => {
          const isActive = themeName === name;
          return (
            <button
              key={name}
              onClick={() => {
                setTheme(name);
                setIsOpen(false);
              }}
              style={{
                background: isActive ? 'var(--theme-glow-primary)' : 'rgba(255,255,255,0.02)',
                border: isActive ? '1px solid var(--theme-primary)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '2px',
                padding: '6px 8px',
                color: isActive ? '#fff' : 'var(--theme-text-muted)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = THEMES[name].primary;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.color = 'var(--theme-text-muted)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }
              }}
            >
              <span>{themeLabels[name]}</span>
              {/* Color swatch inside button */}
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: THEMES[name].primary,
                boxShadow: `0 0 6px ${THEMES[name].primary}`,
                display: 'inline-block',
                marginLeft: '8px'
              }}/>
            </button>
          );
        })}
      </div>

      {/* Main Switcher Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isOpen ? 'var(--theme-glow-primary)' : 'rgba(0, 0, 0, 0.60)',
          border: '1px solid var(--theme-glass-border)',
          borderRadius: '4px',
          padding: '8px 14px',
          color: 'var(--theme-primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          boxShadow: isOpen ? '0 0 15px var(--theme-glow-primary)' : '0 0 10px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.background = 'var(--theme-glow-secondary)';
            e.currentTarget.style.borderColor = 'var(--theme-primary)';
            e.currentTarget.style.boxShadow = '0 0 15px var(--theme-glow-primary)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.60)';
            e.currentTarget.style.borderColor = 'var(--theme-glass-border)';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
          }
        }}
      >
        <span style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--theme-primary)',
          boxShadow: '0 0 8px var(--theme-primary)',
          animation: 'pulse-glow 1.5s infinite alternate'
        }}/>
        <span>THEME_SYS // {themeName.toUpperCase()}</span>
      </button>
    </div>
  );
};
