"use client";

import { useMemo, useState } from "react";
import PhotoInput from "@/components/panel/PhotoInput";
import SpinInput from "@/components/panel/SpinInput";
import Combobox from "@/components/panel/Combobox";
import MotoLoader from "@/components/brand/MotoLoader";
import { MOTO_BRANDS, modelsForBrand } from "@/lib/moto-catalog";

type MotorcycleFormValues = {
  brand?: string;
  model?: string;
  year?: number;
  displacementCc?: number;
  plate?: string;
  color?: string | null;
  mileageKm?: number | null;
  description?: string | null;
};

export default function MotorcycleForm({
  action,
  defaultValues,
  spinFrameCount = 0,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: MotorcycleFormValues;
  spinFrameCount?: number;
}) {
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [buildingSpin, setBuildingSpin] = useState(false);
  const uploading = uploadingPhotos || buildingSpin;

  const [brand, setBrand] = useState(defaultValues?.brand ?? "");
  const [model, setModel] = useState(defaultValues?.model ?? "");

  const modelOptions = useMemo(() => modelsForBrand(brand), [brand]);

  return (
    <form action={action} className="max-w-3xl space-y-5">
      <Section title="Identificación" step="01">
        <Field label="Marca *">
          <Combobox
            name="brand"
            required
            options={MOTO_BRANDS}
            value={brand}
            onValueChange={(next) => {
              setBrand(next);
              // Cambiar de marca deja una línea que ya no corresponde.
              if (model && !modelsForBrand(next).includes(model)) setModel("");
            }}
            placeholder="Escribe y elige…"
          />
        </Field>
        <Field label="Línea / Modelo *">
          <Combobox
            name="model"
            required
            options={modelOptions}
            value={model}
            onValueChange={setModel}
            placeholder="Escribe y elige…"
            emptyHint={
              brand && modelOptions.length === 0
                ? "No tenemos líneas guardadas de esa marca: escríbela a mano."
                : undefined
            }
          />
        </Field>
        <Field label="Placa *">
          <input name="plate" required defaultValue={defaultValues?.plate} className="panel-input" />
        </Field>
        <Field label="Color">
          <input name="color" defaultValue={defaultValues?.color ?? ""} className="panel-input" />
        </Field>
      </Section>

      <Section title="Especificaciones" step="02">
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
        <Field label="Kilometraje">
          <input
            name="mileageKm"
            type="number"
            defaultValue={defaultValues?.mileageKm ?? ""}
            className="panel-input"
          />
        </Field>
      </Section>

      <Section title="Publicación" step="03" full>
        <Field label="Descripción">
          <textarea
            name="description"
            defaultValue={defaultValues?.description ?? ""}
            rows={3}
            className="panel-textarea"
          />
        </Field>

        <Field label="Fotos">
          <PhotoInput onUploadingChange={setUploadingPhotos} />
        </Field>
      </Section>

      <Section title="Vista 360" step="04" full>
        <Field label="Video girando alrededor de la moto">
          <SpinInput existingCount={spinFrameCount} onWorkingChange={setBuildingSpin} />
        </Field>
      </Section>

      <button
        type="submit"
        disabled={uploading}
        className="panel-btn-primary disabled:opacity-50"
      >
        {uploading && <MotoLoader size={20} />}
        {uploading ? "Procesando archivos..." : "Guardar"}
      </button>
    </form>
  );
}

function Section({
  title,
  step,
  full = false,
  children,
}: {
  title: string;
  step: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="panel-card p-5">
      <legend className="flex items-center gap-2.5 px-2">
        <span className="font-mono text-[11px] font-bold text-brand-orange">{step}</span>
        <span className="font-condensed text-sm font-bold uppercase tracking-[0.18em] text-white">
          {title}
        </span>
      </legend>

      <div className={`mt-3 grid gap-4 ${full ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        {children}
      </div>
    </fieldset>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="panel-label">{label}</label>
      {children}
    </div>
  );
}
