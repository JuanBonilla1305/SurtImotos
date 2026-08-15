"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { normalize } from "@/lib/moto-catalog";

const MAX_SUGGESTIONS = 8;

/**
 * Campo de texto con sugerencias. Nunca bloquea lo que se escribe: si la moto
 * no está en el banco, se escribe a mano y se guarda igual.
 */
export default function Combobox({
  name,
  options,
  value,
  onValueChange,
  placeholder,
  required = false,
  emptyHint,
}: {
  name: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  emptyHint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const matches = useMemo(() => {
    const query = normalize(value);
    if (!query) return options.slice(0, MAX_SUGGESTIONS);

    const starts: string[] = [];
    const contains: string[] = [];

    for (const option of options) {
      const target = normalize(option);
      if (target === query) continue;
      if (target.startsWith(query)) starts.push(option);
      else if (target.includes(query)) contains.push(option);
    }

    return [...starts, ...contains].slice(0, MAX_SUGGESTIONS);
  }, [options, value]);

  // Cerrar al hacer clic fuera.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function choose(option: string) {
    onValueChange(option);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }

    if (!open || matches.length === 0) {
      if (e.key === "ArrowDown") setOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + matches.length) % matches.length);
    } else if (e.key === "Enter") {
      // Solo intercepta Enter si hay una sugerencia resaltada, para no
      // impedir el envío normal del formulario.
      e.preventDefault();
      choose(matches[highlight] ?? value);
    }
  }

  const showList = open && matches.length > 0;

  return (
    <div ref={wrapperRef} className="relative">
      <input
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        className="panel-input"
        onChange={(e) => {
          onValueChange(e.target.value);
          setHighlight(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto border border-white/15 bg-brand-charcoal shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)]"
        >
          {matches.map((option, i) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={i === highlight}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => choose(option)}
                className={`block w-full px-3 py-2 text-left font-condensed text-sm font-medium uppercase tracking-wide transition-colors ${
                  i === highlight
                    ? "bg-brand-orange text-black"
                    : "text-brand-chrome hover:text-white"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}

      {emptyHint && !showList && (
        <p className="panel-muted mt-1 text-xs">{emptyHint}</p>
      )}
    </div>
  );
}
