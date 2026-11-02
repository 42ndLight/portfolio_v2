import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { DIAGNOSTIC_METRICS } from '../data/portfolioData';
import { Activity, ArrowUpRight } from 'lucide-react';

interface SystemDiagnosticsBarProps {
  onOpenDiagnostics: () => void;
}

export const SystemDiagnosticsBar: React.FC<SystemDiagnosticsBarProps> = ({
  onOpenDiagnostics
}) => {
  const { theme } = useTheme();

  return (
    <section
      id="diagnostics"
      className="py-8 border-y backdrop-blur-xl relative z-10"
      style={{
        borderColor: theme.border,
        backgroundColor: 'rgba(0,0,0,0.35)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header line */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full inline-block animate-pulse"
              style={{ backgroundColor: theme.primary }}
            />
            <span
              className="font-mono text-xs font-semibold tracking-wider uppercase"
              style={{ color: theme.primary }}
            >
              INFRASTRUCTURE TELEMETRY &amp; PRODUCTION BENCHMARKS
            </span>
          </div>
          <button
            onClick={onOpenDiagnostics}
            className="text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer hover:underline"
            style={{ color: theme.primary }}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Open Diagnostic Monitor →</span>
          </button>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIAGNOSTIC_METRICS.map((metric) => (
            <div
              key={metric.id}
              onClick={onOpenDiagnostics}
              className="p-5 rounded-2xl transition-all duration-300 relative group cursor-pointer border"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border
              }}
            >
              {/* Header */}
              <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>{metric.label}</span>
                <span style={{ color: theme.primary }}>{metric.numberTag}</span>
              </div>

              {/* Big Number */}
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 group-hover:text-white transition-colors">
                {metric.value}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {metric.description}
              </p>

              {/* Trend */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                <span className="truncate">{metric.trend}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
