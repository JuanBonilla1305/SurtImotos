"use client";

import { useState } from "react";
import PhotoInput from "@/components/panel/PhotoInput";
import MotoLoader from "@/components/brand/MotoLoader";

type Client = { id: string; name: string };

type MotorcycleFormValues = {
  brand?: string;
  model?: string;
  year?: number;
  displacementCc?: number;
  plate?: string;
  chassisNumber?: string;
  engineNumber?: string | null;
  color?: string | null;
  mileageKm?: number | null;
  purchasePrice?: unknown;
  salePrice?: unknown;
  description?: string | null;
  supplierId?: string | null;
};

export default function MotorcycleForm({
  action,
  defaultValues,
  suppliers,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: MotorcycleFormValues;
  suppliers: Client[];
}) {
  const [uploading, setUploading] = useState(false);

  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Marca *">
          <input name="brand" required defaultValue={defaultValues?.brand} className="panel-input" />
        </Field>
        <Field label="Línea / Modelo *">
          <input name="model" required defaultValue={defaultValues?.model} className="panel-input" />
        </Field>
        <Field label="Año *">
          <input
            name="year"
            type="number"
            required
            defaultValue={defaultValues?.year}
            className="panel-input"
          />
        </Field>
        <Field label="Cilindraje (cc) *">
          <input
            name="displacementCc"
            type="number"
            required
            defaultValue={defaultValues?.displacementCc}
            className="panel-input"
          />
        </Field>
        <Field label="Placa *">
          <input name="plate" required defaultValue={defaultValues?.plate} className="panel-input" />
        </Field>
        <Field label="Chasis *">
          <input
            name="chassisNumber"
            required
            defaultValue={defaultValues?.chassisNumber}
            className="panel-input"
          />
        </Field>
        <Field label="Número de motor">
          <input
            name="engineNumber"
            defaultValue={defaultValues?.engineNumber ?? ""}
            className="panel-input"
          />
        </Field>
        <Field label="Color">
          <input name="color" defaultValue={defaultValues?.color ?? ""} className="panel-input" />
        </Field>
        <Field label="Kilometraje">
          <input
            name="mileageKm"
            type="number"
            defaultValue={defaultValues?.mileageKm ?? ""}
            className="panel-input"
          />
        </Field>
        <Field label="Precio de compra">
          <input
            name="purchasePrice"
            type="number"
            step="0.01"
            defaultValue={
              defaultValues?.purchasePrice != null
                ? String(defaultValues.purchasePrice)
                : ""
            }
            className="panel-input"
          />
        </Field>
        <Field label="Precio de venta *">
          <input
            name="salePrice"
            type="number"
            step="0.01"
            required
            defaultValue={
              defaultValues?.salePrice != null ? String(defaultValues.salePrice) : ""
            }
            className="panel-input"
          />
        </Field>
        <Field label="Proveedor (de quien se compró)">
          <select
            name="supplierId"
            defaultValue={defaultValues?.supplierId ?? ""}
            className="panel-select"
          >
            <option value="">— Sin especificar —</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Descripción">
        <textarea
          name="description"
          defaultValue={defaultValues?.description ?? ""}
          rows={3}
          className="panel-textarea"
        />
      </Field>

      <Field label="Fotos">
        <PhotoInput onUploadingChange={setUploading} />
      </Field>

      <button
        type="submit"
        disabled={uploading}
        className="panel-btn-primary inline-flex items-center gap-2 disabled:opacity-50"
      >
        {uploading && <MotoLoader size={20} />}
        {uploading ? "Subiendo fotos..." : "Guardar"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="panel-label">{label}</label>
      {children}
    </div>
  );
}
