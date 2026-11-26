"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Line = { slug: string; qty: number };
type CartApi = {
  lines: Line[];
  count: number;
  add: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
};

const CartContext = createContext<CartApi | null>(null);
const KEY = "blekaki.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setLines(parsed.filter((l): l is Line => typeof l?.slug === "string" && Number.isInteger(l?.qty) && l.qty > 0));
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback((slug: string) => {
    setLines((ls) => (ls.some((l) => l.slug === slug) ? ls.map((l) => (l.slug === slug ? { ...l, qty: Math.min(l.qty + 1, 99) } : l)) : [...ls, { slug, qty: 1 }]));
  }, []);
  const setQty = useCallback((slug: string, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.slug !== slug) : ls.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, 99) } : l))));
  }, []);
  const remove = useCallback((slug: string) => setLines((ls) => ls.filter((l) => l.slug !== slug)), []);

  const value = useMemo(() => ({ lines, count: lines.reduce((n, l) => n + l.qty, 0), add, setQty, remove }), [lines, add, setQty, remove]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
