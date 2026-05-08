'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Product, ProductSize } from '@/data/types';
import { dispatchAddToCart, rectFromEl } from '@/lib/events';

export interface CartLine {
  id: string; // composite: `${product.id}:${size}:${color}`
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: ProductSize;
  color: string;
  image: string;
  qty: number;
}

interface AddOptions {
  size: ProductSize;
  color: string;
  qty?: number;
  /** Element that triggered the add — used to dispatch the alien-grab event. */
  sourceEl?: Element | null;
  /** Optional image element to use as the ghost clone (defaults to product hero). */
  imageEl?: Element | null;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (p: Product, opts: AddOptions) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = 'hoa.cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setLines(JSON.parse(raw));
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch { /* noop */ }
  }, [lines]);

  const add: CartState['add'] = useCallback((p, opts) => {
    const { size, color, qty = 1, sourceEl, imageEl } = opts;
    const image = p.images[0]?.src ?? '/products/placeholder.svg';

    // Dispatch UFO-grab choreography BEFORE updating state so the user sees
    // the alien fly to the source button before the cart count ticks up.
    if (typeof window !== 'undefined') {
      dispatchAddToCart({
        sourceRect: rectFromEl(sourceEl) ?? { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 1, height: 1 },
        imageRect: rectFromEl(imageEl),
        productImage: image,
        productName: p.name,
      });
    }

    setLines((prev) => {
      const id = `${p.id}:${size}:${color}`;
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      }
      return [
        ...prev,
        {
          id,
          productId: p.id,
          slug: p.slug,
          name: p.name,
          price: p.price,
          size,
          color,
          image,
          qty,
        },
      ];
    });

    // Delay drawer open so the choreography has stage time first.
    window.setTimeout(() => setIsOpen(true), 1900);
  }, []);

  const remove: CartState['remove'] = useCallback((lineId) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const setQty: CartState['setQty'] = useCallback((lineId, qty) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === lineId ? { ...l, qty: Math.max(1, qty) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clear: CartState['clear'] = useCallback(() => setLines([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.qty, 0), [lines]);
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const value: CartState = {
    lines, isOpen, add, remove, setQty, clear, open, close, toggle, subtotal, itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
