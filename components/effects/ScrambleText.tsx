'use client';

import { useEffect, useRef, useState } from 'react';

const GLYPHS = '!@#$%^&*()_+{}:"<>?[];,.|\\/=ÆØÞ¥01';

interface Props {
  text: string;
  /** Duration of the scramble in ms. Default 900ms. */
  duration?: number;
  /** Wait before starting (allows it to play after page load). */
  delay?: number;
  className?: string;
}

/**
 * Letter-by-letter "decryption" effect — runs once on mount. Each character
 * cycles through random glyphs before settling on its final value, finishing
 * left-to-right. Pure CSS for layout, JS for the glyph cycling.
 */
export function ScrambleText({ text, duration = 900, delay = 0, className }: Props) {
  const [out, setOut] = useState(text.replace(/\S/g, ' '));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now() + delay;
    const tick = (t: number) => {
      const elapsed = Math.max(0, t - start);
      const p = Math.min(1, elapsed / duration);
      const settled = Math.floor(p * text.length);

      let s = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === ' ' || ch === '\n') {
          s += ch;
        } else if (i < settled) {
          s += ch;
        } else {
          s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setOut(s);

      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setOut(text);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [text, duration, delay]);

  return <span className={className} aria-label={text}>{out}</span>;
}
