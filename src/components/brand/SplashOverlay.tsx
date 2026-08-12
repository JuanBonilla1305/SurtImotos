"use client";

import { useEffect, useState } from "react";
import SplashLoader from "./SplashLoader";

export default function SplashOverlay() {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1200);
    const unmountTimer = setTimeout(() => setMounted(false), 1500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-brand-black transition-opacity duration-300 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <SplashLoader label="Cargando" />
    </div>
  );
}
