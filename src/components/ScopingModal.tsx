import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ScopingFormData } from '../types';
import {
  X,
  ShieldCheck,
  Cpu,
  Layers,
  Clock,
  DollarSign,
  Send,
  CheckCircle,
  Copy,
  Terminal,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ScopingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillProject?: string;
}

export const ScopingModal: React.FC<ScopingModalProps> = ({
  isOpen,
  onClose,
  prefillProject
}) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<ScopingFormData>({
    projectType: prefillProject
      ? prefillProject.includes('POS')
        ? 'Offline-First / PWA System'
        : 'Full-Stack MVP'
      : 'Full-Stack MVP',
    urgency: 'Sprint Acceleration: 4-6 Weeks',
    budgetRange: '$7,000 - $15,000 Production Scale',
    techPreferences: ['Django', 'Vue 3', 'Dexie.js / IndexedDB', 'Docker'],
    clientName: '',
    clientEmail: '',
    companyName: '',
    systemDescription: prefillProject ? `Inquiry regarding architectural pattern from ${prefillProject}` : '',
    requireOfflineCapability: true,
    requireFintechIntegration: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionHash, setTransmissionHash] = useState('');
  const [copiedHash, setCopiedHash] = useState(false);

  const projectTypes = [
    {
      id: 'Full-Stack MVP',
      title: 'Full-Stack Platform & MVP',
      desc: 'Ground-up architecture for high-velocity startup launch with production-grade backend.'
    },
    {
      id: 'Offline-First / PWA System',
      title: 'Offline-First / PWA System',
      desc: 'Zero-downtime apps executing with intermittent connectivity via Dexie & local stores.'
    },
    {
      id: 'Cloud Infrastructure / DevOps Audit',
      title: 'Cloud Infrastructure & DevOps Audit',
      desc: 'Dockerization, CI/CD hardening, security review, horizontal failover & scaling.'
    },
    {
      id: 'Custom API / Fintech Integration',
      title: 'Custom API & Fintech Integration',
      desc: 'Safaricom M-Pesa Daraja, KRA eTIMS, bank rails, and telco USSD relays.'
    }
  ];

  const timelineOptions = [
    { label: 'Critical Hotfix (< 2 Weeks)', sub: 'Emergency production stabilization or security audit' },
    { label: 'Sprint Acceleration: 4-6 Weeks', sub: 'Rapid MVP or dedicated feature sync engine' },
    { label: 'Enterprise System: 2-3 Months', sub: 'Comprehensive multi-tier distributed build' },
    { label: 'Advisory Retainer: Ongoing', sub: 'Fractional Staff Architect & technical oversight' }
  ];

  const budgetOptions = [
    { label: '$3,000 - $7,000', tier: 'MVP Launchpad', desc: 'Proof of concept or focused micro-service' },
    { label: '$7,000 - $15,000', tier: 'Production Scale Engine', desc: 'Full-stack platform with offline sync & APIs' },
    { label: '$15,000 - $35,000', tier: 'Enterprise Architecture', desc: 'High-concurrency infrastructure & multi-outlet' },
    { label: '$35,000+', tier: 'Sovereign Infrastructure', desc: 'Custom fintech or nationwide deployment' }
  ];

  const techOptions = [
    'Django REST Framework',
    'Vue 3 / React 19',
    'Dexie.js / IndexedDB',
    'PostgreSQL / TimescaleDB',
    'Docker & Compose',
    'M-Pesa Daraja API',
    'KRA eTIMS Fiscalization',
    'Africa’s Talking USSD/SMS',
    'FastAPI / Python',
    'Redis Caching & Streams'
  ];

  const toggleTech = (tech: string) => {
    if (formData.techPreferences.includes(tech)) {
      setFormData({
        ...formData,
        techPreferences: formData.techPreferences.filter((t) => t !== tech)
      });
    } else {
      setFormData({
        ...formData,
        techPreferences: [...formData.techPreferences, tech]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedHash =
      '42ND-' +
      Math.random().toString(36).substring(2, 8).toUpperCase() +
      '-' +
      Math.random().toString(36).substring(2, 6).toUpperCase();

    setTimeout(() => {
      setTransmissionHash(generatedHash);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div
      id="scoping-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="scoping-modal-dialog"
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden my-auto border shadow-2xl backdrop-blur-2xl"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          boxShadow: `0 25px 60px -15px ${theme.glow}`
        }}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-black/40">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5"
              style={{
                backgroundColor: theme.badgeBg,
                border: `1px solid ${theme.border}`,
                color: theme.primary
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TECHNICAL CONSULTATION · SCOPING FLOW</span>
            </span>
            <span className="font-mono text-xs text-slate-400 hidden sm:inline">
              DIRECT ARCHITECT PIPELINE
            </span>
          </div>

          <button
            id="scoping-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        {!isSubmitted && (
          <div className="px-6 py-3 bg-black/30 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span
                className="px-2.5 py-0.5 rounded-lg font-bold"
                style={{
                  backgroundColor: step === 1 ? theme.primary : 'rgba(255,255,255,0.05)',
                  color: step === 1 ? '#000' : '#94a3b8'
                }}
              >
                STEP 01
              </span>
              <span className={step === 1 ? 'text-white font-semibold' : 'text-slate-500'}>
                Project Scope &amp; Vectors
              </span>

              <span className="text-slate-600">→</span>

              <span
                className="px-2.5 py-0.5 rounded-lg font-bold"
                style={{
                  backgroundColor: step === 2 ? theme.primary : 'rgba(255,255,255,0.05)',
                  color: step === 2 ? '#000' : '#94a3b8'
                }}
              >
                STEP 02
              </span>
              <span className={step === 2 ? 'text-white font-semibold' : 'text-slate-500'}>
                Timeline, Budget &amp; Details
              </span>
            </div>

            <span className="text-slate-400 hidden md:inline">
              CURRENT CAPACITY: 2 ENGAGEMENTS
            </span>
          </div>
        )}

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto font-sans">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider mb-2">
                      Select Project Type / Architectural Objective:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {projectTypes.map((type) => {
                        const isSelected = formData.projectType === type.id;
                        return (
                          <button
                            type="button"
                            key={type.id}
                            onClick={() =>
                              setFormData({ ...formData, projectType: type.id })
                            }
                            className="p-4 rounded-xl border text-left transition-all cursor-pointer"
                            style={{
                              backgroundColor: isSelected ? theme.badgeBg : 'rgba(0,0,0,0.3)',
                              borderColor: isSelected ? theme.primary : 'rgba(255,255,255,0.08)'
                            }}
                          >
                            <div className="font-semibold text-sm text-white mb-1">
                              {type.title}
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {type.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tech stack vector multi-select */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider mb-2">
                      Technical Vectors &amp; Dependencies:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {techOptions.map((tech) => {
                        const isSelected = formData.techPreferences.includes(tech);
                        return (
                          <button
                            type="button"
                            key={tech}
                            onClick={() => toggleTech(tech)}
                            className="font-mono text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer"
                            style={{
                              backgroundColor: isSelected ? theme.badgeBg : 'rgba(0,0,0,0.4)',
                              borderColor: isSelected ? theme.primary : 'rgba(255,255,255,0.08)',
                              color: isSelected ? theme.primary : '#94a3b8'
                            }}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* System overview brief */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider mb-2">
                      Brief System Overview or Problem Statement:
                    </label>
                    <textarea
                      rows={3}
                      value={formData.systemDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, systemDescription: e.target.value })
                      }
                      placeholder="e.g. We have a multi-outlet retail system in Western Kenya experiencing daily connectivity dropouts. Need offline transaction persistence with Dexie.js and KRA eTIMS signing..."
                      className="w-full bg-black/50 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Step 1 CTA */}
                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-semibold px-6 py-3 rounded-xl text-black transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02]"
                      style={{
                        backgroundColor: theme.primary,
                        boxShadow: `0 4px 18px -4px ${theme.glow}`
                      }}
                    >
                      <span>Proceed to Timeline &amp; Budget</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* STEP 2 */
                <div className="space-y-6">
                  {/* Urgency */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider mb-2">
                      Estimated Timeline / Urgency:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {timelineOptions.map((opt) => {
                        const isSelected = formData.urgency === opt.label;
                        return (
                          <button
                            type="button"
                            key={opt.label}
                            onClick={() => setFormData({ ...formData, urgency: opt.label })}
                            className="p-3.5 rounded-xl border text-left transition-all cursor-pointer"
                            style={{
                              backgroundColor: isSelected ? theme.badgeBg : 'rgba(0,0,0,0.3)',
                              borderColor: isSelected ? theme.primary : 'rgba(255,255,255,0.08)'
                            }}
                          >
                            <div className="text-xs font-semibold text-white mb-0.5">
                              {opt.label}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {opt.sub}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget range */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider mb-2">
                      Budget Range &amp; Scope:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {budgetOptions.map((b) => {
                        const isSelected = formData.budgetRange.startsWith(b.label);
                        return (
                          <button
                            type="button"
                            key={b.label}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                budgetRange: `${b.label} ${b.tier}`
                              })
                            }
                            className="p-3.5 rounded-xl border text-left transition-all cursor-pointer"
                            style={{
                              backgroundColor: isSelected ? theme.badgeBg : 'rgba(0,0,0,0.3)',
                              borderColor: isSelected ? theme.primary : 'rgba(255,255,255,0.08)'
                            }}
                          >
                            <div className="font-mono text-xs font-bold" style={{ color: theme.primary }}>
                              {b.label}
                            </div>
                            <div className="text-xs text-white font-medium">{b.tier}</div>
                            <div className="text-[10px] text-slate-400">
                              {b.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Your Name:
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) =>
                          setFormData({ ...formData, clientName: e.target.value })
                        }
                        placeholder="e.g. Alex Kamau"
                        className="w-full bg-black/50 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Work Email:
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.clientEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, clientEmail: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full bg-black/50 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Organization / Startup:
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        placeholder="e.g. Apex Logistics"
                        className="w-full bg-black/50 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Scope</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-xs font-semibold px-8 py-3.5 rounded-xl text-black transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-md hover:scale-[1.02]"
                      style={{
                        backgroundColor: theme.primary,
                        boxShadow: `0 4px 20px -4px ${theme.glow}`
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          <span>Dispatching Scope...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 fill-black" />
                          <span>Initiate Discovery Call</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* SUBMISSION CONFIRMATION TRANSMISSION */
            <div className="py-6 text-center space-y-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                style={{
                  backgroundColor: theme.badgeBg,
                  border: `2px solid ${theme.primary}`,
                  color: theme.primary
                }}
              >
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span
                  className="font-mono text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full inline-block mb-3"
                  style={{
                    backgroundColor: theme.badgeBg,
                    color: theme.primary
                  }}
                >
                  SCOPE SUBMISSION CONFIRMED
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Discovery Call Protocol Initialized
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.clientName || 'Partner'}</span>.
                  Your architecture parameters have been logged in our pipeline. Kennedy will review
                  your requirements within 24 business hours.
                </p>
              </div>

              {/* Packet Output Box */}
              <div className="bg-black/60 border border-slate-800 rounded-2xl p-5 font-mono text-xs max-w-xl mx-auto text-left">
                <div className="text-[11px] text-slate-500 border-b border-slate-800 pb-2 mb-3 flex justify-between">
                  <span>RECEIPT HASH: SHA256</span>
                  <span style={{ color: theme.primary }}>STATUS: RECEIVED</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div>
                    <span className="text-slate-500">PROJECT: </span>
                    <span className="text-white font-medium">{formData.projectType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">TIMELINE: </span>
                    <span>{formData.urgency}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">BUDGET TIER: </span>
                    <span>{formData.budgetRange}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">CONFIRMATION CODE: </span>
                    <span style={{ color: theme.primary }} className="font-bold">{transmissionHash}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `42ndLight Protocol: ${transmissionHash} | Project: ${formData.projectType}`
                      );
                      setCopiedHash(true);
                      setTimeout(() => setCopiedHash(false), 2000);
                    }}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedHash ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Confirmation Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={onClose}
                  className="text-xs font-semibold px-6 py-2.5 rounded-xl text-black cursor-pointer shadow-md"
                  style={{ backgroundColor: theme.primary }}
                >
                  Return to Site
                </button>
                <a
                  href={`https://wa.me/254700000000?text=Hi%20Kennedy,%20I%20just%20initiated%20a%20technical%20scoping%20protocol%20(${transmissionHash})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                >
                  Expedite via Direct WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
