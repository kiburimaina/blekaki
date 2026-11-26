"use client";

import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { getProduct } from "@/lib/products";

export default function CartView() {
  const { lines, setQty, remove } = useCart();
  const items = lines.flatMap((l) => {
    const product = getProduct(l.slug);
    return product ? [{ product, qty: l.qty }] : [];
  });

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-beige p-8 text-ink-soft">
        Your cart is empty. <a href="/shop" className="text-gold underline">Browse the shop</a>.
      </div>
    );
  }

  const subtotal = items.reduce((n, i) => n + i.product.priceMinor * i.qty, 0);
  const currency = items[0].product.currency;

  return (
    <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
      <ul className="divide-y divide-line border-y border-line">
        {items.map(({ product, qty }) => (
          <li key={product.slug} className="grid grid-cols-[72px_1fr_auto] items-center gap-4 py-4">
            <div style={{ background: product.tone }} className="aspect-square rounded-xl" />
            <div>
              <a href={`/product/${product.slug}`} className="font-serif text-xl">{product.name}</a>
              <p className="text-sm text-ink-soft">{product.sellerName}</p>
              <button type="button" onClick={() => remove(product.slug)} className="mt-1 text-sm text-ink-soft underline">Remove</button>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatMoney(product.priceMinor * qty, product.currency)}</p>
              <div className="mt-2 inline-flex items-center rounded-full border border-line">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQty(product.slug, qty - 1)} className="px-3 py-1">−</button>
                <span className="min-w-6 text-center text-sm" aria-live="polite">{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty(product.slug, qty + 1)} className="px-3 py-1">+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit rounded-[20px] bg-cream p-6">
        <h2 className="font-serif text-2xl">Summary</h2>
        <p className="mt-4 flex justify-between"><span className="text-ink-soft">Subtotal</span><span className="font-medium">{formatMoney(subtotal, currency)}</span></p>
        <p className="mt-2 text-sm text-ink-soft">Delivery is calculated at checkout.</p>
        <button type="button" disabled className="mt-6 w-full cursor-not-allowed rounded-full bg-beige px-6 py-3.5 font-medium text-ink-soft">Checkout opens with payments</button>
        <p className="mt-3 text-xs text-ink-soft">Checkout and payments arrive in Milestone 5. No payment is taken in this build.</p>
      </aside>
    </div>
  );
}
