import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="text-2xl font-semibold text-black">Page Not Found</h1>
        <p className="mt-4 text-sm text-black/60">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="mt-8 inline-block">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </SiteLayout>
  );
}
