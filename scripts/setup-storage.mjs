import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const BUCKET = "moto-fotos";

const { data: buckets, error: listError } = await supabase.storage.listBuckets();
if (listError) throw listError;

if (buckets.some((b) => b.name === BUCKET)) {
  console.log(`Bucket "${BUCKET}" ya existe.`);
} else {
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: "5MB",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
  });
  if (error) throw error;
  console.log(`Bucket "${BUCKET}" creado (público, para fotos de motos).`);
}
