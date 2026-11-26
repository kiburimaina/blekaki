"use client";

import ProductCard from "./ProductCard";
import { getProduct, type Product } from "@/lib/products";
import { useStoredList } from "@/lib/useStoredList";

export default function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const { items } = useStoredList("blekaki.recent.v1", 12);
  const list = items.filter((s) => s !== excludeSlug).flatMap((s) => { const p = getProduct(s); return p ? [p] : []; }).slice(0, 4) as Product[];
  if (list.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1120px] px-5 pb-16">
      <h2 className="mb-6 font-serif text-3xl">Recently viewed</h2>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        {list.map((p) => <li key={p.slug}><ProductCard product={p} /></li>)}
      </ul>
    </section>
  );
}
