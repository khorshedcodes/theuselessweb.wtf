import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ShufflingOverlay from '@/components/ShufflingOverlay';
import { playShuffleSound } from '@/utils/audio';
import { getRegistryItem } from '@/utils/shuffler';
import { useWastedTime } from '@/hooks/useWastedTime';
import confetti from 'canvas-confetti';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isShuffling, setIsShuffling] = useState(false);
  const [nextCategory, setNextCategory] = useState<string | undefined>();
  const { globalSeconds } = useWastedTime();

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url.includes('/site/')) {
        const slug = url.split('/').pop()?.split('?')[0];
        if (slug) {
          const item = getRegistryItem(slug);
          setNextCategory(item?.tags[0]);
        }
        setIsShuffling(true);
        playShuffleSound();
      }
    };
    const handleComplete = () => {
      // Small delay to make the transition feel more deliberate
      setTimeout(() => {
        setIsShuffling(false);
        setNextCategory(undefined);
      }, 800);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Milestone Celebration
  useEffect(() => {
    // Celebrate every 1000 seconds of global wasted time
    if (globalSeconds > 0 && globalSeconds % 1000 === 0) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#818cf8', '#c7d2fe']
      });
    }
  }, [globalSeconds]);

  return (
    <>
      <Component {...pageProps} />
      <ShufflingOverlay isVisible={isShuffling} category={nextCategory} />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #334155',
          },
        }}
      />
    </>
  );
}
