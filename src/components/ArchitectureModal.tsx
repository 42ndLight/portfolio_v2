import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ProjectArtifact } from '../types';
import {
  X,
  Cpu,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  Play,
  ArrowRight
} from 'lucide-react';

interface ArchitectureModalProps {
  project: ProjectArtifact | null;
  onClose: () => void;
  onOpenScoping: (projectTitle: string) => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  project,
  onClose,
  onOpenScoping
}) => {
  const { theme } = useTheme();

  if (!project) return null;

  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    project.flowNodes[0]?.id || ''
  );
  const [isSimulatingOffline, setIsSimulatingOffline] = useState(false);
  const [offlineCachedCount, setOfflineCachedCount] = useState(1420);
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SYNCING' | 'RECONCILED'>('IDLE');
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);

  const selectedNode =
    project.flowNodes.find((n) => n.id === selectedNodeId) || project.flowNodes[0];

  const handleToggleOfflineSim = () => {
    if (!isSimulatingOffline) {
      setIsSimulatingOffline(true);
      setSyncStatus('IDLE');
      setOfflineCachedCount((prev) => prev + 12);
    } else {
      setIsSimulatingOffline(false);
      setSyncStatus('SYNCING');
      setTimeout(() => {
        setSyncStatus('RECONCILED');
        setTimeout(() => setSyncStatus('IDLE'), 3500);
      }, 1200);
    }
  };

  const handleCopyBlueprint = () => {
    const text = `// ARCHITECTURAL BLUEPRINT: ${project.title}\n// Schema: ${project.systemSchemaFlow}\n// Client: ${project.architectureDetails.clientLayer}\n// Local Storage: ${project.architectureDetails.offlineStorage}\n// API Gateway: ${project.architectureDetails.apiGateway}\n// Cloud DB: ${project.architectureDetails.cloudDatabase}`;
    navigator.clipboard.writeText(text);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2000);
  };

  return (
    <div
      id="architecture-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="architecture-modal-dialog"
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden my-auto border shadow-2xl backdrop-blur-2xl"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          boxShadow: `0 25px 60px -15px ${theme.glow}`
        }}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-black/40">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-lg font-semibold"
              style={{
                backgroundColor: theme.badgeBg,
                border: `1px solid ${theme.border}`,
                color: theme.primary
              }}
            >
              {project.artifactNumber} · SPECIFICATION DEEP-DIVE
            </span>
            <span className="font-mono text-xs text-slate-400 hidden sm:inline">
              STATUS: PRODUCTION VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyBlueprint}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy system blueprint"
            >
              {copiedBlueprint ? (
                <>
                  <Check className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Blueprint</span>
                </>
              )}
            </button>

            <button
              id="architecture-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8 font-sans">
          {/* Project Title and Tags */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs text-slate-400">
              <span style={{ color: theme.primary }}>{project.category}</span>
              <span>·</span>
              <span>{project.throughputStat}</span>
              <span>·</span>
              <span>{project.latencyStat}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {project.subtitle} — {project.description}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 mt-4 font-mono text-xs">
              {project.techTags.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-200 font-medium flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Overview Diagram Area */}
          <div className="border border-slate-800 rounded-2xl bg-black/50 p-5 sm:p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <span
                  className="font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2"
                  style={{ color: theme.primary }}
                >
                  <Cpu className="w-4 h-4" />
                  INTERACTIVE TOPOLOGY &amp; DATA FLOW PIPELINE
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Click any node to inspect payload vectors, state machine, and retry policies.
                </p>
              </div>

              {/* Interactive Offline Simulation Button */}
              <div className="flex items-center gap-2">
                <button
                  id="simulate-offline-dropout-btn"
                  onClick={handleToggleOfflineSim}
                  className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all duration-200 flex items-center gap-2 cursor-pointer font-medium ${
                    isSimulatingOffline
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg'
                      : 'border-slate-700 text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {isSimulatingOffline ? (
                    <>
                      <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>Simulating Network Dropout</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                      <span>Simulate Offline Dropout</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Offline Simulation Live Banner if active */}
            {isSimulatingOffline && (
              <div className="mb-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 font-mono text-xs text-amber-200 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>CLIENT DISCONNECTED FROM WAN. Writes buffering into Dexie.js append-only log.</span>
                </span>
                <span className="font-bold text-amber-400">QUEUED: {offlineCachedCount} TX</span>
              </div>
            )}

            {syncStatus === 'SYNCING' && (
              <div
                className="mb-4 p-3.5 rounded-xl border font-mono text-xs flex items-center justify-between animate-pulse"
                style={{
                  backgroundColor: theme.badgeBg,
                  borderColor: theme.border,
                  color: theme.primary
                }}
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>RECONNECTING... Flushing {offlineCachedCount} cached operations via REST Batch API</span>
                </span>
                <span className="font-bold">CONFLICT RESOLUTION: 100% OK</span>
              </div>
            )}

            {syncStatus === 'RECONCILED' && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 font-mono text-xs text-emerald-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>RECONCILIATION COMPLETE: Zero inventory anomalies. Master ledger synced.</span>
                </span>
                <span className="font-bold">LATENCY: 0.02s</span>
              </div>
            )}

            {/* Flow diagram steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {project.flowNodes.map((node, index) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="text-left p-4 rounded-xl border transition-all duration-200 relative cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? theme.badgeBg : 'rgba(0,0,0,0.3)',
                      borderColor: isSelected ? theme.primary : 'rgba(255,255,255,0.08)'
                    }}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                      <span>STEP 0{index + 1}</span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSimulatingOffline && index > 1
                            ? 'bg-amber-400'
                            : ''
                        }`}
                        style={{
                          backgroundColor:
                            isSimulatingOffline && index > 1 ? undefined : theme.primary
                        }}
                      ></span>
                    </div>
                    <div className="font-mono text-sm font-bold text-white mb-1">
                      {node.name}
                    </div>
                    <div className="font-mono text-xs mb-2" style={{ color: theme.primary }}>
                      {node.tech}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-2">
                      {node.role}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Node Inspector Drawer */}
            {selectedNode && (
              <div className="mt-4 p-4 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
                  <span className="text-white font-bold flex items-center gap-2">
                    <span style={{ color: theme.primary }}>▶</span> NODE INSPECTOR: {selectedNode.name}
                  </span>
                  <span style={{ color: theme.primary }}>TECH: {selectedNode.tech}</span>
                </div>
                <p className="text-slate-300 mb-2">{selectedNode.notes}</p>
                <div className="text-[11px] text-slate-500 flex items-center gap-4">
                  <span>ROLE: {selectedNode.role}</span>
                  <span>STATUS: {isSimulatingOffline ? 'DECOUPLED_SAFE' : 'NOMINAL'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Key Engineering Challenges Solved */}
          <div>
            <div
              className="font-mono text-xs font-bold tracking-wider uppercase mb-4 flex items-center gap-2"
              style={{ color: theme.primary }}
            >
              <CheckCircle2 className="w-4 h-4" />
              KEY ENGINEERING CHALLENGES &amp; PERFORMANCE BENCHMARKS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.engineeringChallenges.map((ch, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 border border-slate-800/80 p-5 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-white font-semibold">
                      {ch.title}
                    </h4>
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded-md font-semibold"
                      style={{
                        backgroundColor: theme.badgeBg,
                        color: theme.primary,
                        border: `1px solid ${theme.border}`
                      }}
                    >
                      {ch.metric}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {ch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Layer Breakdown */}
          <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 font-mono text-xs space-y-3">
            <div className="font-bold uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
              STACK LAYERING &amp; DEPENDENCY SPECIFICATION
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
              <div>
                <span className="text-white font-bold">CLIENT LAYER: </span>
                <span>{project.architectureDetails.clientLayer}</span>
              </div>
              <div>
                <span className="text-white font-bold">OFFLINE STORAGE: </span>
                <span style={{ color: theme.primary }}>
                  {project.architectureDetails.offlineStorage}
                </span>
              </div>
              <div>
                <span className="text-white font-bold">API GATEWAY: </span>
                <span>{project.architectureDetails.apiGateway}</span>
              </div>
              <div>
                <span className="text-white font-bold">CLOUD DATABASE: </span>
                <span style={{ color: theme.primary }}>
                  {project.architectureDetails.cloudDatabase}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="px-6 py-4 border-t border-slate-800 bg-black/60 flex flex-wrap items-center justify-between gap-4">
          <button
            id="back-to-portfolio-btn"
            onClick={onClose}
            className="text-xs font-medium px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Back to Overview
          </button>

          <div className="flex items-center gap-3">
            <button
              id="modal-scope-similar-btn"
              onClick={() => {
                onClose();
                onOpenScoping(project.title);
              }}
              className="text-xs font-semibold px-6 py-2.5 rounded-xl text-black transition-all cursor-pointer flex items-center gap-2 shadow-md hover:scale-[1.02]"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 4px 16px -4px ${theme.glow}`
              }}
            >
              <span>Scope Architecture for Your System</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
