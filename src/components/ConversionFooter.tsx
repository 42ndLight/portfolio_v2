import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { MessageSquare, Mail, Copy, Check, ShieldCheck, User, BookOpen, ExternalLink, ArrowRight, Zap } from 'lucide-react';
import { BLOG_SITE_CONFIG } from '../data/portfolioData';

interface ConversionFooterProps {
  onOpenScoping: () => void;
  onOpenProfile?: () => void;
  onNavigate?: (view: 'home' | 'services' | 'dispatches') => void;
}

export const ConversionFooter: React.FC<ConversionFooterProps> = ({
  onOpenScoping,
  onOpenProfile,
  onNavigate
}) => {
  const { theme } = useTheme();
  const [copiedPgp, setCopiedPgp] = useState(false);
  const pgpKey = '42F9 8B21 A0C4 513E E790';

  const copyPgpToClipboard = () => {
    navigator.clipboard.writeText(pgpKey);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2500);
  };

  return (
    <footer className="relative z-10">
      {/* High-Impact Conversion CTA Banner */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative"
      >
        <div
          className="p-8 sm:p-14 rounded-3xl relative overflow-hidden backdrop-blur-xl border transition-all"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
            boxShadow: `0 20px 50px -20px ${theme.glow}`
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: theme.primary }}
          />

          <div className="relative z-10">
            <span
              className="font-mono text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 mb-6"
              style={{
                backgroundColor: theme.badgeBg,
                border: `1px solid ${theme.border}`,
                color: theme.primary
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>READY TO SCALE OR UNBLOCK YOUR SPRINT?</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Ready to Scale Your Infrastructure or Build Your Next MVP?
            </h2>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Eliminate architectural bottlenecks, engineer zero-latency offline synchronization, and deploy
              bulletproof backend systems built for scale.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={onOpenScoping}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-sm font-semibold px-8 py-4 rounded-xl text-black transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 10px 30px -5px ${theme.glow}`
                }}
              >
                <span>Initiate Scoping Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:contact@42ndlight.africa"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-4 rounded-xl border text-slate-300 hover:text-white transition-all cursor-pointer"
                style={{ borderColor: theme.border }}
              >
                <Mail className="w-4 h-4" />
                <span>contact@42ndlight.africa</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                <span>NDA &amp; IP Protection Standard</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                <span>24-Hour Scope Turnaround</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                <span>Senior Staff Engineering Only</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer Navigation */}
      <div
        className="border-t py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ borderColor: theme.border }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.primary }} />
              <span className="font-mono text-lg font-bold tracking-tight text-white">42ndLIGHT</span>
              <span className="text-xs font-mono text-slate-500">// ARCHITECTURE</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
              Premier technology consulting specializing in full-stack architecture, offline-first
              systems, and scalable cloud infrastructure.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              OPERATING FROM NAIROBI, KE · SERVING GLOBAL ENTERPRISE
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Pages &amp; Views
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate?.('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Systems &amp; Architecture (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Consulting Services &amp; Offerings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('dispatches')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Engineering Dispatches &amp; Blog
                </button>
              </li>
              {onOpenProfile && (
                <li>
                  <button
                    onClick={onOpenProfile}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Architect Profile (Kennedy Kinyua)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: External & Security */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Canonical &amp; Verification
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href={BLOG_SITE_CONFIG.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>blog.42ndlight.africa</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>GitHub Repositories</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <button
                  onClick={copyPgpToClipboard}
                  className="hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  <span>PGP: {pgpKey}</span>
                  {copiedPgp ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-500" />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} 42ndLight &amp; Kennedy Kinyua. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>STABLE_RELEASE</span>
            <span>·</span>
            <span>NODE: AF-EAST-1</span>
            <span>·</span>
            <span style={{ color: theme.primary }}>LATENCY: 14ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
