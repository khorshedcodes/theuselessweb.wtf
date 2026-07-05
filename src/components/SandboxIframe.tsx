import React, { useState, useEffect } from 'react';
import { RefreshCcw, AlertTriangle, Shuffle } from 'lucide-react';
import { useRouter } from 'next/router';
import { getNextSlug } from '@/utils/shuffler';

interface SandboxIframeProps {
  src: string;
  title: string;
}

export default function SandboxIframe({ src, title }: SandboxIframeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const slug = router.query.slug as string;

  useEffect(() => {
    // Reset state when src changes
    setIsLoading(true);
    setHasError(false);

    const timer = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 8000); // 8 second timeout

    return () => clearTimeout(timer);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe reload by appending a query param if needed, or just re-render
    const iframe = document.querySelector('iframe');
    if (iframe) iframe.src = src;
  };

  const handleSkip = () => {
    const nextSlug = getNextSlug(slug);
    router.push(`/site/${nextSlug}`);
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-slate-950 overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-mono text-xs animate-pulse">Establishing connection...</p>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm p-6 text-center space-y-6">
          <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
            <AlertTriangle size={40} />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-xl font-bold text-white">This site is playing hard to get</h3>
            <p className="text-slate-400 text-sm">
              It might be offline, or its security settings (X-Frame-Options) prevent it from being displayed here.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold transition-all"
            >
              <RefreshCcw size={18} />
              Retry
            </button>
            <button
              onClick={handleSkip}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all shadow-lg shadow-indigo-500/20"
            >
              <Shuffle size={18} />
              Skip to Next
            </button>
          </div>
        </div>
      )}

      <iframe
        src={src}
        title={title}
        onLoad={handleLoad}
        className={`w-full h-full border-none m-0 p-0 absolute inset-0 transition-opacity duration-500 ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`}
        /* Critical Security Sandboxing Flags - allow-same-origin intentionally omitted to prevent parent scope access */
        sandbox="allow-scripts allow-forms allow-modals"
        /* Restricted hardware features - camera and microphone intentionally excluded */
        allow="midi; geolocation"
        loading="lazy"
      />
    </div>
  );
}
