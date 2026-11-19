"use client";

import { FormEvent, useState } from "react";
import { business } from "@/lib/content";

// FormSubmit forwards posts to the café inbox with no server or API key.
// The first submission sends an "Activate form" email to that inbox; messages
// are delivered once it has been confirmed.
const ENDPOINT = `https://formsubmit.co/ajax/${business.email}`;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink/35 focus:border-ink focus:outline-none focus:ring-0 transition-colors";
const label = "text-xs uppercase tracking-[0.2em] text-ink/60";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return;

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: `New website enquiry — ${business.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      if (res.ok && (json?.success === true || json?.success === "true")) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-ink/10 pt-10">
        <p className="font-display text-3xl font-light italic text-ink">Thank you.</p>
        <p className="mt-4 max-w-md text-base leading-[1.8] text-ink/70">
          Your message is on its way to the team — we&apos;ll get back to you by email as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="underline-grow mt-8 text-sm uppercase tracking-[0.15em] text-bronze"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-9">
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input name="name" type="text" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </label>
      </div>

      <label className="block">
        <span className={label}>Message</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={3000}
          placeholder="Group bookings, events, questions about the menu…"
          className={`${field} resize-none`}
        />
      </label>

      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center bg-ink px-9 py-4 text-sm uppercase tracking-[0.2em] text-cream transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs leading-relaxed text-ink/60">
          Your details are only used to reply to you.
        </p>
      </div>

      <p aria-live="polite" className="text-sm text-ink/70">
        {status === "error" && (
          <>
            Sorry — that didn&apos;t send. Please email us directly at{" "}
            <a href={`mailto:${business.email}`} className="text-bronze underline">
              {business.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
