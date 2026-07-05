import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Shuffle, Code, Clock, Share2, Play, Pause } from 'lucide-react';
import { getNextSlug } from '../utils/shuffler';
import { useWastedTime } from '../hooks/useWastedTime';
import toast from 'react-hot-toast';

interface NavigationFrameProps {
  currentSlug?: string;
  siteTitle?: string;
  githubUrl?: string;
}

export default function NavigationFrame({ currentSlug, siteTitle, githubUrl }: NavigationFrameProps) {
  const router = useRouter();
  const { formatted } = useWastedTime();
  const nextSlug = getNextSlug(currentSlug);
  const [isAutoShuffling, setIsAutoShuffling] = useState(false);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoShuffling) {
      interval = setInterval(() => {
        router.push(`/site/${nextSlug}`);
      }, 20000); // Shuffle every 20 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoShuffling, nextSlug, router]);

  const handleShare = async () => {
    const shareData = {
      title: siteTitle ? `${siteTitle} | theuselessweb.wtf` : 'theuselessweb.wtf',
      text: 'Check out this useless website I found!',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        toast.error('Could not share the link');
      }
    }
  };

  return (
    <header className="h-16 w-full bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">🌀</div>
          <span className="font-bold text-white hidden md:block">theuselessweb.wtf</span>
        </Link>
        
        {siteTitle && (
          <div className="hidden lg:flex items-center gap-6 border-l border-slate-700 pl-4 h-6">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-xs uppercase tracking-wider font-semibold">Viewing:</span>
              <span className="text-sm text-slate-200 truncate max-w-[150px]">{siteTitle}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => setIsAutoShuffling(!isAutoShuffling)}
          className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
            isAutoShuffling 
              ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' 
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
          }`}
          title={isAutoShuffling ? 'Stop Auto-Shuffle' : 'Start Auto-Shuffle'}
        >
          {isAutoShuffling ? <Pause size={14} /> : <Play size={14} />}
          <span>{isAutoShuffling ? 'Auto-Shuffle ON' : 'Auto-Shuffle'}</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full text-xs font-mono text-emerald-400 border border-slate-700">
          <Clock size={14} />
          <span>Wasted: {formatted}</span>
        </div>

        <button
          onClick={handleShare}
          className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-lg"
          title="Share this site"
        >
          <Share2 size={20} />
        </button>

        <Link
          href={`/site/${nextSlug}`}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full font-bold transition-all transform active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          <Shuffle size={18} />
          <span className="hidden xs:inline">Shuffle Next</span>
        </Link>

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="View Source on GitHub"
          >
            <Code size={20} />
          </a>
        )}
      </div>
    </header>
  );
}
