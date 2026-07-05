import React from 'react';

interface ShufflingOverlayProps {
  isVisible: boolean;
  category?: string;
}

export default function ShufflingOverlay({ isVisible, category }: ShufflingOverlayProps) {
  if (!isVisible) return null;

  const getSubtext = () => {
    if (!category) return "Searching for peak uselessness...";
    
    const messages: Record<string, string> = {
      'interactive': 'Engaging the useless gears...',
      'visual': 'Painting with digital nonsense...',
      'audio': 'Tuning the frequencies of void...',
      'zen': 'Finding inner peace in chaos...',
      'chaos': 'Embracing absolute absurdity...',
      'weird': 'Calibrating the strangeness...',
    };

    return messages[category.toLowerCase()] || `Entering: ${category.toUpperCase()}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-4xl">🌀</div>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-widest uppercase animate-pulse">
          {category ? `Entering: ${category}` : 'Shuffling the Void'}
        </h2>
        <p className="text-slate-500 font-mono text-sm">
          {getSubtext()}
        </p>
      </div>

      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
