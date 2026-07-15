"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Get in Touch</p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">Contact</h1>
        <p className="mt-4 text-sm text-stone">
          Have a question, collaboration idea, or just want to say hello? We&apos;d love
          to hear from you.
        </p>

        {status === "success" ? (
          <div className="mt-12 text-center">
            <p className="font-serif text-xl text-charcoal">Message sent!</p>
            <p className="mt-2 text-sm text-stone">
              We&apos;ll get back to you within 1-2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div>
              <label htmlFor="name" className="text-xs uppercase tracking-[0.1em] text-stone">
                Name
              </label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="mt-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-[0.1em] text-stone">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="mt-2"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs uppercase tracking-[0.1em] text-stone">
                Message
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="mt-2 w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm text-charcoal placeholder:text-stone/60 focus:border-charcoal focus:outline-none"
              />
            </div>
            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
            {status === "error" && (
              <p className="text-sm text-red-600">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        )}

        <div className="mt-16 border-t border-charcoal/10 pt-8 text-center text-sm text-stone">
          <p>hello@covenantapparel.com</p>
          <p className="mt-1">Mon–Fri, 9am–5pm EST</p>
        </div>
      </div>
    </SiteLayout>
  );
}
