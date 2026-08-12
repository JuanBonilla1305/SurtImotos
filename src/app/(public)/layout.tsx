import Link from "next/link";
import Logo from "@/components/brand/Logo";
import SplashOverlay from "@/components/brand/SplashOverlay";
import { auth } from "@/lib/auth";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-brand-black text-white">
      <SplashOverlay />
      <header className="sticky top-0 z-30 border-b border-white/10 bg-brand-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Logo size={48} />
            <div className="leading-none">
              <p className="font-brand text-base font-bold uppercase italic tracking-wide sm:text-lg">
                Compra<span className="text-brand-orange">venta</span>
              </p>
              <p className="hidden text-[11px] uppercase tracking-[0.2em] text-brand-chrome-dim sm:block">
                Surti Motos · Ibagué
              </p>
            </div>
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden items-center gap-1.5 text-xs text-brand-chrome-dim sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Conectado
              </span>
              <Link
                href="/panel"
                className="rounded-md bg-brand-orange px-3 py-2 text-sm font-semibold text-black transition hover:bg-brand-orange-light sm:px-4 brand-glow"
              >
                Ir al panel
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md border border-brand-orange px-3 py-2 text-sm font-semibold text-brand-orange transition hover:bg-brand-orange hover:text-black sm:px-4 brand-glow"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-brand-chrome-dim">
        © {new Date().getFullYear()} Compraventa Surti Motos · Ibagué, Colombia
      </footer>
    </div>
  );
}
