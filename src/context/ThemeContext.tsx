import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'cyan' | 'emerald' | 'violet' | 'amber' | 'mono';
export type BgMode = 'aurora' | 'particles' | 'grid' | 'clean';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  border: string;
  badgeBg: string;
  dotColor: string;
  bgDark: string;
  cardBg: string;
  activeIndicator: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    tagline: 'High-Velocity Cloud & Edge Infrastructure',
    primary: '#00E5FF',
    secondary: '#38bdf8',
    accent: '#818cf8',
    glow: 'rgba(0, 229, 255, 0.4)',
    border: 'rgba(0, 229, 255, 0.25)',
    badgeBg: 'rgba(0, 229, 255, 0.08)',
    dotColor: '#00E5FF',
    bgDark: '#05070a',
    cardBg: 'rgba(10, 15, 24, 0.82)',
    activeIndicator: 'bg-[#00E5FF]'
  },
  emerald: {
    id: 'emerald',
    name: 'Electric Mint',
    tagline: 'Refined Resilience & High-Throughput Fintech',
    primary: '#00FF66',
    secondary: '#10b981',
    accent: '#06b6d4',
    glow: 'rgba(0, 255, 102, 0.4)',
    border: 'rgba(0, 255, 102, 0.25)',
    badgeBg: 'rgba(0, 255, 102, 0.08)',
    dotColor: '#00FF66',
    bgDark: '#040805',
    cardBg: 'rgba(8, 18, 12, 0.82)',
    activeIndicator: 'bg-[#00FF66]'
  },
  violet: {
    id: 'violet',
    name: 'Hyper Violet',
    tagline: 'Modern Deep-Stack & AI Pipeline Architecture',
    primary: '#c084fc',
    secondary: '#818cf8',
    accent: '#f472b6',
    glow: 'rgba(192, 132, 252, 0.4)',
    border: 'rgba(192, 132, 252, 0.25)',
    badgeBg: 'rgba(192, 132, 252, 0.08)',
    dotColor: '#c084fc',
    bgDark: '#08050e',
    cardBg: 'rgba(18, 12, 30, 0.82)',
    activeIndicator: 'bg-[#c084fc]'
  },
  amber: {
    id: 'amber',
    name: 'Solar Amber',
    tagline: 'Industrial Hardware & Mission-Critical Systems',
    primary: '#fbbf24',
    secondary: '#f59e0b',
    accent: '#fb923c',
    glow: 'rgba(251, 191, 36, 0.4)',
    border: 'rgba(251, 191, 36, 0.25)',
    badgeBg: 'rgba(251, 191, 36, 0.08)',
    dotColor: '#fbbf24',
    bgDark: '#080602',
    cardBg: 'rgba(22, 16, 6, 0.82)',
    activeIndicator: 'bg-[#fbbf24]'
  },
  mono: {
    id: 'mono',
    name: 'Pure Monochrome',
    tagline: 'Minimalist Titanium & Architectural Precision',
    primary: '#ffffff',
    secondary: '#94a3b8',
    accent: '#cbd5e1',
    glow: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.2)',
    badgeBg: 'rgba(255, 255, 255, 0.08)',
    dotColor: '#ffffff',
    bgDark: '#070709',
    cardBg: 'rgba(18, 18, 22, 0.82)',
    activeIndicator: 'bg-white'
  }
};

interface ThemeContextType {
  theme: ThemeConfig;
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  bgMode: BgMode;
  setBgMode: (mode: BgMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('theme_palette_id') as ThemeId;
    return saved && THEMES[saved] ? saved : 'cyan';
  });

  const [bgMode, setBgModeState] = useState<BgMode>(() => {
    const saved = localStorage.getItem('theme_bg_mode') as BgMode;
    return saved || 'aurora';
  });

  const setThemeId = (id: ThemeId) => {
    setThemeIdState(id);
    localStorage.setItem('theme_palette_id', id);
  };

  const setBgMode = (mode: BgMode) => {
    setBgModeState(mode);
    localStorage.setItem('theme_bg_mode', mode);
  };

  const theme = THEMES[themeId];

  // Apply CSS Custom Variables to root element for fluid reactive rendering
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-glow', theme.glow);
    root.style.setProperty('--theme-border', theme.border);
    root.style.setProperty('--theme-badge-bg', theme.badgeBg);
    root.style.setProperty('--theme-bg-dark', theme.bgDark);
    root.style.setProperty('--theme-card-bg', theme.cardBg);
    document.body.style.backgroundColor = theme.bgDark;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, bgMode, setBgMode }}>
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
