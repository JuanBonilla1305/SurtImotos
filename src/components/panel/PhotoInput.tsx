"use client";

import { useRef, useState } from "react";

export default function PhotoInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  function handleFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? []);
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
          Puedes seleccionar varias fotos de una vez desde tu galería o cámara
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
