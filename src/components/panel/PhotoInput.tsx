"use client";

import { useEffect, useRef, useState } from "react";
import { requestPhotoUploadUrls } from "@/lib/actions/photos";
import { supabaseBrowser } from "@/lib/supabase/browserClient";
import { MOTORCYCLE_PHOTOS_BUCKET } from "@/lib/supabase/bucket";

const MAX_FILE_MB = 15;

type UploadedPhoto = {
  previewUrl: string;
  publicUrl: string | null;
  status: "uploading" | "done" | "error";
  errorMessage?: string;
};

export default function PhotoInput({
  onUploadingChange,
}: {
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);

  async function handleFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? []);
    if (files.length === 0) return;

    const entries: UploadedPhoto[] = files.map((file) => ({
      previewUrl: URL.createObjectURL(file),
      publicUrl: null,
      status: file.size > MAX_FILE_MB * 1024 * 1024 ? "error" : "uploading",
      errorMessage:
        file.size > MAX_FILE_MB * 1024 * 1024
          ? `Pesa más de ${MAX_FILE_MB}MB`
          : undefined,
    }));

    setPhotos((prev) => [...prev, ...entries]);
    const startIndex = photos.length;

    const uploadable = files
      .map((file, i) => ({ file, i }))
      .filter(({ file }) => file.size <= MAX_FILE_MB * 1024 * 1024);

    if (uploadable.length === 0) return;

    try {
      const targets = await requestPhotoUploadUrls(uploadable.map(({ file }) => file.name));

      await Promise.all(
        uploadable.map(async ({ file, i }, targetIndex) => {
          const target = targets[targetIndex];
          try {
            const { error } = await supabaseBrowser.storage
              .from(MOTORCYCLE_PHOTOS_BUCKET)
              .uploadToSignedUrl(target.path, target.token, file);

            setPhotos((prev) => {
              const next = [...prev];
              next[startIndex + i] = error
                ? { ...next[startIndex + i], status: "error", errorMessage: "Error al subir" }
                : { ...next[startIndex + i], status: "done", publicUrl: target.publicUrl };
              return next;
            });
          } catch {
            setPhotos((prev) => {
              const next = [...prev];
              next[startIndex + i] = {
                ...next[startIndex + i],
                status: "error",
                errorMessage: "Error al subir",
              };
              return next;
            });
          }
        })
      );
    } catch {
      setPhotos((prev) =>
        prev.map((p, idx) =>
          idx >= startIndex && p.status === "uploading"
            ? { ...p, status: "error", errorMessage: "Error al subir" }
            : p
        )
      );
    }
  }

  const uploadingCount = photos.filter((p) => p.status === "uploading").length;

  useEffect(() => {
    onUploadingChange?.(uploadingCount > 0);
  }, [uploadingCount, onUploadingChange]);

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
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {uploadingCount > 0 && (
        <p className="mt-2 text-sm text-brand-orange">
          Subiendo {uploadingCount} foto{uploadingCount === 1 ? "" : "s"}...
        </p>
      )}

      {photos.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {photos.map((photo, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-md border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.previewUrl} alt="" className="h-full w-full object-cover" />
              {photo.status === "uploading" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs text-white">
                  ⏳
                </div>
              )}
              {photo.status === "error" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-1 text-center text-[10px] text-red-300">
                  {photo.errorMessage ?? "Error"}
                </div>
              )}
              {photo.publicUrl && (
                <input type="hidden" name="photoUrls" value={photo.publicUrl} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
