"use client";

import { useEffect, useRef, useState } from "react";
import { requestPhotoUploadUrls } from "@/lib/actions/photos";
import { supabaseBrowser } from "@/lib/supabase/browserClient";
import { MOTORCYCLE_PHOTOS_BUCKET } from "@/lib/supabase/bucket";
import { extractVideoFrames } from "@/lib/media";
import MotoLoader from "@/components/brand/MotoLoader";

const FRAME_COUNT = 32;
const FRAME_MAX_SIZE = 1200;
const UPLOAD_BATCH = 4;

type Phase = "idle" | "extrayendo" | "subiendo" | "listo" | "error";

export default function SpinInput({
  existingCount = 0,
  onWorkingChange,
}: {
  existingCount?: number;
  onWorkingChange?: (working: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState({ done: 0, total: FRAME_COUNT });
  const [urls, setUrls] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);

  const working = phase === "extrayendo" || phase === "subiendo";

  useEffect(() => {
    onWorkingChange?.(working);
  }, [working, onWorkingChange]);

  // Las vistas previas son object URLs: hay que liberarlas al desmontar.
  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  // Cronómetro visible: sin él no hay forma de saber si va lento o se atascó.
  useEffect(() => {
    if (!working) return;
    const started = Date.now();
    const timer = setInterval(() => setSeconds(Math.round((Date.now() - started) / 1000)), 500);
    return () => clearInterval(timer);
  }, [working]);

  async function handleVideo(file: File | undefined) {
    if (!file) return;

    setMessage(null);
    setUrls([]);
    setPhase("extrayendo");
    setProgress({ done: 0, total: FRAME_COUNT });

    let frames: Blob[];
    try {
      frames = await extractVideoFrames(file, FRAME_COUNT, FRAME_MAX_SIZE, (done, total) =>
        setProgress({ done, total })
      );
    } catch (error) {
      setPhase("error");
      setMessage(
        error instanceof Error ? error.message : "No se pudieron extraer los cuadros"
      );
      return;
    }

    setPreviews(frames.map((f) => URL.createObjectURL(f)));

    setPhase("subiendo");
    setProgress({ done: 0, total: frames.length });

    try {
      const targets = await requestPhotoUploadUrls(
        frames.map((_, i) => `giro-${String(i).padStart(3, "0")}.jpg`)
      );

      const uploaded: string[] = new Array(frames.length);

      for (let start = 0; start < frames.length; start += UPLOAD_BATCH) {
        const batch = frames.slice(start, start + UPLOAD_BATCH);

        await Promise.all(
          batch.map(async (blob, offset) => {
            const index = start + offset;
            const target = targets[index];
            const { error } = await supabaseBrowser.storage
              .from(MOTORCYCLE_PHOTOS_BUCKET)
              .uploadToSignedUrl(target.path, target.token, blob);

            if (error) throw error;
            uploaded[index] = target.publicUrl;
          })
        );

        setProgress({ done: Math.min(start + UPLOAD_BATCH, frames.length), total: frames.length });
      }

      setUrls(uploaded);
      setPhase("listo");
    } catch {
      setPhase("error");
      setMessage("Error al subir los cuadros. Revisa la conexión e inténtalo de nuevo.");
    }
  }

  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={working}
        className="panel-btn-secondary w-full border-dashed py-6 text-center disabled:opacity-50"
      >
        🎥 Subir video girando alrededor de la moto
        <span className="panel-muted mt-1 block text-xs normal-case tracking-normal">
          Da una vuelta completa en unos 10 segundos, a distancia y altura constantes. Se
          extraen {FRAME_COUNT} cuadros automáticamente.
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          handleVideo(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {working && (
        <div className="mt-4 flex items-center gap-3">
          <MotoLoader size={40} />
          <div className="flex-1">
            <p className="text-sm text-brand-orange">
              {phase === "extrayendo" ? "Extrayendo cuadros" : "Subiendo cuadros"} · {pct}%
              <span className="panel-muted ml-2 tabular-nums">{seconds}s</span>
            </p>
            <div className="mt-1.5 h-[5px] overflow-hidden bg-white/10">
              <div
                className="h-full bg-brand-orange transition-[width] duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {phase === "error" && message && (
        <p className="mt-3 border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {message}
        </p>
      )}

      {phase === "listo" && (
        <p className="mt-3 text-sm text-green-400">
          {urls.length} cuadros listos en {seconds}s. Guarda la moto para publicar el giro.
        </p>
      )}

      {phase === "idle" && existingCount > 0 && (
        <p className="panel-muted mt-3 text-sm">
          Esta moto ya tiene un giro de {existingCount} cuadros. Si subes otro video, el
          giro anterior se reemplaza.
        </p>
      )}

      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-8 gap-1">
          {previews.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={url}
              alt=""
              className="aspect-square w-full border border-white/10 bg-black/30 object-contain"
            />
          ))}
        </div>
      )}

      {urls.map((url) => (
        <input key={url} type="hidden" name="spinUrls" value={url} />
      ))}
    </div>
  );
}
