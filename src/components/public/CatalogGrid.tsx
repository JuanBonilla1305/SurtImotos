"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MotoCard, { type Moto } from "@/components/MotoCard";
import { normalize } from "@/lib/moto-catalog";

type SortKey = "recientes" | "km-asc" | "cc-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "recientes", label: "Recientes" },
  { key: "km-asc", label: "Menos kilómetros" },
  { key: "cc-desc", label: "Más cilindraje" },
];

export default function CatalogGrid({ motos }: { motos: Moto[] }) {
  const [brand, setBrand] = useState("todas");
  const [sort, setSort] = useState<SortKey>("recientes");

  // Se agrupan ignorando mayúsculas y espacios: hay filas antiguas guardadas
  // como "Yamaha " que si no aparecerían como una marca aparte.
  const brands = useMemo(() => {
    const unique = new Map<string, string>();
    for (const moto of motos) {
      const key = normalize(moto.brand);
      if (key && !unique.has(key)) unique.set(key, moto.brand.trim());
    }
    return [...unique.values()].sort((a, b) => a.localeCompare(b, "es"));
  }, [motos]);

  const visible = useMemo(() => {
    const filtered =
      brand === "todas"
        ? motos
        : motos.filter((m) => normalize(m.brand) === normalize(brand));
    if (sort === "km-asc") {
      // Las motos sin kilometraje registrado van al final.
      return [...filtered].sort(
        (a, b) => (a.mileageKm ?? Infinity) - (b.mileageKm ?? Infinity)
      );
    }
    if (sort === "cc-desc") {
      return [...filtered].sort((a, b) => b.displacementCc - a.displacementCc);
    }
    return filtered;
  }, [motos, brand, sort]);

  if (motos.length === 0) {
    return (
      <div className="frame-marks border border-white/10 bg-brand-charcoal px-6 py-20 text-center">
        <p className="display text-3xl text-white">Sin motos por ahora</p>
        <p className="mt-3 text-sm text-brand-chrome-dim">
          Estamos renovando el inventario. Vuelve pronto o escríbenos y te avisamos.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-y border-white/10 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1 text-brand-chrome-dim">Marca</span>
          <Chip group="marca" active={brand === "todas"} onClick={() => setBrand("todas")}>
            Todas
          </Chip>
          {brands.map((b) => (
            <Chip group="marca" key={b} active={brand === b} onClick={() => setBrand(b)}>
              {b}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1 text-brand-chrome-dim">Orden</span>
          {SORTS.map((s) => (
            <Chip group="orden" key={s.key} active={sort === s.key} onClick={() => setSort(s.key)}>
              {s.label}
            </Chip>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {visible.map((moto, index) => (
            <MotoCard key={moto.id} moto={moto} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-brand-chrome-dim">
          No hay motos de esa marca en este momento.
        </p>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  group,
  children,
}: {
  active: boolean;
  onClick: () => void;
  group: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-3.5 py-1.5 font-condensed text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
        active ? "text-black" : "border border-white/12 text-brand-chrome hover:text-white"
      }`}
    >
      {active && (
        <motion.span
          layoutId={`chip-active-${group}`}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="absolute inset-0 bg-brand-orange"
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}
