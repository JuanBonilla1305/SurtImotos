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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black px-4">
      <SpeedLines className="absolute right-0 top-1/4 w-1/2 opacity-40" />
      <SpeedLines className="absolute bottom-1/4 left-0 w-1/3 opacity-30" />

      <form
        action={login}
        className="animate-brand-fade-in relative w-full max-w-sm space-y-5 rounded-xl border border-white/10 bg-brand-charcoal p-8 shadow-[0_0_60px_-15px_rgba(245,97,14,0.35)]"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <Logo size={64} />
          <div>
            <p className="font-brand text-xl font-bold uppercase italic text-white">
              Compra<span className="text-brand-orange">venta</span> Surti Motos
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-chrome-dim">
              Panel de administración
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-brand-chrome">
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-brand-chrome">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-brand-orange px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-brand-orange-light brand-glow"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
