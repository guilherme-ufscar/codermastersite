import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-muted">
      <AdminSidebar />
      <div className="lg:ml-64">
        <header className="bg-white border-b border-border px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Painel Administrativo
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {session.user?.name}
              </span>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
