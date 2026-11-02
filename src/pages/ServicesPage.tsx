import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CONSULTING_CAPABILITIES } from '../data/portfolioData';
import {
  Server,
  WifiOff,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Cpu,
  Zap,
  Activity,
  Terminal,
  FileCheck2,
  Lock,
  GitBranch
} from 'lucide-react';

interface ServicesPageProps {
  onOpenScoping: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenScoping }) => {
  const { theme } = useTheme();

  // Interactive Scope Estimator State
  const [selectedSystemType, setSelectedSystemType] = useState('offline-pwa');
  const [trafficVolume, setTrafficVolume] = useState('medium');
  const [needsFintech, setNeedsFintech] = useState(true);
  const [needsAuditing, setNeedsAuditing] = useState(true);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'WifiOff':
        return <WifiOff className="w-5 h-5" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  const getEstimatedSprint = () => {
    let weeks = 2;
    if (selectedSystemType === 'fullstack-mvp') weeks = 4;
    if (selectedSystemType === 'offline-pwa') weeks = 3;
    if (selectedSystemType === 'cloud-devops') weeks = 2;
    if (needsFintech) weeks += 1;
    if (needsAuditing) weeks += 1;
    return weeks;
  };

  return (
    <div className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-4"
          style={{
            backgroundColor: theme.badgeBg,
            border: `1px solid ${theme.border}`,
            color: theme.primary
          }}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>CORE ARCHITECTURAL SERVICES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Engineering Resilient, Scalable Systems for{' '}
          <span style={{ color: theme.primary }}>Mission-Critical Operations</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          From zero-latency offline-first PWAs to high-throughput financial transaction engines, I
          partner with technology leaders to design and deliver bulletproof systems.
        </p>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {CONSULTING_CAPABILITIES.map((cap, index) => (
          <div
            key={index}
            className="rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative group"
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`
            }}
          >
            <div>
              {/* Header Icon & Protocol */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: theme.badgeBg,
                    border: `1px solid ${theme.border}`,
                    color: theme.primary
                  }}
                >
                  {getIcon(cap.iconName)}
                </div>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                  {cap.protocol}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                {cap.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{cap.description}</p>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5 mb-8">
                {cap.items.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: theme.primary }}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => onOpenScoping(cap.title)}
              className="w-full py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              style={{
                backgroundColor: theme.badgeBg,
                border: `1px solid ${theme.border}`,
                color: theme.primary
              }}
            >
              <span>Scope This Capability</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Scope & Sprint Estimator */}
      <div
        className="rounded-3xl p-8 sm:p-12 mb-20 relative overflow-hidden backdrop-blur-xl"
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono mb-3" style={{ color: theme.primary }}>
              <Terminal className="w-4 h-4" />
              <span>INTERACTIVE SPRINT & ARCHITECTURE ESTIMATOR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Calibrate Your System Architecture Engagement
            </h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Select your system profile to project the required architectural phases, sync
              requirements, and estimated time-to-production.
            </p>

            {/* System Type Selector */}
            <div className="mb-6">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                1. System Architecture Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'offline-pwa', label: 'Offline-First PWA' },
                  { id: 'fullstack-mvp', label: 'Full-Stack Platform' },
                  { id: 'cloud-devops', label: 'DevOps / Cloud Audit' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedSystemType(type.id)}
                    className="p-3 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer"
                    style={{
                      backgroundColor:
                        selectedSystemType === type.id ? theme.badgeBg : 'rgba(255,255,255,0.02)',
                      borderColor: selectedSystemType === type.id ? theme.primary : 'rgba(255,255,255,0.08)',
                      color: selectedSystemType === type.id ? theme.primary : '#94a3b8'
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setNeedsFintech(!needsFintech)}
                className="p-3.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer"
                style={{
                  backgroundColor: needsFintech ? theme.badgeBg : 'rgba(255,255,255,0.02)',
                  borderColor: needsFintech ? theme.primary : 'rgba(255,255,255,0.08)'
                }}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4" style={{ color: theme.primary }} />
                  <span className="text-white font-medium">M-Pesa / Fintech Webhooks</span>
                </div>
                <span
                  className="w-4 h-4 rounded flex items-center justify-center text-[10px]"
                  style={{
                    backgroundColor: needsFintech ? theme.primary : 'transparent',
                    border: `1px solid ${needsFintech ? theme.primary : '#475569'}`,
                    color: '#000'
                  }}
                >
                  {needsFintech && '✓'}
                </span>
              </button>

              <button
                onClick={() => setNeedsAuditing(!needsAuditing)}
                className="p-3.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer"
                style={{
                  backgroundColor: needsAuditing ? theme.badgeBg : 'rgba(255,255,255,0.02)',
                  borderColor: needsAuditing ? theme.primary : 'rgba(255,255,255,0.08)'
                }}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4" style={{ color: theme.primary }} />
                  <span className="text-white font-medium">Security & Compliance Audit</span>
                </div>
                <span
                  className="w-4 h-4 rounded flex items-center justify-center text-[10px]"
                  style={{
                    backgroundColor: needsAuditing ? theme.primary : 'transparent',
                    border: `1px solid ${needsAuditing ? theme.primary : '#475569'}`,
                    color: '#000'
                  }}
                >
                  {needsAuditing && '✓'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Estimator Card */}
          <div className="lg:col-span-5">
            <div
              className="p-6 sm:p-8 rounded-2xl border"
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderColor: theme.border
              }}
            >
              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
                PROJECTED TIMELINE
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {getEstimatedSprint()}
                </span>
                <span className="text-slate-400 font-medium">Weeks to Production</span>
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Architecture Specification</span>
                  <span className="font-mono text-white">Week 1 (Days 1–5)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Core Engine &amp; Offline Sync</span>
                  <span className="font-mono text-white">Week 2–3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Integrations &amp; Testing</span>
                  <span className="font-mono text-white">Final Sprint</span>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenScoping(
                    `Consulting Scope: ${selectedSystemType.toUpperCase()} (${getEstimatedSprint()} Wk Sprint)`
                  )
                }
                className="w-full py-3.5 px-6 rounded-xl font-medium text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 8px 24px -6px ${theme.glow}`
                }}
              >
                <span>Initiate Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Models */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Engagement Formats
          </h2>
          <p className="text-slate-400 text-sm">
            Structured engagement frameworks designed for agility, accountability, and technical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Fixed-Scope Sprint',
              duration: '2 to 4 Weeks',
              desc: 'High-velocity architecture sprints delivering a fully-functional MVP, offline sync pipeline, or payment integration with test coverage.',
              features: ['Complete architectural specs', 'Production-ready code deliverables', 'CI/CD & Docker setup', '2-week post-launch support']
            },
            {
              title: 'Architecture Retainer',
              duration: 'Quarterly Advisory',
              desc: 'Acting as your senior fractional staff architect. Hands-on system reviews, scalability roadmaps, and mentoring your core engineering team.',
              features: ['Weekly architecture syncs', 'PR code reviews & audits', 'Disaster recovery failover plans', 'On-call escalation support']
            },
            {
              title: 'Comprehensive System Audit',
              duration: '5 to 7 Days',
              desc: 'Deep-dive inspection of your current tech stack, database schemas, bottlenecks, security postures, and offline vulnerabilities.',
              features: ['Zero-downtime bottleneck report', 'Schema optimization roadmap', 'Security & credential checklist', 'Actionable executive summary']
            }
          ].map((tier, tIdx) => (
            <div
              key={tIdx}
              className="p-6 rounded-2xl border flex flex-col justify-between"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border
              }}
            >
              <div>
                <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: theme.primary }}>
                  {tier.duration}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{tier.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">{tier.desc}</p>
                <div className="space-y-2 mb-6">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onOpenScoping(`Engagement: ${tier.title}`)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium border text-slate-200 hover:text-white transition-all cursor-pointer"
                style={{ borderColor: theme.border }}
              >
                Inquire About {tier.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
