"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/brand/Logo";

const NAV = [
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/#vender", label: "Vende tu moto" },
  { href: "/#ubicacion", label: "Cómo llegar" },
];

export default function SiteHeader({
  loggedIn,
  whatsapp,
}: {
  loggedIn: boolean;
  whatsapp?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="hazard animate-hazard h-[3px] opacity-90" />

        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(8,9,11,0.82)" : "rgba(8,9,11,0)",
            borderBottomColor: scrolled ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0)",
            backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
          className="border-b"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
            <Link href="/" className="group flex items-center gap-3">
              <Logo size={scrolled ? 40 : 46} />
              <div className="leading-[0.95]">
                <p className="display text-xl text-white sm:text-2xl">
                  Surti<span className="text-brand-orange">motos</span>
                </p>
                <p className="eyebrow mt-1 hidden text-brand-chrome-dim sm:block">
                  Compraventa · Ibagué
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 font-condensed text-sm font-semibold uppercase tracking-[0.18em] text-brand-chrome transition-colors hover:text-white"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1 h-[2px] origin-left scale-x-0 bg-brand-orange transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-2 border border-white/15 px-4 py-2.5 font-condensed text-xs font-bold uppercase tracking-[0.16em] text-brand-chrome transition hover:border-brand-orange hover:text-white md:inline-flex"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              )}

              <Link
                href={loggedIn ? "/panel" : "/login"}
                className="hidden items-center gap-2 bg-brand-orange px-5 py-2.5 font-condensed text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-brand-orange-light sm:inline-flex brand-glow"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                {loggedIn && <span className="h-1.5 w-1.5 rounded-full bg-black/60" />}
                {loggedIn ? "Panel" : "Ingresar"}
              </Link>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Abrir menú"
                className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-white/15 transition hover:border-brand-orange lg:hidden"
              >
                <span className="h-[2px] w-5 bg-white" />
                <span className="h-[2px] w-5 bg-brand-orange" />
                <span className="h-[2px] w-3 self-center bg-white" style={{ marginRight: 8 }} />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="grain absolute inset-0 bg-brand-black" />
            <div className="grid-floor absolute inset-0 opacity-60" />

            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between px-5 py-4">
                <p className="display text-xl text-white">
                  Surti<span className="text-brand-orange">motos</span>
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="flex h-11 w-11 items-center justify-center border border-white/15 text-2xl text-brand-chrome transition hover:border-brand-orange hover:text-white"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-white/10 py-4"
                    >
                      <span className="font-mono text-xs text-brand-orange">
                        0{i + 1}
                      </span>
                      <span className="display text-4xl text-white transition-colors group-hover:text-brand-orange">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="flex flex-col gap-3 px-6 pb-10"
              >
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-signal w-full"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Escríbenos por WhatsApp
                  </a>
                )}
                <Link
                  href={loggedIn ? "/panel" : "/login"}
                  onClick={() => setOpen(false)}
                  className="btn-ghost w-full"
                >
                  {loggedIn ? "Ir al panel" : "Iniciar sesión"}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.02h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.22-8.23 8.22z" />
    </svg>
  );
}
