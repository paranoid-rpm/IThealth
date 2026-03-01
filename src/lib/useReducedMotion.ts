import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mm = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mm) return;

    const set = () => setReduced(mm.matches);
    set();

    if (typeof mm.addEventListener === 'function') {
      mm.addEventListener('change', set);
      return () => mm.removeEventListener('change', set);
    }

    mm.addListener(set);
    return () => mm.removeListener(set);
  }, []);

  return reduced;
}
