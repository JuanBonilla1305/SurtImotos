"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/brand/Logo";
import NavLinks from "@/components/panel/NavLinks";

const DESKTOP_QUERY = "(min-width: 1024px)";

export default function PanelSidebar({
  userEmail,
  onSignOut,
}: {
  userEmail: string;
  onSignOut: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(media.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const visible = isDesktop || open;

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 bg-brand-black px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md p-1 text-white hover:bg-white/10"
          aria-label="Abrir menú"
        >
          ☰
        </button>
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <p className="font-brand text-sm font-bold uppercase italic text-white">
            Compra<span className="text-brand-orange">venta</span>
          </p>
        </div>
        <div className="w-7" />
      </div>

      {open && !isDesktop && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-brand-black transition-transform duration-200 lg:static"
        style={{ translate: visible ? "0" : "-100%" }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-4">
          <Logo size={36} />
          <div className="leading-none">
            <p className="font-brand text-sm font-bold uppercase italic text-white">
              Compra<span className="text-brand-orange">venta</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-brand-chrome-dim">
              Panel admin
            </p>
          </div>
        </div>

        <div onClick={() => setOpen(false)}>
          <NavLinks />
        </div>

        <div className="border-t border-white/10 px-3 py-4">
          <Link
            href="/"
            className="mb-2 block rounded-md px-3 py-2 text-sm font-medium text-brand-chrome hover:bg-white/5 hover:text-white"
          >
            ← Volver al sitio principal
          </Link>

          <p className="truncate px-3 text-xs text-brand-chrome-dim">{userEmail}</p>
          <form action={onSignOut}>
            <button
              type="submit"
              className="mt-2 w-full rounded-md px-3 py-2 text-left text-sm font-medium text-brand-chrome hover:bg-white/5 hover:text-white"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
