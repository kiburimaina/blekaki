"use client";

import { useStoredList } from "@/lib/useStoredList";

export default function WishlistButton({ slug }: { slug: string }) {
  const { items, toggle } = useStoredList("blekaki.wishlist.v1");
  const saved = items.includes(slug);
  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => toggle(slug)}
      className="rounded-full border border-ink px-6 py-3.5 font-medium"
    >
      {saved ? "Saved to wishlist" : "Save to wishlist"}
    </button>
  );
}
