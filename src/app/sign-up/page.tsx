import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signUp } from "@/app/auth/actions";

export const metadata = { title: "Create account — Blekaki" };

export default function SignUpPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[440px] px-5 py-16">
        <h1 className="font-serif text-5xl leading-tight">Create your account</h1>
        <p className="mt-3 text-ink-soft">Free to join. Shop now, and start selling when you’re ready.</p>
        {searchParams.error && <p role="alert" className="mt-5 rounded-xl bg-cream p-3 text-sm">{searchParams.error}</p>}
        <form action={signUp} className="mt-6 grid gap-4">
          <label className="grid gap-1 text-sm">Name<input name="name" autoComplete="name" required className="rounded-full border border-line bg-cream px-5 py-3 text-base text-ink outline-none" /></label>
          <label className="grid gap-1 text-sm">Email<input name="email" type="email" autoComplete="email" required className="rounded-full border border-line bg-cream px-5 py-3 text-base text-ink outline-none" /></label>
          <label className="grid gap-1 text-sm">Password (8 or more characters)<input name="password" type="password" autoComplete="new-password" minLength={8} required className="rounded-full border border-line bg-cream px-5 py-3 text-base text-ink outline-none" /></label>
          <button type="submit" className="rounded-full bg-ink px-6 py-3.5 font-medium text-ivory">Create account</button>
        </form>
        <p className="mt-6 text-sm text-ink-soft">Already have an account? <a href="/sign-in" className="text-gold underline">Sign in</a></p>
      </main>
      <Footer />
    </>
  );
}
