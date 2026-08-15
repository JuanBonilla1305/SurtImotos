"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/brand/Logo";
import NavLinks from "@/components/panel/NavLinks";

export default function PanelSidebar({
  userEmail,
  onSignOut,
}: {
  userEmail: string;
  onSignOut: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Barra superior móvil */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-brand-black/90 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-white/15 transition hover:border-brand-orange"
        >
          <span className="h-[2px] w-4 bg-white" />
          <span className="h-[2px] w-4 bg-brand-orange" />
          <span className="h-[2px] w-4 bg-white" />
        </button>

        <div className="flex items-center gap-2">
          <Logo size={30} />
          <p className="display text-lg text-white">
            Surti<span className="text-brand-orange">motos</span>
          </p>
        </div>

        <div className="w-10" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-brand-charcoal transition-transform duration-300 ease-out lg:static ${
          open ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
        }`}
      >
        <div className="hazard h-[3px] opacity-80" />

        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-5">
          <Logo size={40} />
          <div className="leading-[0.95]">
            <p className="display text-lg text-white">
              Surti<span className="text-brand-orange">motos</span>
            </p>
            <p className="eyebrow mt-1 text-brand-chrome-dim">Panel interno</p>
          </div>
        </div>

        <div onClick={() => setOpen(false)} className="flex-1 overflow-y-auto">
          <NavLinks />
        </div>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="mb-3 flex items-center gap-2 px-3 py-2 font-condensed text-xs font-semibold uppercase tracking-[0.14em] text-brand-chrome-dim transition-colors hover:text-brand-orange"
          >
            ← Ver el sitio público
          </Link>

          <div className="flex items-center gap-3 border border-white/10 bg-black/40 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand-orange font-condensed text-sm font-bold text-black">
              {userEmail.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-brand-chrome">{userEmail}</p>
              <form action={onSignOut}>
                <button
                  type="submit"
                  className="mt-0.5 font-condensed text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-chrome-dim transition-colors hover:text-red-400"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
