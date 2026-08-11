import { createServiceRoleClient } from "./server";
import { MOTORCYCLE_PHOTOS_BUCKET } from "./bucket";

export async function createSignedUploadTargets(fileNames: string[]) {
  const supabase = createServiceRoleClient();

  return Promise.all(
    fileNames.map(async (name) => {
      const ext = name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;

      const { data, error } = await supabase.storage
        .from(MOTORCYCLE_PHOTOS_BUCKET)
        .createSignedUploadUrl(path);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from(MOTORCYCLE_PHOTOS_BUCKET)
        .getPublicUrl(path);

      return { path, token: data.token, publicUrl: publicUrlData.publicUrl };
    })
  );
}

export async function deleteMotorcyclePhoto(url: string) {
  const supabase = createServiceRoleClient();
  const marker = `/${MOTORCYCLE_PHOTOS_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = url.slice(idx + marker.length);

  await supabase.storage.from(MOTORCYCLE_PHOTOS_BUCKET).remove([path]);
}
