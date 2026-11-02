import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../types';
import { BLOG_SITE_CONFIG } from '../data/portfolioData';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Search,
  Tag,
  CheckCircle2,
  Sparkles,
  Terminal,
  FileCode2,
  Share2
} from 'lucide-react';

interface DispatchesPageProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onOpenScoping: (topic: string) => void;
}

export const DispatchesPage: React.FC<DispatchesPageProps> = ({
  posts,
  onSelectPost,
  onOpenScoping
}) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'offline', label: 'Offline-First Systems' },
    { id: 'fintech', label: 'Fintech & USSD' },
    { id: 'cloud', label: 'Cloud & Database' }
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'offline' && post.tags.some((t) => t.toLowerCase().includes('offline') || t.toLowerCase().includes('indexeddb'))) ||
      (selectedCategory === 'fintech' && post.tags.some((t) => t.toLowerCase().includes('ussd') || t.toLowerCase().includes('payment') || t.toLowerCase().includes('fintech'))) ||
      (selectedCategory === 'cloud' && post.tags.some((t) => t.toLowerCase().includes('cloud') || t.toLowerCase().includes('django') || t.toLowerCase().includes('database')));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-4"
            style={{
              backgroundColor: theme.badgeBg,
              border: `1px solid ${theme.border}`,
              color: theme.primary
            }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ENGINEERING DISPATCHES &amp; RESEARCH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Architectural Chronicle &amp; Field Reports
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            In-depth technical essays on offline-first synchronization, high-concurrency African payment
            rails, and real-world distributed systems engineering.
          </p>
        </div>

        {/* Link to external blogsite */}
        <div className="flex items-center gap-3">
          <a
            href={BLOG_SITE_CONFIG.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer"
            style={{
              backgroundColor: theme.badgeBg,
              border: `1px solid ${theme.border}`,
              color: theme.primary
            }}
          >
            <span>Visit Canonical Blog</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="rounded-2xl p-4 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md"
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}
      >
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer"
              style={{
                backgroundColor:
                  selectedCategory === cat.id ? theme.badgeBg : 'transparent',
                color: selectedCategory === cat.id ? theme.primary : '#94a3b8',
                border: `1px solid ${
                  selectedCategory === cat.id ? theme.border : 'transparent'
                }`
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search essays, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Featured / Grid of Essays */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer"
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`
            }}
            onClick={() => onSelectPost(post)}
          >
            <div>
              {/* Unboxed Metadata per Zero-Pill Discipline */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-mono">
                <span style={{ color: theme.primary }}>{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishDate}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {post.summary}
              </p>

              {/* Key Takeaways */}
              <div className="mb-6 space-y-2 pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                  CORE ENGINEERING TAKEAWAYS
                </span>
                {post.keyTakeaways.slice(0, 2).map((takeaway, tIdx) => (
                  <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2
                      className="w-3.5 h-3.5 shrink-0 mt-0.5"
                      style={{ color: theme.primary }}
                    />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>

              {/* Tags unboxed */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6">
                {post.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-slate-400 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Read Deep Dive Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
              <span className="text-xs text-slate-400">By {post.author}</span>
              <span
                className="text-xs font-medium flex items-center gap-1.5 transition-transform group-hover:translate-x-1"
                style={{ color: theme.primary }}
              >
                <span>Read Technical Deep-Dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          No dispatches found matching your search. Clear the filters to view all essays.
        </div>
      )}

      {/* Blogsite Callout Banner */}
      <div
        className="rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}
      >
        <div>
          <h3 className="text-xl font-bold text-white mb-2">
            Looking for the Complete Writing Archive?
          </h3>
          <p className="text-slate-400 text-sm max-w-xl">
            Read comprehensive guides on Dexie.js vector clocks, KRA eTIMS cryptographic integration,
            and high-throughput SMS pipelines on my standalone engineering blog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={BLOG_SITE_CONFIG.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl text-xs font-semibold text-black transition-all cursor-pointer flex items-center gap-2"
            style={{ backgroundColor: theme.primary }}
          >
            <span>Read on blog.42ndlight.africa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => onOpenScoping('Architecture Advisory from Dispatches')}
            className="px-5 py-3 rounded-xl text-xs font-medium border text-slate-300 hover:text-white transition-all cursor-pointer"
            style={{ borderColor: theme.border }}
          >
            Consult on These Systems
          </button>
        </div>
      </div>
    </div>
  );
};
