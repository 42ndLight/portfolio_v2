import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../types';
import { BLOG_SITE_CONFIG } from '../data/portfolioData';
import {
  X,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Tag,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenOtherPost: (postId: string) => void;
  onOpenScoping: (context: string) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  onClose,
  onOpenOtherPost,
  onOpenScoping
}) => {
  const { theme } = useTheme();

  if (!post) return null;

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = () => {
    if (post.codeBlock) {
      navigator.clipboard.writeText(post.codeBlock.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(post.externalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id="blog-reader-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto font-sans"
    >
      <div
        id="blog-reader-modal-dialog"
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
              <BookOpen className="w-3.5 h-3.5" />
              <span>ENGINEERING DISPATCH · {post.category.split('//')[0].trim()}</span>
            </span>
            <span className="font-mono text-xs text-slate-400 hidden sm:inline">
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Share / Copy Link */}
            <button
              onClick={handleCopyLink}
              title="Copy dispatch link"
              className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {/* External blog site link */}
            <a
              href={BLOG_SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer font-medium"
              style={{
                backgroundColor: theme.badgeBg,
                borderColor: theme.border,
                color: theme.primary
              }}
            >
              <span>Canonical Blog ↗</span>
            </a>

            {/* Close Button */}
            <button
              id="blog-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 max-h-[78vh] overflow-y-auto space-y-8">
          {/* Metadata Meta Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                {post.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {post.readTime}
              </span>
              <span>•</span>
              <span style={{ color: theme.primary }}>{post.viewsCount}</span>
              <span>•</span>
              <span className="text-white/80">BY {post.author.toUpperCase()}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            <p
              className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 pl-4 italic"
              style={{ borderColor: theme.primary }}
            >
              {post.subtitle}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 flex items-center gap-1.5"
              >
                <Tag className="w-3 h-3" style={{ color: theme.primary }} />
                {tag}
              </span>
            ))}
          </div>

          {/* Key Architectural Takeaways Box */}
          <div className="bg-black/40 border border-slate-800 rounded-2xl p-5 sm:p-6 relative">
            <div
              className="font-mono text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ color: theme.primary }}
            >
              <CheckCircle2 className="w-4 h-4" />
              CORE ARCHITECTURAL TAKEAWAYS &amp; IMPLEMENTATION RULES
            </div>
            <ul className="space-y-2.5 font-mono text-xs sm:text-sm text-slate-200">
              {post.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-bold" style={{ color: theme.primary }}>0{i + 1}.</span>
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {post.content.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {/* Code Block Snippet */}
          {post.codeBlock && (
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black/80">
              <div className="px-4 py-2.5 bg-black/60 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
                <span className="font-bold flex items-center gap-2" style={{ color: theme.primary }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                  {post.codeBlock.filename}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 sm:p-5 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm leading-relaxed" style={{ color: theme.primary }}>
                  <code>{post.codeBlock.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* External Blogsite Banner Card */}
          <div
            className="p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border"
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderColor: theme.border
            }}
          >
            <div>
              <div className="font-mono text-xs font-semibold tracking-wider uppercase mb-1" style={{ color: theme.primary }}>
                42NDLIGHT BLOG ARCHIVE · TECHNICAL ESSAYS
              </div>
              <h4 className="text-white font-bold text-base mb-1">
                Read the complete archive on {BLOG_SITE_CONFIG.title}
              </h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Subscribe to new articles on offline-first architectures, African telecom protocols, and fintech resiliency.
              </p>
            </div>
            <a
              id="visit-external-blog-btn"
              href={BLOG_SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-3 rounded-xl text-black transition-all cursor-pointer shadow-md"
              style={{ backgroundColor: theme.primary }}
            >
              <span>Visit Blogsite</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 border-t border-slate-800 bg-black/60 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Dispatch
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenScoping(`Consultation regarding: ${post.title}`);
              }}
              className="text-xs font-semibold px-6 py-2.5 rounded-xl text-black transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 4px 16px -4px ${theme.glow}`
              }}
            >
              <span>Consult on This Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
