"use client";

import { useState } from "react";

type Moto = {
  id: string;
  brand: string;
  model: string;
  plate: string;
  chassisNumber: string;
  engineNumber: string | null;
};

const LINKS = [
  {
    name: "RUNT",
    description: "Consultas y trámites del Registro Único Nacional de Tránsito.",
    url: "https://www.runt.com.co/",
  },
  {
    name: "SIMIT",
    description: "Consulta y pago de multas de tránsito.",
    url: "https://www.simit.org.co/",
  },
  {
    name: "Gobernación del Tolima",
    description: "Pago de impuesto vehicular en el Tolima.",
    url: "https://www.tolima.gov.co/",
  },
  {
    name: "Secretaría de Tránsito de Ibagué",
    description: "Trámites y consultas de tránsito municipales.",
    url: "https://www.ibague.gov.co/",
  },
];

export default function TramitesPanel({ motorcycles }: { motorcycles: Moto[] }) {
  const [selectedId, setSelectedId] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const selected = motorcycles.find((m) => m.id === selectedId);

  function copy(label: string, value: string) {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="panel-card p-4">
        <label className="panel-label">Moto para copiar datos rápidamente</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="panel-select mt-2 max-w-sm"
        >
          <option value="">— Selecciona una moto —</option>
          {motorcycles.map((m) => (
            <option key={m.id} value={m.id}>
              {m.brand} {m.model} · Placa {m.plate}
            </option>
          ))}
        </select>

        {selected && (
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton
              label="Placa"
              value={selected.plate}
              copied={copied === "Placa"}
              onCopy={copy}
            />
            <CopyButton
              label="Chasis"
              value={selected.chassisNumber}
              copied={copied === "Chasis"}
              onCopy={copy}
            />
            {selected.engineNumber && (
              <CopyButton
                label="Motor"
                value={selected.engineNumber}
                copied={copied === "Motor"}
                onCopy={copy}
              />
            )}
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="panel-card block p-4 transition hover:border-brand-orange/40"
          >
            <p className="panel-heading font-medium">{link.name} ↗</p>
            <p className="panel-muted mt-1 text-sm">{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function CopyButton({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: (label: string, value: string) => void;
}) {
  return (
    <button type="button" onClick={() => onCopy(label, value)} className="panel-btn-secondary">
      {copied ? "¡Copiado!" : `Copiar ${label}: ${value}`}
    </button>
  );
}
