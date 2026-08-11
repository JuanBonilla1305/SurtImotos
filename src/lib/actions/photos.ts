"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createSignedUploadTargets } from "@/lib/supabase/photos";

export async function requestPhotoUploadUrls(fileNames: string[]) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return createSignedUploadTargets(fileNames);
}
