"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/panel", label: "Dashboard", icon: GaugeIcon },
  { href: "/panel/motos", label: "Inventario", icon: BikeIcon },
  { href: "/panel/ventas", label: "Ventas", icon: TagIcon },
  { href: "/panel/clientes", label: "Clientes", icon: UsersIcon },
  { href: "/panel/tramites", label: "Trámites", icon: DocIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-3 py-5">
      <p className="eyebrow mb-3 px-3 text-brand-chrome-dim">Operación</p>

      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/panel" ? pathname === "/panel" : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center gap-3 px-3 py-2.5 font-condensed text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
              active ? "text-brand-orange" : "text-brand-chrome hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="panel-nav-active"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
                className="absolute inset-0 border-l-2 border-brand-orange bg-brand-orange/10"
              />
            )}
            <Icon className="relative h-[18px] w-[18px] shrink-0" />
            <span className="relative">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

type IconProps = { className?: string };

function GaugeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M12 21a9 9 0 1 1 9-9" strokeLinecap="round" />
      <path d="m12 12 5-4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BikeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <circle cx="5" cy="17" r="3.2" />
      <circle cx="19" cy="17" r="3.2" />
      <path d="M5 17h4l4-7h4M13 10 11 7H8m9 3 2 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M3 12V4h8l9 9-8 8-9-9z" strokeLinejoin="round" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M3 20c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4M16 5.2a3.4 3.4 0 0 1 0 6.6M18 20c0-2.4-.9-4-2.4-5" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" strokeLinejoin="round" />
      <path d="M14 3v4h4M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  );
}
