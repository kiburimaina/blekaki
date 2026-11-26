import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1120px] px-5 py-24">
        <h1 className="font-serif text-5xl">Page not found</h1>
        <p className="mt-4 text-ink-soft">That page doesn’t exist or has moved. <a href="/shop" className="text-gold underline">Go to the shop</a>.</p>
      </main>
      <Footer />
    </>
  );
}
