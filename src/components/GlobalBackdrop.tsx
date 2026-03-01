import { useEffect, useState } from 'react';
import ParticleFlowCanvas from './ParticleFlowCanvas';

export default function GlobalBackdrop() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    if (prefersReduced) setEnabled(false);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <ParticleFlowCanvas className="w-full h-full" intensity={1} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/45" />
    </div>
  );
}
