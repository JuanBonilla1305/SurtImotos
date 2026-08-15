"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RunningMoto from "@/components/brand/RunningMoto";
import SpeedLines from "@/components/brand/SpeedLines";
import Counter from "@/components/public/Counter";

const EASE = [0.16, 1, 0.3, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.09 },
  }),
};

export default function Hero({ availableCount }: { availableCount: number }) {
  return (
    <section className="grain relative flex min-h-[94svh] flex-col justify-center overflow-hidden pt-28 pb-10">
      {/* Fondo por capas */}
      <div className="grid-floor pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-brand-orange/20 blur-[130px] animate-glow-breathe" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-orange/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-black to-transparent" />

      <SpeedLines className="pointer-events-none absolute left-0 top-[26%] hidden w-1/3 opacity-40 lg:block" />
      <SpeedLines className="pointer-events-none absolute right-0 top-[70%] hidden w-1/4 origin-center scale-x-[-1] opacity-30 lg:block" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              custom={0}
              variants={rise}
              initial="hidden"
              animate="show"
              className="flex items-center gap-3"
            >
              <span className="h-2 w-2 animate-blink bg-brand-orange" />
              <p className="eyebrow text-brand-chrome-dim">
                Compraventa · Ibagué, Tolima
              </p>
            </motion.div>

            <h1 className="mt-5 select-none">
              <motion.span
                custom={1}
                variants={rise}
                initial="hidden"
                animate="show"
                className="display block text-[16vw] text-white sm:text-[11vw] lg:text-[7.5rem]"
              >
                Compra.
              </motion.span>
              <motion.span
                custom={2}
                variants={rise}
                initial="hidden"
                animate="show"
                className="display block pl-[6vw] text-[16vw] text-brand-chrome-dim sm:text-[11vw] lg:pl-16 lg:text-[7.5rem]"
              >
                Vende.
              </motion.span>
              <motion.span
                custom={3}
                variants={rise}
                initial="hidden"
                animate="show"
                className="display block text-[16vw] text-brand-orange sm:text-[11vw] lg:text-[7.5rem]"
                style={{ textShadow: "0 0 60px rgba(245,97,14,0.45)" }}
              >
                Rueda.
              </motion.span>
            </h1>

            <motion.p
              custom={4}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 max-w-md text-base leading-relaxed text-brand-chrome-dim sm:text-lg"
            >
              Motos revisadas, papeles al día y trato directo. Elige la tuya del catálogo
              o tráenos la que tienes: te la avaluamos el mismo día.
            </motion.p>

            <motion.div
              custom={5}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link href="#catalogo" className="btn-signal">
                Ver catálogo
                <span aria-hidden>→</span>
              </Link>
              <Link href="#vender" className="btn-ghost">
                Vende tu moto
              </Link>
            </motion.div>
          </div>

          {/* Moto en movimiento */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
            className="relative flex justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 scale-125 rounded-full bg-brand-orange/25 blur-[80px]" />
              <div className="relative w-[300px] sm:w-[380px] lg:w-[420px]">
                <RunningMotoResponsive />
              </div>
              <div className="splash-road relative mx-auto mt-2 h-[2px] w-4/5 opacity-70" />
            </div>
          </motion.div>
        </div>

        {/* Barra de datos */}
        <motion.div
          custom={7}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-14 grid grid-cols-2 divide-x divide-white/10 border-y border-white/10 sm:grid-cols-4"
        >
          <Stat value={<Counter to={availableCount} />} label="Motos disponibles" />
          <Stat value={<Counter to={100} suffix="%" />} label="Papeles verificados" />
          <Stat value="24h" label="Avalúo y respuesta" />
          <Stat value="Ibagué" label="Local propio" />
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="pointer-events-none absolute inset-x-0 bottom-4 hidden justify-center lg:flex"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow text-brand-chrome-dim">Desliza</span>
          <div className="h-10 w-px overflow-hidden bg-white/15">
            <div className="animate-scan h-3 w-px bg-brand-orange" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function RunningMotoResponsive() {
  return (
    <>
      <div className="sm:hidden">
        <RunningMoto width={300} />
      </div>
      <div className="hidden sm:block lg:hidden">
        <RunningMoto width={380} />
      </div>
      <div className="hidden lg:block">
        <RunningMoto width={420} />
      </div>
    </>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="px-4 py-5 text-center sm:px-6 sm:text-left">
      <p className="display text-3xl text-white sm:text-4xl">{value}</p>
      <p className="eyebrow mt-1.5 text-brand-chrome-dim">{label}</p>
    </div>
  );
}
