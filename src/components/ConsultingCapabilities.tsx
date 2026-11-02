import React from 'react';
import { CONSULTING_CAPABILITIES } from '../data/portfolioData';
import { Server, WifiOff, CreditCard, ChevronRight } from 'lucide-react';

interface CapabilitiesProps {
  onSelectCapability: (protocolName: string) => void;
}

export const ConsultingCapabilities: React.FC<CapabilitiesProps> = ({
  onSelectCapability
}) => {
  const getIcon = (name: string, color: string) => {
    const isGreen = color === 'green';
    const iconClass = isGreen ? 'text-[#00FF66]' : 'text-[#00E5FF]';
    switch (name) {
      case 'Server':
        return <Server className={`w-6 h-6 ${iconClass}`} />;
      case 'WifiOff':
        return <WifiOff className={`w-6 h-6 ${iconClass}`} />;
      case 'CreditCard':
        return <CreditCard className={`w-6 h-6 ${iconClass}`} />;
      default:
        return <Server className={`w-6 h-6 ${iconClass}`} />;
    }
  };

  return (
    <section
      id="services"
      className="py-20 border-t border-[rgba(0,255,102,0.18)] bg-[#060706] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block font-mono text-xs text-[#00E5FF] font-bold tracking-widest uppercase px-3 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded mb-3">
            TECHNICAL CONSULTING &amp; SYSTEM CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Elite Engineering For Critical Operations
          </h2>
          <p className="text-[#99ab9f] text-sm sm:text-base leading-relaxed">
            I partner with scale-ups, fintechs, and ambitious founders to engineer unbreakable
            backends, real-time client sync, and resilient cloud architectures.
          </p>
        </div>

        {/* 3 Modular Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="architecture">
          {CONSULTING_CAPABILITIES.map((cap, index) => {
            const isGreen = cap.color === 'green';
            return (
              <div
                key={index}
                id={`capability-card-${index}`}
                className={`bg-[#0d100e] border border-[rgba(0,255,102,0.18)] hover:border-${
                  isGreen ? '[#00FF66]' : '[#00E5FF]'
                } p-8 rounded-xl flex flex-col justify-between group transition-all duration-300 relative ${
                  isGreen ? 'hover:shadow-neon-green-sm' : 'hover:shadow-neon-cyan-sm'
                }`}
              >
                <div>
                  {/* Icon Block */}
                  <div
                    className={`w-12 h-12 rounded-lg ${
                      isGreen
                        ? 'bg-[#00FF66]/10 border border-[#00FF66]/30 group-hover:bg-[#00FF66] group-hover:text-black'
                        : 'bg-[#00E5FF]/10 border border-[#00E5FF]/30 group-hover:bg-[#00E5FF] group-hover:text-black'
                    } flex items-center justify-center mb-6 transition-colors`}
                  >
                    {getIcon(cap.iconName, cap.color)}
                  </div>

                  <div className="font-mono text-xs text-[#7d8b83] mb-1 uppercase tracking-wider">
                    {cap.protocol}
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-3 group-hover:${
                      isGreen ? 'text-[#00FF66]' : 'text-[#00E5FF]'
                    } transition-colors`}
                  >
                    {cap.title}
                  </h3>
                  <p className="text-[#99ab9f] text-sm leading-relaxed mb-6">
                    {cap.description}
                  </p>

                  {/* Bullet Checklist */}
                  <ul className="space-y-2.5 font-mono text-xs text-white/90 border-t border-[rgba(0,255,102,0.15)] pt-4 mb-6">
                    {cap.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={isGreen ? 'text-[#00FF66]' : 'text-[#00E5FF]'}>▶</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer CTA */}
                <button
                  onClick={() => onSelectCapability(cap.title)}
                  className={`pt-3 border-t border-white/5 font-mono text-xs uppercase tracking-wider flex items-center justify-between ${
                    isGreen ? 'text-[#00FF66]' : 'text-[#00E5FF]'
                  } hover:text-white transition-colors cursor-pointer group/btn`}
                >
                  <span>[SCOPE THIS PROTOCOL]</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
