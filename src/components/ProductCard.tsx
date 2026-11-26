import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { categoryName, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div style={{ background: product.tone }} className="relative aspect-[4/5] rounded-[18px]">
        {product.isSample && (
          <span className="absolute left-3 top-3 rounded-full bg-ivory px-3 py-1 text-xs font-medium text-ink-soft">Sample listing</span>
        )}
      </div>
      <h3 className="mt-3 font-serif text-xl leading-tight group-hover:underline">{product.name}</h3>
      <p className="text-sm text-ink-soft">{categoryName(product.categorySlug)} · {product.sellerName}</p>
      <p className="mt-1 font-medium">{formatMoney(product.priceMinor, product.currency)}</p>
    </Link>
  );
}
