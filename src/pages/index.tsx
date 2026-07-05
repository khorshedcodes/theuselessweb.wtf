import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Shuffle, Clock, Filter } from 'lucide-react';
import { getNextSlug, getAllTags, getRegistryItem } from '@/utils/shuffler';
import { useWastedTime } from '@/hooks/useWastedTime';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [nextSlug, setNextSlug] = useState('');
  const { formatted, globalFormatted } = useWastedTime();
  const tags = ['all', ...getAllTags()];

  useEffect(() => {
    setNextSlug(getNextSlug(undefined, activeCategory));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating "Nonsense" Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-slate-800/20 select-none animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {['🌀', '✨', '🤌', '☁️', '🦆', '🫠', '🕳️', '🎲'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      <Head>
        <title>theuselessweb.wtf | Spend your time wisely (or not)</title>
        <meta name="description" content="A curated directory of the most useless websites on the internet." />
      </Head>

      <main className="max-w-3xl w-full text-center space-y-12">
        <div className="space-y-4">
          <div className="text-6xl md:text-8xl animate-bounce-slow inline-block">🌀</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
            theuselessweb.wtf
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium">
            Take me to a useless website... please.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              {nextSlug && (
                <Link
                  href={`/site/${nextSlug}`}
                  className="relative z-10 flex items-center gap-4 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl text-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]"
                >
                  <Shuffle size={28} />
                  <span>{activeCategory === 'all' ? 'PLEASE' : `GIVE ME ${activeCategory.toUpperCase()}`}</span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                </Link>
              )}

              {/* Next Site Preview Card */}
              {nextSlug && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all z-20">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Up Next:</div>
                  <div className="text-sm font-bold text-white mb-1 truncate">
                    {getRegistryItem(nextSlug)?.title}
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3 line-clamp-2 leading-relaxed italic">
                    "{getRegistryItem(nextSlug)?.description}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <div className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[8px] font-bold">👤</div>
                      <span>by {getRegistryItem(nextSlug)?.author}</span>
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tighter ${
                      getRegistryItem(nextSlug)?.type === 'internal' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {getRegistryItem(nextSlug)?.type}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full text-sm font-mono text-emerald-400">              <Clock size={16} />
              <span>Your Wasted Time: {formatted}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-widest">
              <Filter size={14} />
              <span>Filter the Chaos</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveCategory(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                    activeCategory === tag
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20 scale-105'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className="pt-12 border-t border-slate-900 text-slate-500 text-sm w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© 2026 theuselessweb.wtf - All rights reserved (to nothing).</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/submit" className="hover:text-slate-300 transition-colors">Submit</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <a href="https://github.com/khorshedcodes/theuselessweb.wtf" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">GitHub</a>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0); }
          33% { transform: translate(10px, -20px) rotate(5deg); }
          66% { transform: translate(-10px, 10px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
