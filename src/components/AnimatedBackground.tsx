import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const AnimatedBackground: React.FC = () => {
  const { theme, bgMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Track mouse coordinates for interactive spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas particle constellation simulation
  useEffect(() => {
    if (bgMode !== 'particles') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1,
        baseAlpha: Math.random() * 0.4 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle links
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = theme.primary;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles & update
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interactive mouse repulsion / attraction
        const mdx = mousePos.x - p.x;
        const mdy = mousePos.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120 && mdist > 0) {
          const force = (120 - mdist) / 120;
          p.x -= (mdx / mdist) * force * 1.5;
          p.y -= (mdy / mdist) * force * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = theme.primary;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [bgMode, theme.primary, mousePos.x, mousePos.y]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: theme.bgDark }}
    >
      {/* 1. CLEAN MINIMALIST MODE */}
      {bgMode === 'clean' && (
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-60"
          style={{
            background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.glow.replace(
              '0.4',
              '0.06'
            )}, transparent 80%)`
          }}
        />
      )}

      {/* 2. ANIMATED AURORA MODE */}
      {bgMode === 'aurora' && (
        <div className="absolute inset-0 overflow-hidden opacity-70">
          {/* Drifting Orb 1 */}
          <div
            className="absolute -top-[15%] -left-[10%] w-[680px] h-[680px] rounded-full blur-[140px] animate-aurora-drift-1 transition-colors duration-700"
            style={{ backgroundColor: theme.primary, opacity: 0.12 }}
          />
          {/* Drifting Orb 2 */}
          <div
            className="absolute top-[35%] -right-[15%] w-[620px] h-[620px] rounded-full blur-[150px] animate-aurora-drift-2 transition-colors duration-700"
            style={{ backgroundColor: theme.secondary, opacity: 0.1 }}
          />
          {/* Drifting Orb 3 */}
          <div
            className="absolute -bottom-[20%] left-[25%] w-[750px] h-[750px] rounded-full blur-[160px] animate-aurora-drift-3 transition-colors duration-700"
            style={{ backgroundColor: theme.accent, opacity: 0.08 }}
          />
          {/* Interactive Mouse Spotlight */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.glow.replace(
                '0.4',
                '0.08'
              )}, transparent 75%)`
            }}
          />
        </div>
      )}

      {/* 3. INTERACTIVE PARTICLE CONSTELLATION */}
      {bgMode === 'particles' && (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.glow.replace(
                '0.4',
                '0.08'
              )}, transparent 70%)`
            }}
          />
        </>
      )}

      {/* 4. GEOMETRIC DOT GRID */}
      {bgMode === 'grid' && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(${theme.primary} 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
          {/* Mask that only reveals grid near cursor */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, transparent 0%, ${theme.bgDark} 75%)`
            }}
          />
        </div>
      )}

      {/* Subtle modern vignette overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />
    </div>
  );
};
