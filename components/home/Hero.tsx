"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,129,120,0.15)_0%,_transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.4em] text-stone"
        >
          Spring Collection 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 font-serif text-5xl leading-tight text-cream md:text-7xl"
        >
          Wear Your
          <br />
          Conviction
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-md text-base leading-relaxed text-stone/80"
        >
          Clean, aesthetic designs rooted in faith. Graphic apparel for those
          who live with purpose.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/shop">
            <Button variant="secondary" size="lg">
              Shop Now
            </Button>
          </Link>
          <Link href="/lookbook">
            <Button
              variant="outline"
              size="lg"
              className="border-stone/40 text-cream hover:bg-cream hover:text-charcoal"
            >
              View Lookbook
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
