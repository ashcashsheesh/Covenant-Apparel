"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-charcoal py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Stay Connected</p>
        <h2 className="mt-2 font-serif text-3xl text-cream">Join the Covenant</h2>
        <p className="mt-4 text-sm leading-relaxed text-stone/80">
          Be the first to know about new drops, exclusive releases, and behind-the-scenes
          content.
        </p>
        {status === "success" ? (
          <p className="mt-8 text-sm text-stone">
            Welcome to the family. Check your inbox for a confirmation.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-stone/30 text-cream placeholder:text-stone/50 focus:border-stone"
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={status === "loading"}
              className="shrink-0"
            >
              {status === "loading" ? "Joining..." : "Subscribe"}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
