import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartView from "@/components/CartView";

export const metadata = { title: "Cart — Blekaki" };

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1120px] px-5 py-12">
        <h1 className="mb-8 font-serif text-[clamp(36px,6vw,56px)] leading-tight">Your cart</h1>
        <CartView />
      </main>
      <Footer />
    </>
  );
}
