import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WishlistView from "@/components/WishlistView";

export const metadata = { title: "Wishlist — Blekaki" };

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1120px] px-5 py-12">
        <h1 className="mb-8 font-serif text-[clamp(36px,6vw,56px)] leading-tight">Wishlist</h1>
        <WishlistView />
      </main>
      <Footer />
    </>
  );
}
