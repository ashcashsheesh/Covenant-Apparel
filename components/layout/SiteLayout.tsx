import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <AnnouncementBar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
