import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userName = session.user?.name || "Cliente";

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-white border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/cliente" className="flex items-center gap-2">
              <Image src="/favicon.svg" alt="Coder Master" width={28} height={28} />
              <span className="text-lg font-bold text-primary">Área do Cliente</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/cliente" className="text-sm font-medium text-foreground/80 hover:text-primary">
                Dashboard
              </Link>
              <Link href="/cliente/faturas" className="text-sm font-medium text-foreground/80 hover:text-primary">
                Faturas
              </Link>
              <Link href="/cliente/tickets" className="text-sm font-medium text-foreground/80 hover:text-primary">
                Tickets
              </Link>
              <Link href="/cliente/hospedagem" className="text-sm font-medium text-foreground/80 hover:text-primary">
                Hospedagem
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{userName}</span>
              <Link href="/" className="text-xs text-primary hover:text-primary-light">
                Sair
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
