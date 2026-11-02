import React, { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES, ThemeId, BgMode } from '../context/ThemeContext';
import {
  Palette,
  Sparkles,
  Layers,
  Activity,
  Menu,
  X,
  User,
  ChevronDown,
  Check,
  Zap,
  Globe,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { BLOG_SITE_CONFIG } from '../data/portfolioData';

interface HeaderProps {
  currentView: 'home' | 'services' | 'dispatches';
  onNavigate: (view: 'home' | 'services' | 'dispatches') => void;
  onOpenScoping: () => void;
  onOpenDiagnostics: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenScoping,
  onOpenDiagnostics,
  onOpenProfile
}) => {
  const { theme, themeId, setThemeId, bgMode, setBgMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [bgDropdownOpen, setBgDropdownOpen] = useState(false);

  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const bgDropdownRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setThemeDropdownOpen(false);
      }
      if (bgDropdownRef.current && !bgDropdownRef.current.contains(event.target as Node)) {
        setBgDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const bgModeLabels: Record<BgMode, { label: string; desc: string }> = {
    aurora: { label: 'Animated Aurora', desc: 'Luminous fluid mesh waves' },
    particles: { label: 'Constellation Mesh', desc: 'Interactive connecting nodes' },
    grid: { label: 'Geometric Blueprint', desc: 'Clean dot grid with spotlight' },
    clean: { label: 'Clean Minimalist', desc: 'Distraction-free pure obsidian' }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300"
      style={{
        backgroundColor: 'rgba(5, 7, 10, 0.78)',
        borderColor: theme.border
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-md"
                style={{
                  backgroundColor: theme.badgeBg,
                  border: `1px solid ${theme.border}`,
                  color: theme.primary
                }}
              >
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-base font-bold tracking-tight text-white group-hover:text-white transition-colors">
                    42ndLIGHT
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: theme.primary }}
                  />
                </div>
                <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                  SYSTEMS CONSULTING
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/5">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{
                backgroundColor: currentView === 'home' ? theme.badgeBg : 'transparent',
                border: currentView === 'home' ? `1px solid ${theme.border}` : '1px solid transparent',
                color: currentView === 'home' ? theme.primary : undefined
              }}
            >
              Systems
            </button>

            <button
              onClick={() => onNavigate('services')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                currentView === 'services'
                  ? 'text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{
                backgroundColor: currentView === 'services' ? theme.badgeBg : 'transparent',
                border: currentView === 'services' ? `1px solid ${theme.border}` : '1px solid transparent',
                color: currentView === 'services' ? theme.primary : undefined
              }}
            >
              Services
            </button>

            <button
              onClick={() => onNavigate('dispatches')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                currentView === 'dispatches'
                  ? 'text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{
                backgroundColor: currentView === 'dispatches' ? theme.badgeBg : 'transparent',
                border: currentView === 'dispatches' ? `1px solid ${theme.border}` : '1px solid transparent',
                color: currentView === 'dispatches' ? theme.primary : undefined
              }}
            >
              Dispatches
            </button>
          </nav>

          {/* Desktop Controls & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Color Changer Dropdown */}
            <div className="relative" ref={themeDropdownRef}>
              <button
                onClick={() => {
                  setThemeDropdownOpen(!themeDropdownOpen);
                  setBgDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border text-slate-300 hover:text-white transition-all cursor-pointer bg-black/40"
                style={{ borderColor: theme.border }}
                title="Change Color Theme"
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: theme.primary }}
                />
                <span className="font-mono text-[11px]">{theme.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {themeDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 rounded-2xl p-3 shadow-2xl border backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                  style={{
                    backgroundColor: 'rgba(8, 12, 18, 0.96)',
                    borderColor: theme.border
                  }}
                >
                  <div className="px-2 py-1 mb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Dynamic Color Theme
                  </div>
                  <div className="space-y-1">
                    {(Object.keys(THEMES) as ThemeId[]).map((id) => {
                      const t = THEMES[id];
                      const isSelected = themeId === id;
                      return (
                        <button
                          key={id}
                          onClick={() => {
                            setThemeId(id);
                            setThemeDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer hover:bg-white/5"
                          style={{
                            backgroundColor: isSelected ? 'rgba(255,255,255,0.06)' : 'transparent'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-4 h-4 rounded-full shrink-0 shadow"
                              style={{ backgroundColor: t.primary }}
                            />
                            <div>
                              <div className="text-xs font-medium text-white">{t.name}</div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[170px]">
                                {t.tagline}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Background Style Switcher */}
            <div className="relative" ref={bgDropdownRef}>
              <button
                onClick={() => {
                  setBgDropdownOpen(!bgDropdownOpen);
                  setThemeDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border text-slate-300 hover:text-white transition-all cursor-pointer bg-black/40"
                style={{ borderColor: theme.border }}
                title="Change Background Style"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-[11px]">
                  {bgMode === 'clean' ? 'Clean BG' : 'Animated BG'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {bgDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl p-3 shadow-2xl border backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                  style={{
                    backgroundColor: 'rgba(8, 12, 18, 0.96)',
                    borderColor: theme.border
                  }}
                >
                  <div className="px-2 py-1 mb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Background Canvas Style
                  </div>
                  <div className="space-y-1">
                    {(Object.keys(bgModeLabels) as BgMode[]).map((mode) => {
                      const item = bgModeLabels[mode];
                      const isSelected = bgMode === mode;
                      return (
                        <button
                          key={mode}
                          onClick={() => {
                            setBgMode(mode);
                            setBgDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer hover:bg-white/5"
                          style={{
                            backgroundColor: isSelected ? 'rgba(255,255,255,0.06)' : 'transparent'
                          }}
                        >
                          <div>
                            <div className="text-xs font-medium text-white">{item.label}</div>
                            <div className="text-[10px] text-slate-400">{item.desc}</div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Profile trigger */}
            <button
              onClick={onOpenProfile}
              className="p-1.5 rounded-xl border text-slate-300 hover:text-white transition-all cursor-pointer bg-black/40 flex items-center gap-2 group"
              style={{ borderColor: theme.border }}
              title="Architect Profile (Kennedy Kinyua)"
            >
              <div
                className="w-6 h-6 rounded-lg overflow-hidden border transition-transform group-hover:scale-105"
                style={{ borderColor: theme.primary }}
              >
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_omio7fomio7fomio_48f2e14a.jpeg"
                  alt="Kennedy Kinyua"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-mono text-[11px] pr-1 hidden xl:inline text-slate-300">
                Kennedy K.
              </span>
            </button>

            {/* Primary CTA Button */}
            <button
              onClick={onOpenScoping}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-black transition-all cursor-pointer shadow-md hover:scale-[1.02]"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 4px 18px -4px ${theme.glow}`
              }}
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="p-2 rounded-xl border text-slate-300 bg-black/40"
              style={{ borderColor: theme.border }}
              title="Color Theme"
            >
              <span
                className="w-3 h-3 rounded-full block"
                style={{ backgroundColor: theme.primary }}
              />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border text-slate-300 bg-black/40"
              style={{ borderColor: theme.border }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b px-4 py-6 backdrop-blur-2xl"
          style={{
            backgroundColor: 'rgba(5, 7, 10, 0.98)',
            borderColor: theme.border
          }}
        >
          <div className="space-y-4">
            {/* View Links */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: currentView === 'home' ? theme.badgeBg : 'transparent',
                  color: currentView === 'home' ? theme.primary : '#e2e8f0'
                }}
              >
                Systems &amp; Architecture (Home)
              </button>
              <button
                onClick={() => {
                  onNavigate('services');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: currentView === 'services' ? theme.badgeBg : 'transparent',
                  color: currentView === 'services' ? theme.primary : '#e2e8f0'
                }}
              >
                Consulting Services &amp; Offerings
              </button>
              <button
                onClick={() => {
                  onNavigate('dispatches');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: currentView === 'dispatches' ? theme.badgeBg : 'transparent',
                  color: currentView === 'dispatches' ? theme.primary : '#e2e8f0'
                }}
              >
                Engineering Dispatches &amp; Blog
              </button>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  onOpenProfile();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-xs font-mono text-slate-300 bg-white/[0.03]"
              >
                <div
                  className="w-6 h-6 rounded-lg overflow-hidden border shrink-0"
                  style={{ borderColor: theme.primary }}
                >
                  <img
                    src="/assets/aistudio/Gemini_Generated_Image_omio7fomio7fomio_48f2e14a.jpeg"
                    alt="Kennedy Kinyua"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span>Architect Profile (Kennedy Kinyua)</span>
              </button>
              <button
                onClick={() => {
                  onOpenDiagnostics();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl text-xs font-mono text-slate-300 bg-white/[0.03]"
              >
                <Activity className="w-4 h-4" />
                <span>Edge Node Diagnostics</span>
              </button>
            </div>

            {/* Background Style Toggle for Mobile */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 mb-2">BACKGROUND STYLE</div>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(bgModeLabels) as BgMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setBgMode(mode)}
                    className="p-2 rounded-lg text-xs font-medium border text-left"
                    style={{
                      borderColor: bgMode === mode ? theme.primary : 'rgba(255,255,255,0.08)',
                      backgroundColor: bgMode === mode ? theme.badgeBg : 'transparent',
                      color: bgMode === mode ? theme.primary : '#94a3b8'
                    }}
                  >
                    {bgModeLabels[mode].label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => {
                  onOpenScoping();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl text-xs font-semibold text-black"
                style={{ backgroundColor: theme.primary }}
              >
                Initiate Scoping Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
