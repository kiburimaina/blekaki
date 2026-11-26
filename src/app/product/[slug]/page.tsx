import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCart from "@/components/AddToCart";
import { formatMoney } from "@/lib/money";
import { categoryName, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  return { title: p ? `${p.name} — Blekaki` : "Product — Blekaki" };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-[1120px] gap-10 px-5 py-12 md:grid-cols-2 md:gap-14">
        <div style={{ background: p.tone }} className="aspect-[4/5] rounded-[22px]" role="img" aria-label={`${p.name} image placeholder`} />
        <div>
          <a href={`/shop?category=${p.categorySlug}`} className="text-sm text-gold">{categoryName(p.categorySlug)}</a>
          <h1 className="mt-2 font-serif text-[clamp(34px,5vw,52px)] leading-tight">{p.name}</h1>
          {p.isSample && <p className="mt-2 inline-block rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink-soft">Sample listing for development</p>}
          <p className="mt-5 text-3xl font-medium">{formatMoney(p.priceMinor, p.currency)}</p>
          <p className="mt-5 text-ink-soft">{p.description}</p>

          <dl className="mt-8 divide-y divide-line border-y border-line text-[15px]">
            <div className="flex justify-between gap-4 py-3"><dt className="text-ink-soft">Sold by</dt><dd>{p.sellerName}</dd></div>
            <div className="flex justify-between gap-4 py-3"><dt className="text-ink-soft">Fulfilled by</dt><dd>{p.fulfilledBy === "seller" ? "The seller" : "A supplier"}</dd></div>
            <div className="flex justify-between gap-4 py-3"><dt className="text-ink-soft">Delivery</dt><dd className="text-right">Estimate shown at checkout</dd></div>
            <div className="flex justify-between gap-4 py-3"><dt className="text-ink-soft">Returns</dt><dd className="text-right">Set by the seller</dd></div>
          </dl>

          <div className="mt-8"><AddToCart slug={p.slug} /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
