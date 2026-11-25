"use client";

import { useState } from "react";
import { categories } from "@/lib/categories";

export default function CategoryGrid() {
  const [q, setQ] = useState("");
  const v = q.trim().toLowerCase();
  const shown = categories.filter((c) => !v || c.name.toLowerCase().includes(v));

  return (
    <div>
      <div role="search" className="mb-8 flex max-w-[520px] rounded-full border border-line bg-ivory p-1.5 pl-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          placeholder="Search categories, e.g. bedding"
          aria-label="Search categories"
          className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-soft"
        />
      </div>
      {shown.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-beige p-7 text-ink-soft">
          No categories match that search. Try a broader word, such as “home” or “fashion”.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {shown.map((c) => (
            <li key={c.slug}>
              <a
                href={`#${c.slug}`}
                style={{ background: c.tone }}
                className="flex aspect-[4/5] items-end rounded-[18px] p-[18px] font-serif text-[22px] leading-tight text-[#26231f]"
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
