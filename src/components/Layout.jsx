import { useEffect } from 'react';
import TopBar from './TopBar.jsx';
import BottomNav from './BottomNav.jsx';

export default function Layout({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const root = document.documentElement;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    root.style.setProperty('--mesh-pointer-nx', '0');
    root.style.setProperty('--mesh-pointer-ny', '0');

    if (!finePointer.matches || reducedMotion.matches) {
      return undefined;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      root.style.setProperty('--mesh-pointer-nx', currentX.toFixed(4));
      root.style.setProperty('--mesh-pointer-ny', currentY.toFixed(4));

      const settledX = Math.abs(targetX - currentX) < 0.001;
      const settledY = Math.abs(targetY - currentY) < 0.001;
      if (settledX && settledY) {
        rafId = 0;
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const ensureTick = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      targetX = (event.clientX / width) * 2 - 1;
      targetY = (event.clientY / height) * 2 - 1;
      ensureTick();
    };

    const resetTarget = () => {
      targetX = 0;
      targetY = 0;
      ensureTick();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', resetTarget);
    window.addEventListener('blur', resetTarget);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', resetTarget);
      window.removeEventListener('blur', resetTarget);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      root.style.setProperty('--mesh-pointer-nx', '0');
      root.style.setProperty('--mesh-pointer-ny', '0');
    };
  }, []);

  return (
    <div className="app">
      <div className="mesh-gradient" aria-hidden="true">
        <span className="mesh-gradient__blob mesh-gradient__blob--one" />
        <span className="mesh-gradient__blob mesh-gradient__blob--two" />
        <span className="mesh-gradient__blob mesh-gradient__blob--three" />
      </div>
      <TopBar />
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
