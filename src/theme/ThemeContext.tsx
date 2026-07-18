import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 'blue' | 'red' | 'green' | 'yellow' | 'purple';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  bgDark: string;
  bgGrid: string;
  glowPrimary: string;
  glowSecondary: string;
  glassBg: string;
  glassBorder: string;
  textMuted: string;
  brainPrimary: string;
  brainPrimaryLight: string;
  brainPrimaryDark: string;
}

export const THEMES: Record<ThemeName, ThemeColors> = {
  blue: {
    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    primaryDark: '#2563EB',
    bgDark: '#000000',
    bgGrid: 'rgba(59, 130, 246, 0.05)',
    glowPrimary: 'rgba(59, 130, 246, 0.3)',
    glowSecondary: 'rgba(37, 99, 235, 0.2)',
    glassBg: 'rgba(0, 0, 0, 0.20)',
    glassBorder: 'rgba(96, 165, 250, 0.2)',
    textMuted: '#94A3B8',
    brainPrimary: '#3B82F6',
    brainPrimaryLight: '#60A5FA',
    brainPrimaryDark: '#2563EB'
  },
  red: {
    primary: '#EF4444',
    primaryLight: '#F87171',
    primaryDark: '#DC2626',
    bgDark: '#000000',
    bgGrid: 'rgba(239, 68, 68, 0.05)',
    glowPrimary: 'rgba(239, 68, 68, 0.3)',
    glowSecondary: 'rgba(220, 38, 38, 0.2)',
    glassBg: 'rgba(0, 0, 0, 0.20)',
    glassBorder: 'rgba(248, 113, 113, 0.2)',
    textMuted: '#FCA5A5',
    brainPrimary: '#E63946',
    brainPrimaryLight: '#FF8896',
    brainPrimaryDark: '#A8201A'
  },
  green: {
    primary: '#10B981',
    primaryLight: '#34D399',
    primaryDark: '#059669',
    bgDark: '#000000',
    bgGrid: 'rgba(16, 185, 129, 0.05)',
    glowPrimary: 'rgba(16, 185, 129, 0.3)',
    glowSecondary: 'rgba(5, 150, 105, 0.2)',
    glassBg: 'rgba(0, 0, 0, 0.20)',
    glassBorder: 'rgba(52, 211, 153, 0.2)',
    textMuted: '#6EE7B7',
    brainPrimary: '#10B981',
    brainPrimaryLight: '#34D399',
    brainPrimaryDark: '#059669'
  },
  yellow: {
    primary: '#F59E0B',
    primaryLight: '#FBBF24',
    primaryDark: '#D97706',
    bgDark: '#000000',
    bgGrid: 'rgba(245, 158, 11, 0.05)',
    glowPrimary: 'rgba(245, 158, 11, 0.3)',
    glowSecondary: 'rgba(217, 119, 6, 0.2)',
    glassBg: 'rgba(0, 0, 0, 0.20)',
    glassBorder: 'rgba(251, 191, 36, 0.2)',
    textMuted: '#FCD34D',
    brainPrimary: '#F59E0B',
    brainPrimaryLight: '#FBBF24',
    brainPrimaryDark: '#D97706'
  },
  purple: {
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDark: '#7C3AED',
    bgDark: '#000000',
    bgGrid: 'rgba(139, 92, 246, 0.05)',
    glowPrimary: 'rgba(139, 92, 246, 0.3)',
    glowSecondary: 'rgba(124, 58, 237, 0.2)',
    glassBg: 'rgba(0, 0, 0, 0.20)',
    glassBorder: 'rgba(167, 139, 250, 0.2)',
    textMuted: '#C4B5FD',
    brainPrimary: '#8B5CF6',
    brainPrimaryLight: '#A78BFA',
    brainPrimaryDark: '#7C3AED'
  }
};

interface ThemeContextType {
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeNameState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('portfolio-theme') as ThemeName;
    return THEMES[saved] ? saved : 'blue';
  });

  const setTheme = (name: ThemeName) => {
    if (THEMES[name]) {
      setThemeNameState(name);
      localStorage.setItem('portfolio-theme', name);
    }
  };

  useEffect(() => {
    const colors = THEMES[themeName];
    // Inject CSS variables into the root
    document.documentElement.style.setProperty('--theme-primary', colors.primary);
    document.documentElement.style.setProperty('--theme-primary-light', colors.primaryLight);
    document.documentElement.style.setProperty('--theme-primary-dark', colors.primaryDark);
    document.documentElement.style.setProperty('--theme-bg-dark', colors.bgDark);
    document.documentElement.style.setProperty('--theme-bg-grid', colors.bgGrid);
    document.documentElement.style.setProperty('--theme-glow-primary', colors.glowPrimary);
    document.documentElement.style.setProperty('--theme-glow-secondary', colors.glowSecondary);
    document.documentElement.style.setProperty('--theme-glass-bg', colors.glassBg);
    document.documentElement.style.setProperty('--theme-glass-border', colors.glassBorder);
    document.documentElement.style.setProperty('--theme-text-muted', colors.textMuted);
    document.documentElement.style.setProperty('--theme-brain-primary', colors.brainPrimary);
    document.documentElement.style.setProperty('--theme-brain-primary-light', colors.brainPrimaryLight);
    document.documentElement.style.setProperty('--theme-brain-primary-dark', colors.brainPrimaryDark);
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setTheme, colors: THEMES[themeName] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
