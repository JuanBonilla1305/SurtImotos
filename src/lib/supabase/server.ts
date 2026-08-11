import { createClient } from "@supabase/supabase-js";

export { MOTORCYCLE_PHOTOS_BUCKET } from "./bucket";

/**
 * Cliente con la service_role key: solo se usa en el servidor (API routes,
 * server actions). Nunca debe importarse desde código que corra en el navegador.
 */
export function createServiceRoleClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
