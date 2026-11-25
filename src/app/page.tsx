import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";

const trust = [
  ["Know who ships it", "Each product names the seller and, where it applies, the supplier fulfilling your order."],
  ["Verification you can read", "Identity checks, business checks and seller reputation are shown separately, so you can see what each one means."],
  ["Clear delivery and returns", "Delivery estimates and return terms appear before checkout, not after."],
];

const steps = [
  ["Register", "Create your account and verify who you are."],
  ["Create your store", "Name it, add a logo and get a Blekaki store link."],
  ["Choose supplier products", "Pick items approved for dropshipping and see the margin first."],
  ["Set your prices", "Price within any limits the supplier sets."],
  ["Publish and share", "Go live, share your link and manage orders in one place."],
  ["Track your earnings", "See what’s pending, what’s earned and what’s ready to withdraw."],
];

const wholesale = [
  ["Quantity pricing", "Set minimum orders and price breaks. Buyers see the right price for their volume."],
  ["Quotations", "Request a quote, negotiate and convert it to a purchase order."],
  ["Reseller networks", "Let approved resellers sell your products from their own stores."],
  ["Regional reach", "Define where you deliver, then let buyers filter by location."],
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="mx-auto grid max-w-[1120px] items-end gap-12 px-5 pb-16 pt-12 md:grid-cols-[1.25fr_1fr]">
          <div>
            <h1 className="font-serif text-[clamp(52px,9vw,104px)] leading-[.98] tracking-tight">
              Discover.<br />Shop.<br />Sell.<br />Become.
            </h1>
            <p className="mt-6 max-w-[56ch] text-[19px] text-ink-soft">
              One marketplace for buying from sellers you can trust, and for starting a business of your own, from your first product to your own supply network.
            </p>
          </div>
          <div className="grid gap-3.5">
            <a href="#shop" className="block rounded-[20px] bg-cream p-6">
              <h2 className="font-serif text-[28px]">Shop</h2>
              <p className="text-[15px] text-ink-soft">Browse categories and compare sellers before you buy. Every product shows who fulfils it.</p>
              <b className="mt-3.5 inline-block text-[15px] font-semibold text-gold">Browse categories</b>
            </a>
            <a href="#sell" className="block rounded-[20px] bg-ink p-6 text-ivory">
              <h2 className="font-serif text-[28px]">Sell</h2>
              <p className="text-[15px] text-beige">Open a free store, pick supplier products and set your own prices. You never have to buy stock first.</p>
              <b className="mt-3.5 inline-block text-[15px] font-semibold text-gold-fill">See how it works</b>
            </a>
          </div>
        </section>

        <section id="shop" className="bg-cream py-[72px]">
          <div className="mx-auto max-w-[1120px] px-5">
            <h2 className="font-serif text-[clamp(30px,5vw,44px)] leading-tight">Shop by category</h2>
            <p className="mb-8 mt-2.5 max-w-[56ch] text-ink-soft">Start with what you need. Filters for price, seller and location arrive with the product catalogue.</p>
            <CategoryGrid />
          </div>
        </section>

        <section id="trust" className="mx-auto max-w-[1120px] px-5 py-[72px]">
          <h2 className="mb-8 font-serif text-[clamp(30px,5vw,44px)] leading-tight">Buy with confidence</h2>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {trust.map(([t, d]) => (
              <div key={t}><h3 className="mb-2 font-serif text-2xl">{t}</h3><p className="text-ink-soft">{d}</p></div>
            ))}
          </div>
        </section>

        <section id="sell" className="bg-cream py-[72px]">
          <div className="mx-auto grid max-w-[1120px] gap-10 px-5 md:grid-cols-[1fr_1.1fr] md:gap-14">
            <div>
              <h2 className="font-serif text-[clamp(30px,5vw,44px)] leading-tight">Start with what you have</h2>
              <p className="mt-3.5 max-w-[56ch] text-ink-soft">Registration and a starter store are meant to be free. Before you list anything, Blekaki shows the supplier price, delivery cost and your margin.</p>
              <p className="mt-5 max-w-[52ch] text-sm text-ink-soft">Costs depend on the products you choose. Blekaki can’t promise profit, and a small start does not guarantee a result.</p>
            </div>
            <ol>
              {steps.map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[44px_1fr] border-t border-beige py-4 last:border-b">
                  <span className="font-serif text-2xl text-gold">{i + 1}</span>
                  <div><b className="font-semibold">{t}</b><span className="block text-[15px] text-ink-soft">{d}</span></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="wholesale" className="mx-auto max-w-[1120px] px-5 py-[72px]">
          <h2 className="font-serif text-[clamp(30px,5vw,44px)] leading-tight">Wholesale and supply</h2>
          <p className="mb-8 mt-2.5 text-ink-soft">For manufacturers, importers, distributors and bulk buyers.</p>
          <div className="grid gap-4 md:grid-cols-2">
            {wholesale.map(([t, d]) => (
              <div key={t} className="rounded-[18px] bg-cream p-6"><h3 className="mb-1.5 font-serif text-2xl">{t}</h3><p className="text-[15px] text-ink-soft">{d}</p></div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
