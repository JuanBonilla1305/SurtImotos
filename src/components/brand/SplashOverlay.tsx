"use client";

import { useEffect, useState } from "react";
import SplashLoader from "./SplashLoader";

export default function SplashOverlay() {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1100);
    const unmountTimer = setTimeout(() => setMounted(false), 1500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`grain fixed inset-0 z-[100] flex items-center justify-center bg-brand-black transition-all duration-400 ${
        fading ? "scale-105 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-brand-orange/15 blur-[110px]" />
      <div className="relative">
        <SplashLoader label="Cargando" />
      </div>
    </div>
  );
}
