"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => { add(slug); setAdded(true); setTimeout(() => setAdded(false), 1800); }}
      className="rounded-full bg-gold-fill px-8 py-3.5 font-medium text-[#26231f]"
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
