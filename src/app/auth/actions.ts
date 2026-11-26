"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function back(path: string, key: "error" | "message", text: string): never {
  redirect(`${path}?${key}=${encodeURIComponent(text)}`);
}

function field(formData: FormData, name: string): string {
  const v = formData.get(name);
  return typeof v === "string" ? v.trim() : "";
}

export async function signIn(formData: FormData) {
  if (!isSupabaseConfigured()) back("/sign-in", "error", "Sign-in isn’t set up yet.");
  const email = field(formData, "email");
  const password = field(formData, "password");
  if (!email || !password) back("/sign-in", "error", "Enter your email and password.");
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) back("/sign-in", "error", "Email or password is incorrect.");
  redirect("/account");
}

export async function signUp(formData: FormData) {
  if (!isSupabaseConfigured()) back("/sign-up", "error", "Sign-up isn’t set up yet.");
  const name = field(formData, "name");
  const email = field(formData, "email");
  const password = field(formData, "password");
  if (!name) back("/sign-up", "error", "Enter your name.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) back("/sign-up", "error", "Enter a valid email address.");
  if (password.length < 8) back("/sign-up", "error", "Use a password of at least 8 characters.");
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name } } });
  if (error) back("/sign-up", "error", "We couldn’t create that account. Try a different email.");
  back("/sign-in", "message", "Check your email to confirm your account, then sign in.");
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
