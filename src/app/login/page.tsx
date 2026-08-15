import Link from "next/link";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import Logo from "@/components/brand/Logo";
import SpeedLines from "@/components/brand/SpeedLines";

async function login(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/panel",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error("Credenciales inválidas");
    }
    throw error;
  }
}

export default function LoginPage() {
  return (
    <div className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black px-4 py-12">
      <div className="grid-floor pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/15 blur-[130px] animate-glow-breathe" />

      <SpeedLines className="pointer-events-none absolute right-0 top-1/4 w-1/2 opacity-30" />
      <SpeedLines className="pointer-events-none absolute bottom-1/4 left-0 w-1/3 origin-center scale-x-[-1] opacity-25" />

      <div className="animate-brand-fade-in relative w-full max-w-sm">
        <div className="hazard h-[3px] opacity-90" />

        <form
          action={login}
          className="frame-marks space-y-6 border border-white/10 bg-brand-charcoal/90 p-8 backdrop-blur"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <Logo size={64} />
            <div>
              <p className="display text-2xl text-white">
                Surti<span className="text-brand-orange">motos</span>
              </p>
              <p className="eyebrow mt-2 text-brand-chrome-dim">Panel de administración</p>
            </div>
          </div>

          <div className="rule-glow" />

          <div className="space-y-1.5">
            <label htmlFor="email" className="panel-label">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="panel-input"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="panel-label">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="panel-input"
            />
          </div>

          <button type="submit" className="btn-signal w-full">
            Entrar
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 block text-center font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-brand-chrome-dim transition-colors hover:text-brand-orange"
        >
          ← Volver al sitio
        </Link>
      </div>
    </div>
  );
}
