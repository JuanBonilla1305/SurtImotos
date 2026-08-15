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

      <main className="relative min-w-0 flex-1 p-4 sm:p-8">
        <div className="grid-floor pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40" />
        <div className="relative">{children}</div>
      </main>
    </div>
  );
}
