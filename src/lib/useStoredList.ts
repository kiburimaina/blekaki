"use client";

import { useCallback, useEffect, useState } from "react";

// Small localStorage-backed list of product slugs (wishlist, recently viewed).
export function useStoredList(key: string, max = 50) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
      if (Array.isArray(parsed)) setItems(parsed.filter((x): x is string => typeof x === "string"));
    } catch {}
  }, [key]);

  const write = useCallback(
    (next: string[]) => {
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {}
      return next;
    },
    [key]
  );

  const toggle = useCallback(
    (slug: string) => setItems((prev) => write(prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev].slice(0, max))),
    [write, max]
  );
  const push = useCallback(
    (slug: string) => setItems((prev) => write([slug, ...prev.filter((s) => s !== slug)].slice(0, max))),
    [write, max]
  );

  return { items, toggle, push };
}
