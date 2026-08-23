"use client";

import { useEffect, useState } from "react";

/** True below the `md` breakpoint (768px), tracked live. */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    setIsMobile(query.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return isMobile;
}
