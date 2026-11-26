"use client";

import { useCart } from "@/lib/cart";

export default function CartLink() {
  const { count } = useCart();
  return (
    <a href="/cart" className="text-[15px] font-medium" aria-label={`Cart, ${count} items`}>
      Cart{count > 0 ? ` (${count})` : ""}
    </a>
  );
}
