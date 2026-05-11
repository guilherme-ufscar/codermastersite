import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getStats() {
  try {
    const [clients, posts, tickets, invoices] = await Promise.all([
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.blogPost.count(),
      prisma.ticket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
      prisma.invoice.count({ where: { status: "PENDING" } }),
    ]);
    return { clients, posts, tickets, invoices };
  } catch {
    return { clients: 0, posts: 0, tickets: 0, invoices: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Clientes", value: stats.clients, href: "/admin/clientes", color: "bg-blue-500" },
    { label: "Posts", value: stats.posts, href: "/admin/blog", color: "bg-green-500" },
    { label: "Tickets Abertos", value: stats.tickets, href: "/admin/tickets", color: "bg-orange-500" },
    { label: "Faturas Pendentes", value: stats.invoices, href: "/admin/financeiro", color: "bg-red-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${card.color} opacity-20`} />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">Ações Rápidas</h3>
          <div className="space-y-2">
            <Link
              href="/admin/blog?new=true"
              className="block px-4 py-3 rounded-lg bg-muted hover:bg-primary/5 text-sm font-medium text-foreground transition-colors"
            >
              + Novo Post no Blog
            </Link>
            <Link
              href="/admin/clientes?new=true"
              className="block px-4 py-3 rounded-lg bg-muted hover:bg-primary/5 text-sm font-medium text-foreground transition-colors"
            >
              + Novo Cliente
            </Link>
            <Link
              href="/admin/portfolio?new=true"
              className="block px-4 py-3 rounded-lg bg-muted hover:bg-primary/5 text-sm font-medium text-foreground transition-colors"
            >
              + Novo Item no Portfólio
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">Resumo</h3>
          <p className="text-sm text-muted-foreground">
            Bem-vindo ao painel administrativo da Coder Master. Use o menu
            lateral para navegar entre os módulos.
          </p>
        </div>
      </div>
    </div>
  );
}
