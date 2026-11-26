import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signIn } from "@/app/auth/actions";

export const metadata = { title: "Sign in — Blekaki" };

export default function SignInPage({ searchParams }: { searchParams: { error?: string; message?: string } }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[440px] px-5 py-16">
        <h1 className="font-serif text-5xl leading-tight">Sign in</h1>
        {searchParams.error && <p role="alert" className="mt-5 rounded-xl bg-cream p-3 text-sm">{searchParams.error}</p>}
        {searchParams.message && <p role="status" className="mt-5 rounded-xl bg-cream p-3 text-sm">{searchParams.message}</p>}
        <form action={signIn} className="mt-6 grid gap-4">
          <label className="grid gap-1 text-sm">Email<input name="email" type="email" autoComplete="email" required className="rounded-full border border-line bg-cream px-5 py-3 text-base text-ink outline-none" /></label>
          <label className="grid gap-1 text-sm">Password<input name="password" type="password" autoComplete="current-password" required className="rounded-full border border-line bg-cream px-5 py-3 text-base text-ink outline-none" /></label>
          <button type="submit" className="rounded-full bg-ink px-6 py-3.5 font-medium text-ivory">Sign in</button>
        </form>
        <p className="mt-6 text-sm text-ink-soft">New to Blekaki? <a href="/sign-up" className="text-gold underline">Create an account</a></p>
      </main>
      <Footer />
    </>
  );
}
