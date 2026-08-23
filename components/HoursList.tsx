"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/content";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Highlights today's row client-side — the page is statically prerendered, so "today" can only be known in the browser. */
export function HoursList() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(dayNames[new Date().getDay()]);
  }, []);

  return (
    <ul className="mt-3 max-w-xs divide-y divide-cream/10">
      {business.hours.map((h) => {
        const isToday = h.day === today;
        return (
          <li
            key={h.day}
            className={`flex items-center justify-between gap-8 py-2 text-sm ${
              isToday ? "text-cream" : "text-cream/70"
            }`}
          >
            <span className="flex items-center gap-2">
              {isToday && <span className="h-1.5 w-1.5 rounded-full bg-brass" />}
              {h.day}
            </span>
            <span className={isToday ? "font-medium text-brass" : "text-cream/50"}>
              {h.time}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
