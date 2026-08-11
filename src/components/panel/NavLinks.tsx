"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/panel", label: "Dashboard" },
  { href: "/panel/motos", label: "Inventario" },
  { href: "/panel/ventas", label: "Ventas" },
  { href: "/panel/clientes", label: "Clientes" },
  { href: "/panel/tramites", label: "Trámites" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/panel" ? pathname === "/panel" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-brand-orange/15 text-brand-orange"
                : "text-brand-chrome hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
