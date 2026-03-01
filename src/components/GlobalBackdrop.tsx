import { useEffect, useState } from 'react';
import HudCanvas from './HudCanvas';

export default function GlobalBackdrop() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    if (prefersReduced) setEnabled(false);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <HudCanvas className="w-full h-full opacity-90" intensity={1} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
    </div>
  );
}
