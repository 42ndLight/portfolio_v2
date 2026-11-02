import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Bolt, ArrowDownRight, CheckCircle2, ShieldCheck, Cpu, Activity, Sparkles, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onOpenScoping: () => void;
  onExploreSystems: () => void;
  onOpenDiagnostics: () => void;
  onOpenProfile: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenScoping,
  onExploreSystems,
  onOpenDiagnostics,
  onOpenProfile
}) => {
  const { theme } = useTheme();
  const [activeCommand, setActiveCommand] = useState<string>('cluster.healthCheck()');
  const [terminalOutput, setTerminalOutput] = useState<string>('All systems operational · P99 Latency 14.2ms · Zero-downtime WAL active');
  const [pingPulse, setPingPulse] = useState(14);

  // Live jitter on latency
  useEffect(() => {
    const interval = setInterval(() => {
      setPingPulse(Math.floor(13 + Math.random() * 3));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const runTerminalCommand = (cmd: string, output: string) => {
    setActiveCommand(cmd);
    setTerminalOutput('Executing...');
    setTimeout(() => {
      setTerminalOutput(output);
    }, 300);
  };

  return (
    <section id="hero" className="relative pt-6 md:pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Hero Column */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status Indicator Bar */}
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-6 text-xs font-mono backdrop-blur-md"
            style={{
              backgroundColor: theme.badgeBg,
              border: `1px solid ${theme.border}`,
              color: theme.primary
            }}
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: theme.primary }}
            />
            <span className="font-semibold tracking-wide">
              SYSTEM ONLINE · EDGE LATENCY {pingPulse}ms · NAIROBI / GLOBAL
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Engineering{' '}
            <span
              className="transition-colors duration-500"
              style={{ color: theme.primary }}
            >
              Resilient Full-Stack
            </span>{' '}
            Systems &amp; Scalable Cloud Architectures.
          </h1>

          {/* Subcopy */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl font-normal">
            Specialized engineering consultancy for mission-critical platforms. Designing
            zero-downtime offline-first PWAs, fault-tolerant backend pipelines in{' '}
            <span className="text-slate-200 font-medium">Django &amp; Vue 3</span>, and high-volume
            fintech integrations.
          </p>

          {/* Dual Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={onOpenScoping}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-xl text-black transition-all duration-200 cursor-pointer shadow-lg hover:brightness-110 active:scale-95"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 10px 25px -5px ${theme.glow}`
              }}
            >
              <span>Initiate Consultation</span>
              <Bolt className="w-4 h-4 fill-black" />
            </button>
            <button
              onClick={onExploreSystems}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 text-sm font-medium px-6 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer hover:bg-white/5"
              style={{
                borderColor: theme.border,
                color: theme.primary
              }}
            >
              <span>Explore Systems</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>
          </div>

          {/* Clean Interactive Architecture Console */}
          <div
            className="w-full max-w-xl rounded-2xl p-4 font-mono text-xs backdrop-blur-xl border shadow-2xl relative"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border
            }}
          >
            {/* Window header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                <span className="ml-2 font-mono text-slate-300">sys.kernel.telemetry</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">AF-EAST-1</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                  style={{ backgroundColor: theme.badgeBg, color: theme.primary }}
                >
                  LIVE
                </span>
              </div>
            </div>

            {/* Quick interactive commands */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {[
                { label: 'healthCheck()', cmd: 'cluster.healthCheck()', out: 'Cluster OK · 14.2ms ping · 99.98% SLA' },
                { label: 'offlineSync()', cmd: 'dexie.syncStatus()', out: 'Dexie.js IndexedDB · 0 pending conflicts · 14.2k synced' },
                { label: 'darajaRails()', cmd: 'mpesa.webhookLatency()', out: 'Daraja STK P95: 180ms · Auto-reconciliation 100%' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => runTerminalCommand(item.cmd, item.out)}
                  className="px-2.5 py-1 rounded-lg text-[11px] border transition-colors cursor-pointer"
                  style={{
                    backgroundColor: activeCommand === item.cmd ? theme.badgeBg : 'rgba(255,255,255,0.02)',
                    borderColor: activeCommand === item.cmd ? theme.primary : 'rgba(255,255,255,0.08)',
                    color: activeCommand === item.cmd ? theme.primary : '#94a3b8'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Terminal Command & Response */}
            <div className="space-y-1 bg-black/50 rounded-xl p-3 border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400">
                <span style={{ color: theme.primary }}>❯</span>
                <span className="text-white">{activeCommand}</span>
              </div>
              <div className="text-xs pt-1" style={{ color: theme.primary }}>
                {terminalOutput}
              </div>
            </div>
          </div>
        </div>

        {/* Right Hero Visual / Credential Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div
            className="rounded-3xl p-6 sm:p-8 backdrop-blur-xl border transition-all relative overflow-hidden"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border
            }}
          >
            {/* Top Stat */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1">
                  CONSULTANT PROFILE
                </span>
                <h3 className="text-xl font-bold text-white">Kennedy Kinyua</h3>
              </div>
              <button
                onClick={onOpenProfile}
                className="px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer"
                style={{
                  backgroundColor: theme.badgeBg,
                  borderColor: theme.border,
                  color: theme.primary
                }}
              >
                View Dossier
              </button>
            </div>

            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Staff-level systems architect specializing in offline-capable enterprise applications,
              high-throughput payment pipelines, and resilient cloud infrastructures across Africa
              and global markets.
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="text-2xl font-bold text-white mb-0.5">99.98%</div>
                <div className="text-[11px] text-slate-400 font-mono">Uptime Production SLA</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="text-2xl font-bold text-white mb-0.5" style={{ color: theme.primary }}>
                  0ms
                </div>
                <div className="text-[11px] text-slate-400 font-mono">Offline Local Write Lag</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="text-2xl font-bold text-white mb-0.5">450k+</div>
                <div className="text-[11px] text-slate-400 font-mono">eTIMS Tax Invoices</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="text-2xl font-bold text-white mb-0.5" style={{ color: theme.primary }}>
                  10M+
                </div>
                <div className="text-[11px] text-slate-400 font-mono">Fintech Webhook Volume</div>
              </div>
            </div>

            {/* Verification Line */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Independent Consultant</span>
              </div>
              <button
                onClick={onOpenDiagnostics}
                className="hover:underline font-mono text-[11px]"
                style={{ color: theme.primary }}
              >
                Edge Diagnostics →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
