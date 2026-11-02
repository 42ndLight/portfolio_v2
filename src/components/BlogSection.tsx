import React from 'react';
import { BlogPost } from '../types';
import { BLOG_SITE_CONFIG } from '../data/portfolioData';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Tag,
  Terminal,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onOpenScoping: (topic: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  onSelectPost,
  onOpenScoping
}) => {
  return (
    <section
      id="blog"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="font-mono text-xs text-[#00FF66] tracking-widest uppercase mb-2 flex items-center gap-2">
            <span className="w-4 h-px bg-[#00FF66]"></span>
            TECHNICAL DISPATCHES // TOP 2 LATEST ESSAYS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering Chronicle &amp; Architectural Research
          </h2>
        </div>

        {/* Link to external blogsite */}
        <div className="flex items-center gap-3">
          <a
            id="header-blogsite-link"
            href={BLOG_SITE_CONFIG.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#00E5FF] hover:text-white bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 px-4 py-2 rounded flex items-center gap-2 transition-all group shadow-neon-cyan-sm cursor-pointer"
          >
            <span>[VISIT BLOGSITE: blog.42ndlight.africa]</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Top 2 Latest Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {posts.slice(0, 2).map((post, index) => {
          const isFirst = index === 0;
          return (
            <article
              key={post.id}
              id={`blog-post-card-${post.id}`}
              onClick={() => onSelectPost(post)}
              className={`bg-[#0b0e0c] border border-[rgba(0,255,102,0.2)] hover:border-${
                isFirst ? '[#00FF66]' : '[#00E5FF]'
              } rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer ${
                isFirst ? 'hover:shadow-neon-green' : 'hover:shadow-neon-cyan'
              }`}
            >
              {/* HUD corner brackets */}
              <div className="hud-bracket-tl"></div>
              <div className="hud-bracket-tr"></div>
              <div className="hud-bracket-bl"></div>
              <div className="hud-bracket-br"></div>

              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className={`font-mono text-[11px] px-2.5 py-1 rounded font-semibold tracking-wide border ${
                      isFirst
                        ? 'bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/30'
                        : 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30'
                    }`}
                  >
                    DISPATCH #{index + 1} // {post.category.split('//')[0].trim()}
                  </span>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#7d8b83]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#7d8b83]" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span className="text-[#99ab9f]">{post.publishDate}</span>
                  </div>
                </div>

                {/* Post Title */}
                <h3
                  className={`text-xl sm:text-2xl font-bold text-white mb-3 group-hover:${
                    isFirst ? 'text-[#00FF66]' : 'text-[#00E5FF]'
                  } transition-colors leading-snug`}
                >
                  {post.title}
                </h3>

                {/* Subtitle / Excerpt */}
                <p className="text-sm text-[#99ab9f] leading-relaxed mb-6 font-sans">
                  {post.summary}
                </p>

                {/* Code Snippet Teaser Banner */}
                {post.codeBlock && (
                  <div className="mb-6 p-3 rounded bg-black/80 border border-[rgba(0,255,102,0.15)] font-mono text-[11px] text-[#7d8b83] flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white/90">
                      <Terminal className="w-3.5 h-3.5 text-[#00FF66]" />
                      <span>{post.codeBlock.filename}</span>
                    </span>
                    <span className="text-[#00FF66] text-[10px]">[CODE ATTACHED]</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-8 font-mono text-xs">
                  {post.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[#99ab9f]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="pt-4 border-t border-[rgba(0,255,102,0.15)] flex items-center justify-between">
                <span
                  className={`font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                    isFirst ? 'text-[#00FF66]' : 'text-[#00E5FF]'
                  } group-hover:translate-x-1 transition-transform`}
                >
                  <span>[READ FULL DISPATCH →]</span>
                </span>

                <span className="font-mono text-[11px] text-[#7d8b83]">
                  {post.viewsCount}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* External Blog Announcement Banner */}
      <div className="mt-8 p-6 rounded-xl bg-[#060807] border border-[rgba(0,255,102,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping"></div>
          <div>
            <span className="text-white font-bold tracking-wide">
              LOOKING FOR MORE CASE STUDIES &amp; BENCHMARK REPORTS?
            </span>
            <p className="text-[#7d8b83] font-sans text-xs mt-0.5">
              Explore our full catalog of articles covering telecom infrastructure, offline retail, and cloud economics.
            </p>
          </div>
        </div>

        <a
          id="external-blog-banner-btn"
          href={BLOG_SITE_CONFIG.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded border border-[#00FF66]/50 bg-[#00FF66]/10 text-[#00FF66] hover:bg-[#00FF66] hover:text-black font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span>[EXPLORE FULL BLOGSITE: blog.42ndlight.africa]</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
