import SplashOverlay from "@/components/brand/SplashOverlay";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";
import { auth } from "@/lib/auth";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const whatsapp = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP;

  return (
    <div className="relative flex min-h-screen flex-col bg-brand-black text-white">
      <SplashOverlay />
      <SiteHeader loggedIn={Boolean(session?.user)} whatsapp={whatsapp} />
      <main className="flex-1">{children}</main>
      <SiteFooter whatsapp={whatsapp} />
    </div>
  );
}
