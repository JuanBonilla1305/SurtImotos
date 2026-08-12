import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import PanelSidebar from "@/components/panel/PanelSidebar";
import SplashOverlay from "@/components/brand/SplashOverlay";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className="panel-shell flex min-h-screen flex-col lg:flex-row">
      <SplashOverlay />
      <PanelSidebar userEmail={session.user.email ?? ""} onSignOut={handleSignOut} />
      <main className="flex-1 p-4 sm:p-8">{children}</main>
    </div>
  );
}
