export function playShuffleSound() {
  if (typeof window === 'undefined') return;

  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // Retro "blip" sound
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}
