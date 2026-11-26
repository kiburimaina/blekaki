"use client";

import ProductCard from "./ProductCard";
import { getProduct, type Product } from "@/lib/products";
import { useStoredList } from "@/lib/useStoredList";

export default function WishlistView() {
  const { items } = useStoredList("blekaki.wishlist.v1");
  const list = items.flatMap((s) => { const p = getProduct(s); return p ? [p] : []; }) as Product[];
  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-beige p-8 text-ink-soft">
        Nothing saved yet. <a href="/shop" className="text-gold underline">Browse the shop</a> and save what you like.
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
      {list.map((p) => <li key={p.slug}><ProductCard product={p} /></li>)}
    </ul>
  );
}
