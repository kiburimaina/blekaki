import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signOut } from "@/app/auth/actions";

export const metadata = { title: "Account — Blekaki" };

export default async function AccountPage() {
  if (!isSupabaseConfigured()) redirect("/sign-in");
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/sign-in");
  const { data: profile } = await supabase.from("profiles").select("display_name, country_code").eq("id", data.user.id).maybeSingle();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1120px] px-5 py-12">
        <h1 className="font-serif text-[clamp(36px,6vw,56px)] leading-tight">Hello, {profile?.display_name ?? "there"}</h1>
        <p className="mt-2 text-ink-soft">{data.user.email}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[18px] bg-cream p-6"><h2 className="font-serif text-2xl">Orders</h2><p className="mt-1 text-[15px] text-ink-soft">Order history and tracking arrive with checkout.</p></div>
          <div className="rounded-[18px] bg-cream p-6"><h2 className="font-serif text-2xl">Start selling</h2><p className="mt-1 text-[15px] text-ink-soft">Create a business and a store. Seller onboarding is the next piece to build.</p></div>
        </div>
        <form action={signOut} className="mt-8"><button type="submit" className="rounded-full border border-ink px-6 py-3 font-medium">Sign out</button></form>
      </main>
      <Footer />
    </>
  );
}
