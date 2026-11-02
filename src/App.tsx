import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { PROJECTS, LATEST_BLOG_POSTS } from './data/portfolioData';
import { ProjectArtifact, BlogPost } from './types';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SystemDiagnosticsBar } from './components/SystemDiagnosticsBar';
import { FeaturedSystemsBento } from './components/FeaturedSystemsBento';
import { ServicesPage } from './pages/ServicesPage';
import { DispatchesPage } from './pages/DispatchesPage';
import { ConversionFooter } from './components/ConversionFooter';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ScopingModal } from './components/ScopingModal';
import { DiagnosticsDashboardModal } from './components/DiagnosticsDashboardModal';
import { ProfileModal } from './components/ProfileModal';
import { BlogPostModal } from './components/BlogPostModal';

function AppContent() {
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'dispatches'>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectArtifact | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isScopingOpen, setIsScopingOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scopingPrefill, setScopingPrefill] = useState<string | undefined>(undefined);

  const handleOpenScoping = (projectTitle?: string) => {
    setScopingPrefill(projectTitle);
    setIsScopingOpen(true);
  };

  const handleNavigate = (view: 'home' | 'services' | 'dispatches') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen flex flex-col relative text-slate-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden selection:bg-white selection:text-black"
      style={{ backgroundColor: theme.bgDark }}
    >
      {/* Dynamic Animated or Clean Background */}
      <AnimatedBackground />

      {/* Modern Top Accent Glow Line */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 transition-colors duration-500 opacity-90"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`
        }}
      />

      {/* Main Header Navigation */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenScoping={() => handleOpenScoping()}
        onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-12 relative z-10">
        {/* VIEW 1: HOME PAGE (Only Systems, Telemetry & CTA) */}
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Section */}
            <HeroSection
              onOpenScoping={() => handleOpenScoping()}
              onExploreSystems={() => {
                const el = document.getElementById('systems');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
              onOpenProfile={() => setIsProfileOpen(true)}
            />

            {/* System Diagnostics Bar */}
            <SystemDiagnosticsBar
              onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
            />

            {/* Featured Systems Bento Grid */}
            <FeaturedSystemsBento
              projects={PROJECTS}
              onSelectProject={(project) => setSelectedProject(project)}
            />

            {/* High-Impact Closing CTA Banner */}
            <ConversionFooter
              onOpenScoping={() => handleOpenScoping()}
              onOpenProfile={() => setIsProfileOpen(true)}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* VIEW 2: DEDICATED SERVICES PAGE */}
        {currentView === 'services' && (
          <div className="animate-in fade-in duration-300">
            <ServicesPage
              onOpenScoping={(serviceTitle) => handleOpenScoping(serviceTitle)}
            />
            <ConversionFooter
              onOpenScoping={() => handleOpenScoping()}
              onOpenProfile={() => setIsProfileOpen(true)}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* VIEW 3: DEDICATED DISPATCHES / BLOG PAGE */}
        {currentView === 'dispatches' && (
          <div className="animate-in fade-in duration-300">
            <DispatchesPage
              posts={LATEST_BLOG_POSTS}
              onSelectPost={(post) => setSelectedBlogPost(post)}
              onOpenScoping={(topic) => handleOpenScoping(topic)}
            />
            <ConversionFooter
              onOpenScoping={() => handleOpenScoping()}
              onOpenProfile={() => setIsProfileOpen(true)}
              onNavigate={handleNavigate}
            />
          </div>
        )}
      </main>

      {/* Screen 1: The Interactive System / Case Study Modal */}
      {selectedProject && (
        <ArchitectureModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenScoping={(projectTitle) => {
            setSelectedProject(null);
            handleOpenScoping(projectTitle);
          }}
        />
      )}

      {/* Screen 2: The Technical Consultation Booking / Scoping Flow */}
      <ScopingModal
        isOpen={isScopingOpen}
        onClose={() => setIsScopingOpen(false)}
        prefillProject={scopingPrefill}
      />

      {/* Screen 3: The System Diagnostics / Live Status Dashboard */}
      <DiagnosticsDashboardModal
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
        onOpenScoping={() => {
          setIsDiagnosticsOpen(false);
          handleOpenScoping();
        }}
      />

      {/* Screen 4: The Profile Screen Component */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenScoping={() => {
          setIsProfileOpen(false);
          handleOpenScoping('Architectural Advisory Retainer');
        }}
        onSelectPost={(post) => {
          setIsProfileOpen(false);
          setSelectedBlogPost(post);
        }}
      />

      {/* Screen 5: The Interactive Blog Reader Modal */}
      {selectedBlogPost && (
        <BlogPostModal
          post={selectedBlogPost}
          onClose={() => setSelectedBlogPost(null)}
          onOpenOtherPost={(postId) => {
            const nextPost = LATEST_BLOG_POSTS.find((p) => p.id === postId);
            if (nextPost) setSelectedBlogPost(nextPost);
          }}
          onOpenScoping={(context) => {
            setSelectedBlogPost(null);
            handleOpenScoping(context);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
