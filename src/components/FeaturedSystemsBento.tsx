import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ProjectArtifact } from '../types';
import { ArrowRight, ExternalLink, Cpu, Database, Server, Layers, GitBranch } from 'lucide-react';

interface FeaturedBentoProps {
  projects: ProjectArtifact[];
  onSelectProject: (project: ProjectArtifact) => void;
}

export const FeaturedSystemsBento: React.FC<FeaturedBentoProps> = ({
  projects,
  onSelectProject
}) => {
  const { theme } = useTheme();

  const homepointPos = projects.find((p) => p.id === 'homepoint-pos') || projects[0];
  const kaziLine = projects.find((p) => p.id === 'kaziline') || projects[1];
  const invoiceEngine = projects.find((p) => p.id === 'invoice-engine') || projects[2];

  return (
    <section id="systems" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div
            className="text-xs font-mono tracking-widest uppercase mb-2 flex items-center gap-2"
            style={{ color: theme.primary }}
          >
            <span className="w-5 h-px" style={{ backgroundColor: theme.primary }}></span>
            <span>PROVEN PRODUCTION DEPLOYMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Systems &amp; Architectures
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          <span>HIGH-CONCURRENCY</span>
          <span className="mx-2">·</span>
          <span>OFFLINE-FIRST</span>
          <span className="mx-2">·</span>
          <span>FINTECH RAILS</span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CARD 1: Large Bento Hero (Homepoint POS) - 8 cols */}
        {homepointPos && (
          <div
            className="lg:col-span-8 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group border backdrop-blur-xl"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border
            }}
          >
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <span style={{ color: theme.primary }}>{homepointPos.artifactNumber}</span>
                  <span>·</span>
                  <span>{homepointPos.category}</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: theme.primary }}>
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }}></span>
                  <span>{homepointPos.badge}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                {homepointPos.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                {homepointPos.description}
              </p>

              {/* Data Flow Architecture Preview */}
              <div className="rounded-xl p-4 bg-black/50 border border-slate-800/80 mb-6 font-mono text-xs text-slate-300">
                <div className="text-slate-500 uppercase text-[10px] mb-2 font-semibold">
                  SYSTEM SYNCHRONIZATION TOPOLOGY
                </div>
                <div className="overflow-x-auto whitespace-nowrap text-xs py-1" style={{ color: theme.primary }}>
                  Client PWA ⇄ Dexie.js / IndexedDB ──(Sync Queue)──► Django REST ──► Clustered Postgres + eTIMS
                </div>
              </div>

              {/* Engineering Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">LOCAL WRITE LAG</span>
                  <span className="font-bold text-white text-sm">0ms Offline</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">RECONCILIATION</span>
                  <span className="font-bold text-white text-sm">14,200+ Queued</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">TAX SIGNING</span>
                  <span className="font-bold text-white text-sm">KRA eTIMS VSCU</span>
                </div>
              </div>

              {/* Tech tags unboxed */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {homepointPos.techTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] text-slate-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400">Production Multi-Store Deployments</span>
              <button
                onClick={() => onSelectProject(homepointPos)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-black transition-all cursor-pointer shadow-md hover:scale-[1.02]"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 6px 20px -4px ${theme.glow}`
                }}
              >
                <span>View Architecture Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* CARD 2: KaziLine (USSD Automation) - 4 cols */}
        {kaziLine && (
          <div
            className="lg:col-span-4 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group border backdrop-blur-xl"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border
            }}
          >
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center justify-between gap-2 mb-6 font-mono text-xs">
                <span style={{ color: theme.primary }}>{kaziLine.artifactNumber}</span>
                <span className="text-slate-400">{kaziLine.badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                {kaziLine.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                {kaziLine.description}
              </p>

              {/* Key Metric highlight */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800/80 mb-6">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                  USSD SESSION THROUGHPUT
                </span>
                <div className="text-xl font-bold text-white mb-1">Sub-180ms Latency</div>
                <p className="text-[11px] text-slate-400">
                  Telco gateway timeouts mitigated with asynchronous Redis state machines.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {kaziLine.techTags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-slate-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">Fintech Infrastructure</span>
              <button
                onClick={() => onSelectProject(kaziLine)}
                className="text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:underline"
                style={{ color: theme.primary }}
              >
                <span>View Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* CARD 3: Automated Quoting Engine - 12 cols */}
        {invoiceEngine && (
          <div
            className="lg:col-span-12 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 transition-all duration-300 relative group border backdrop-blur-xl"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border
            }}
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono mb-2">
                <span style={{ color: theme.primary }}>{invoiceEngine.artifactNumber}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{invoiceEngine.category}</span>
                <span className="text-slate-500">·</span>
                <span className="text-emerald-400">{invoiceEngine.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {invoiceEngine.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {invoiceEngine.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {invoiceEngine.techTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-slate-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => onSelectProject(invoiceEngine)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 6px 20px -4px ${theme.glow}`
                }}
              >
                <span>Inspect Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
