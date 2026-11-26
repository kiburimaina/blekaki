import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/categories";
import { searchProducts } from "@/lib/products";

export const metadata = { title: "Shop — Blekaki" };

type Props = { searchParams: { q?: string; category?: string; sort?: string } };

export default function ShopPage({ searchParams }: Props) {
  const { q = "", category = "", sort = "" } = searchParams;
  const results = searchProducts({ q, category, sort });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1120px] px-5 py-12">
        <h1 className="font-serif text-[clamp(36px,6vw,56px)] leading-tight">Shop</h1>
        <form action="/shop" method="get" role="search" className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <input name="q" defaultValue={q} type="search" placeholder="Search products" aria-label="Search products" className="rounded-full border border-line bg-cream px-5 py-3 text-ink outline-none" />
          <select name="category" defaultValue={category} aria-label="Category" className="rounded-full border border-line bg-cream px-4 py-3 text-ink">
            <option value="">All categories</option>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
          <select name="sort" defaultValue={sort} aria-label="Sort" className="rounded-full border border-line bg-cream px-4 py-3 text-ink">
            <option value="">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
          <button type="submit" className="rounded-full bg-ink px-6 py-3 font-medium text-ivory">Search</button>
        </form>

        <p className="mt-6 text-sm text-ink-soft">{results.length} {results.length === 1 ? "product" : "products"}. These are sample listings used for development.</p>

        {results.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-beige p-7 text-ink-soft">Nothing matches that search. Try a broader word or clear the category.</p>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {results.map((p) => <li key={p.slug}><ProductCard product={p} /></li>)}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
