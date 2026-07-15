import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">404</p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal">Page Not Found</h1>
        <p className="mt-4 text-sm text-stone">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="mt-8 inline-block">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </SiteLayout>
  );
}
