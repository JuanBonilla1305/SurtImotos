import { createServiceRoleClient, MOTORCYCLE_PHOTOS_BUCKET } from "./server";

export async function uploadMotorcyclePhoto(
  motorcycleId: string,
  file: File
): Promise<string> {
  const supabase = createServiceRoleClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${motorcycleId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(MOTORCYCLE_PHOTOS_BUCKET)
    .upload(path, file, { contentType: file.type });

  if (error) throw error;

  const { data } = supabase.storage
    .from(MOTORCYCLE_PHOTOS_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function deleteMotorcyclePhoto(url: string) {
  const supabase = createServiceRoleClient();
  const marker = `/${MOTORCYCLE_PHOTOS_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = url.slice(idx + marker.length);

  await supabase.storage.from(MOTORCYCLE_PHOTOS_BUCKET).remove([path]);
}
