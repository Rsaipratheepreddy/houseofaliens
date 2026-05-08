'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.scss';

/**
 * CustomCursor — full-image cursor that follows the mouse via JS.
 *
 * The browser's native CSS `cursor: url(...)` clamps cursor images to
 * ~32×32px. To use a larger illustration we hide the native cursor and
 * render an absolutely-positioned <img> that tracks `mousemove`.
 *
 * Touch devices keep the OS cursor (mouse never moves), and the cursor
 * is hidden until the first real mouse movement to avoid flashing in the
 * top-left corner on page load.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === 'undefined') return;

    let raf = 0;
    let nextX = -100;
    let nextY = -100;
    let curX  = -100;
    let curY  = -100;

    const lerp = () => {
      // Soft trailing easing — 0.3 = pretty snappy, 1 = no easing.
      curX += (nextX - curX) * 0.35;
      curY += (nextY - curY) * 0.35;
      node.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(lerp);
    };

    const onMove = (e: MouseEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (!shown) setShown(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest('a, button, [role="button"], label[for], input, textarea, select');
      setHovering(!!interactive);
    };

    const onLeave = () => setShown(false);
    const onEnter = () => setShown(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, [shown]);

  return (
    <div
      ref={ref}
      className={`${styles.cursor} ${shown ? styles.shown : ''} ${hovering ? styles.hovering : ''}`}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/cursor-alien.png" alt="" draggable={false} />
    </div>
  );
}
