import { categories } from "./categories";

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  description: string;
  priceMinor: number; // minor units (cents). Display via formatMoney.
  currency: string;
  sellerName: string;
  fulfilledBy: "seller" | "supplier";
  tone: string;
  isSample: boolean;
};

// DEVELOPMENT SEED ONLY. Clearly marked sample listings so the UI can be built and tested.
// Replaced by database rows in Milestone 2. No ratings, stock counts or verification badges are invented.
const SAMPLE_SELLER = "Sample seller";

export const products: Product[] = [
  { slug: "sample-mattress", name: "Sample mattress", categorySlug: "mattresses-bedding", description: "Placeholder listing used to test product pages and the cart. Real descriptions, specifications and variants come from sellers.", priceMinor: 1200000, currency: "KES", sellerName: SAMPLE_SELLER, fulfilledBy: "seller", tone: "#D9C3A5", isSample: true },
  { slug: "sample-bedding-set", name: "Sample bedding set", categorySlug: "mattresses-bedding", description: "Placeholder listing used to test product pages and the cart.", priceMinor: 350000, currency: "KES", sellerName: SAMPLE_SELLER, fulfilledBy: "supplier", tone: "#E9DBC0", isSample: true },
  { slug: "sample-sneakers", name: "Sample sneakers", categorySlug: "fashion-shoes", description: "Placeholder listing used to test product pages and the cart.", priceMinor: 280000, currency: "KES", sellerName: SAMPLE_SELLER, fulfilledBy: "supplier", tone: "#E6D2C3", isSample: true },
  { slug: "sample-water-tank", name: "Sample water tank", categorySlug: "building-hardware", description: "Placeholder listing used to test product pages and the cart.", priceMinor: 950000, currency: "KES", sellerName: SAMPLE_SELLER, fulfilledBy: "seller", tone: "#CDBFA6", isSample: true },
  { slug: "sample-suitcase", name: "Sample suitcase", categorySlug: "luggage-travel", description: "Placeholder listing used to test product pages and the cart.", priceMinor: 420000, currency: "KES", sellerName: SAMPLE_SELLER, fulfilledBy: "supplier", tone: "#D8CDB9", isSample: true },
  { slug: "sample-table-lamp", name: "Sample table lamp", categorySlug: "home-living", description: "Placeholder listing used to test product pages and the cart.", priceMinor: 180000, currency: "KES", sellerName: SAMPLE_SELLER, fulfilledBy: "seller", tone: "#E8D6B3", isSample: true },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function categoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export function searchProducts(opts: { q?: string; category?: string; sort?: string }): Product[] {
  const q = (opts.q ?? "").trim().toLowerCase();
  let list = products.filter(
    (p) => (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) && (!opts.category || p.categorySlug === opts.category)
  );
  if (opts.sort === "price-asc") list = [...list].sort((a, b) => a.priceMinor - b.priceMinor);
  if (opts.sort === "price-desc") list = [...list].sort((a, b) => b.priceMinor - a.priceMinor);
  return list;
}
