import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { GLOBAL_NODES } from '../data/portfolioData';
import {
  X,
  Activity,
  Terminal,
  Server,
  GitBranch,
  GitCommit,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Radio,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface DiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScoping: () => void;
}

export const DiagnosticsDashboardModal: React.FC<DiagnosticsModalProps> = ({
  isOpen,
  onClose,
  onOpenScoping
}) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const [liveNodes, setLiveNodes] = useState(GLOBAL_NODES);
  const [isRefreshingPing, setIsRefreshingPing] = useState(false);

  const terminalLogs = [
    '2026-11-02 03:04:12 [INFO] AF-EAST-1 edge health check: 14ms (Optimal)',
    '2026-11-02 03:04:13 [INFO] Dexie.js offline conflict reconciliation daemon: 0 errors',
    '2026-11-02 03:04:14 [METRIC] M-Pesa webhook callback queue latency: 22ms P99',
    '2026-11-02 03:04:15 [SEC] TLS 1.3 session renegotiation verified for 42ndlight.africa',
    '2026-11-02 03:04:16 [DAEMON] KRA eTIMS VSCU signing worker heartbeat received',
    '2026-11-02 03:04:17 [CAPACITY] Dedicated retainer capacity: 2 active sprint slots remaining'
  ];

  const triggerPingRefresh = () => {
    setIsRefreshingPing(true);
    setTimeout(() => {
      setLiveNodes((prev) =>
        prev.map((node) => ({
          ...node,
          latencyMs: Math.max(10, node.latencyMs + Math.floor((Math.random() - 0.45) * 6))
        }))
      );
      setIsRefreshingPing(false);
    }, 600);
  };

  // Activity heatmap blocks (simulated 20-week commit grid)
  const weeks = Array.from({ length: 20 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const intensity = d < 5 ? (w % 3 === 0 ? 3 : w % 2 === 0 ? 2 : 1) : (w % 4 === 0 ? 1 : 0);
      return intensity;
    })
  );

  return (
    <div
      id="diagnostics-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto font-sans"
    >
      <div
        id="diagnostics-modal-dialog"
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden my-auto border shadow-2xl backdrop-blur-2xl"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          boxShadow: `0 25px 60px -15px ${theme.glow}`
        }}
      >
        {/* Header */}
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
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: theme.primary }}></span>
              <span>LIVE TELEMETRY &amp; EDGE HEALTH MONITOR</span>
            </span>
            <span className="font-mono text-xs text-slate-400 hidden sm:inline">
              PRIMARY NODE: AF-EAST-1 [NAIROBI]
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerPingRefresh}
              disabled={isRefreshingPing}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingPing ? 'animate-spin' : ''}`} />
              <span>Refresh Pings</span>
            </button>

            <button
              id="diagnostics-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto space-y-6">
          {/* Status Grid - Simulated terminal lines */}
          <div>
            <div
              className="font-mono text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ color: theme.primary }}
            >
              <Terminal className="w-4 h-4" />
              SYSTEM DIAGNOSTICS &amp; CAPACITY TELEMETRY
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase mb-1">SYSTEM STATUS</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  OPERATIONAL · ZERO ANOMALIES
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase mb-1">CURRENT LOAD</div>
                <div className="text-white font-bold flex items-center gap-1.5">
                  <span>1 ACTIVE SPRINT · 2 SLOTS OPEN</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase mb-1">PRIMARY LOCATION</div>
                <div className="text-white font-bold flex items-center gap-1.5">
                  <span>NAIROBI, KE (UTC+3)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Edge Node Latencies */}
          <div>
            <div
              className="font-mono text-xs font-bold uppercase tracking-wider mb-3 flex items-center justify-between"
              style={{ color: theme.primary }}
            >
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4" />
                <span>MULTI-REGION EDGE NETWORK STATUS</span>
              </div>
              <span className="text-slate-500 text-[11px] font-normal">HTTP/3 QUIC</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
              {liveNodes.map((node) => (
                <div
                  key={node.code}
                  className="p-3.5 rounded-xl bg-black/40 border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white text-xs">{node.city}</div>
                    <div className="text-slate-500 text-[10px]">{node.code}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className="font-bold text-sm"
                      style={{
                        color:
                          node.latencyMs < 40
                            ? theme.primary
                            : node.latencyMs < 100
                            ? '#38bdf8'
                            : '#fbbf24'
                      }}
                    >
                      {node.latencyMs}ms
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold">{node.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity commit heatmap */}
          <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4" style={{ color: theme.primary }} />
                <span>OPEN SOURCE &amp; PRODUCTION COMMIT HEATMAP (LAST 20 WEEKS)</span>
              </span>
              <span className="text-slate-400 text-[11px]">842 Commits in 2025/2026</span>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1.5 min-w-[500px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.map((level, dIdx) => {
                      let bgColor = 'rgba(255,255,255,0.04)';
                      if (level === 1) bgColor = `${theme.primary}33`;
                      if (level === 2) bgColor = `${theme.primary}77`;
                      if (level === 3) bgColor = theme.primary;
                      return (
                        <div
                          key={dIdx}
                          className="w-3.5 h-3.5 rounded-sm transition-colors"
                          style={{ backgroundColor: bgColor }}
                          title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${level * 4} commits`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span>Less Active</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-white/5" />
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: `${theme.primary}33` }} />
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: `${theme.primary}77` }} />
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: theme.primary }} />
              </div>
              <span>Highly Active</span>
            </div>
          </div>

          {/* Streaming terminal logs */}
          <div className="rounded-2xl p-4 bg-black/70 border border-slate-800 font-mono text-xs">
            <div className="text-slate-400 text-[11px] border-b border-slate-800 pb-2 mb-2 flex items-center justify-between">
              <span>LIVE SYS.LOG STREAM</span>
              <span className="text-emerald-400">POLLING: 1000ms</span>
            </div>
            <div className="space-y-1 text-slate-300">
              {terminalLogs.map((log, lIdx) => (
                <div key={lIdx} className="flex items-start gap-2">
                  <span className="text-slate-600">❯</span>
                  <span className={lIdx === terminalLogs.length - 1 ? 'text-white' : 'text-slate-400'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-black/60 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Dashboard
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
            <span>Reserve Available Sprint Slot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
