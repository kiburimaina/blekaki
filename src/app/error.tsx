"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-24">
      <h1 className="font-serif text-5xl">Something went wrong</h1>
      <p className="mt-4 text-ink-soft">Please try again. If it keeps happening, contact support.</p>
      <button type="button" onClick={reset} className="mt-6 rounded-full bg-ink px-6 py-3 font-medium text-ivory">Try again</button>
    </main>
  );
}
