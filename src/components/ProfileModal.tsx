import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ENGINEER_PROFILE, BLOG_SITE_CONFIG } from '../data/portfolioData';
import { BlogPost } from '../types';
import {
  X,
  User,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Award,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  Copy,
  Check,
  ArrowRight,
  MapPin
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScoping: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenScoping,
  onSelectPost
}) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const [copiedPgp, setCopiedPgp] = useState(false);
  const profile = ENGINEER_PROFILE;

  const copyPgp = () => {
    navigator.clipboard.writeText(profile.pgpKey);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  return (
    <div
      id="profile-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto font-sans"
    >
      <div
        id="profile-modal-dialog"
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden my-auto border shadow-2xl backdrop-blur-2xl"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          boxShadow: `0 25px 60px -15px ${theme.glow}`
        }}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-black/40">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-2"
              style={{
                backgroundColor: theme.badgeBg,
                border: `1px solid ${theme.border}`,
                color: theme.primary
              }}
            >
              <User className="w-3.5 h-3.5" />
              <span>ARCHITECT PROFILE · KENNEDY KINYUA</span>
            </span>
            <span className="font-mono text-xs text-slate-400 hidden sm:inline">
              FOUNDER &amp; LEAD CONSULTANT · 42NDLIGHT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={BLOG_SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer font-medium"
              style={{
                backgroundColor: theme.badgeBg,
                borderColor: theme.border,
                color: theme.primary
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Canonical Blog ↗</span>
            </a>

            <button
              id="profile-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close profile screen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8 font-sans">
          {/* Hero Profile Overview Card */}
          <div className="bg-black/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative">
            {/* Avatar Frame */}
            <div className="relative shrink-0">
              <div
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 shadow-lg relative"
                style={{ borderColor: theme.primary }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="Kennedy Kinyua portrait"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div
                className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full border shadow-sm whitespace-nowrap"
                style={{
                  backgroundColor: '#000',
                  borderColor: theme.border,
                  color: theme.primary
                }}
              >
                STAFF ARCHITECT
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span
                  className="font-mono text-xs px-2.5 py-0.5 rounded-lg border font-medium"
                  style={{
                    backgroundColor: theme.badgeBg,
                    borderColor: theme.border,
                    color: theme.primary
                  }}
                >
                  {profile.title}
                </span>
                <span className="font-mono text-xs flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: theme.primary }}></span>
                  {profile.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {profile.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 font-mono text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-white">
                  <MapPin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  {profile.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <Award className="w-3.5 h-3.5" />
                  {profile.experienceYears}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {profile.bio}
              </p>

              {/* Social & Contact Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white bg-black/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white bg-black/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={profile.socials.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-xl border text-slate-300 hover:text-white bg-black/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                  style={{ borderColor: theme.border }}
                >
                  <BookOpen className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <span>Blogsite</span>
                </a>
                <button
                  onClick={copyPgp}
                  className="text-xs px-3 py-1.5 rounded-xl border bg-black/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                  style={{ borderColor: theme.border, color: theme.primary }}
                  title="Click to copy PGP fingerprint"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PGP: {profile.pgpKey.substring(0, 9)}...</span>
                  {copiedPgp ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
                </button>
              </div>
            </div>
          </div>

          {/* Architecture Philosophy & Engineering Tenets */}
          <div>
            <div
              className="font-mono text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
              style={{ color: theme.primary }}
            >
              <Terminal className="w-4 h-4" />
              ARCHITECTURAL PRINCIPLES &amp; OPERATING DISCIPLINE
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.philosophy.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="font-semibold text-sm text-white mb-2" style={{ color: theme.primary }}>
                      {item.rule}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {item.principle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Production Milestones & High-Impact Deployments */}
          <div>
            <div
              className="font-mono text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
              style={{ color: theme.primary }}
            >
              <Calendar className="w-4 h-4" />
              PRODUCTION TIMELINE &amp; IMPACT MILESTONES
            </div>

            <div className="space-y-3 font-mono text-xs">
              {profile.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 border border-slate-800/80 p-4 rounded-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ color: theme.primary }}>{m.year}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-white font-bold">{m.role}</span>
                    </div>
                    <span className="text-slate-400">{m.company}</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">
                    {m.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Full Technical Stack Matrix */}
          <div>
            <div className="font-mono text-xs text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4" style={{ color: theme.primary }} />
              TECHNICAL STACK &amp; SPECIALIZATIONS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {profile.stackBreakdown.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 border border-slate-800 p-4 rounded-xl"
                >
                  <div className="font-bold text-white mb-2.5" style={{ color: theme.primary }}>
                    {group.area}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-300 text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 border-t border-slate-800 bg-black/60 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Dossier
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenScoping();
            }}
            className="text-xs font-semibold px-6 py-2.5 rounded-xl text-black transition-all cursor-pointer flex items-center gap-2 shadow-md hover:scale-[1.02]"
            style={{
              backgroundColor: theme.primary,
              boxShadow: `0 4px 16px -4px ${theme.glow}`
            }}
          >
            <span>Retain as Fractional Architect</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
