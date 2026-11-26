"use client";

import { useEffect } from "react";
import { useStoredList } from "@/lib/useStoredList";

export default function RecordView({ slug }: { slug: string }) {
  const { push } = useStoredList("blekaki.recent.v1", 12);
  useEffect(() => {
    push(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return null;
}
