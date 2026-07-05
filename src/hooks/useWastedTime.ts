import { useState, useEffect } from 'react';

const STORAGE_KEY = 'theuselessweb_wasted_time';

export function useWastedTime() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Local tracking
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSeconds(parseInt(stored, 10));
    }

    const interval = setInterval(() => {
      // Update local
      setSeconds(prev => {
        const next = prev + 1;
        localStorage.setItem(STORAGE_KEY, next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const formatted = formatTime(seconds);

  return { 
    seconds, 
    formatted,
    globalSeconds: seconds,
    globalFormatted: formatted
  };
}
