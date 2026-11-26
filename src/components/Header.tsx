import CartLink from "./CartLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-ivory">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-5">
        <a href="/" className="font-serif text-3xl tracking-wide">Blekaki</a>
        <nav aria-label="Main" className="hidden gap-7 text-[15px] text-ink-soft md:flex">
          <a href="/shop" className="hover:text-ink">Shop</a>
          <a href="/#sell" className="hover:text-ink">Sell</a>
          <a href="/#wholesale" className="hover:text-ink">Wholesale</a>
          <a href="/#trust" className="hover:text-ink">Buyer protection</a>
        </nav>
        <div className="flex items-center gap-4">
          <CartLink />
          <a href="/#sell" className="hidden rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-ivory sm:block">Start selling</a>
        </div>
      </div>
    </header>
  );
}
