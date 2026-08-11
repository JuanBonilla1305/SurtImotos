"use client";

import { useRef, useState } from "react";

const MAX_FILE_MB = 15;

export default function PhotoInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [warning, setWarning] = useState<string | null>(null);

  function handleFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? []);

    const tooLarge = files.filter((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    setWarning(
      tooLarge.length > 0
        ? `${tooLarge.length === 1 ? "Esta foto pesa" : "Estas fotos pesan"} más de ${MAX_FILE_MB}MB y no se podrá${tooLarge.length === 1 ? "" : "n"} subir: ${tooLarge.map((f) => f.name).join(", ")}`
        : null
    );

    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return files.map((file) => URL.createObjectURL(file));
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="panel-btn-secondary w-full border-dashed py-6 text-center"
      >
        📷 Toca para elegir una o varias fotos
        <span className="panel-muted block text-xs">
          Puedes seleccionar varias fotos de una vez desde tu galería o cámara (máx.{" "}
          {MAX_FILE_MB}MB por foto)
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        name="photos"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {warning && <p className="mt-2 text-sm text-red-400">{warning}</p>}

      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {previews.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt=""
              className="aspect-square rounded-md border border-white/10 object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
