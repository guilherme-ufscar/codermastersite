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
    {
      label: "Clientes",
      value: stats.clients,
      href: "/admin/clientes",
      color: "bg-blue-500",
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      label: "Posts",
      value: stats.posts,
      href: "/admin/blog",
      color: "bg-green-500",
      icon: (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      label: "Tickets Abertos",
      value: stats.tickets,
      href: "/admin/tickets",
      color: "bg-orange-500",
      icon: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
        </svg>
      ),
    },
    {
      label: "Faturas Pendentes",
      value: stats.invoices,
      href: "/admin/financeiro",
      color: "bg-red-500",
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
    },
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
              <div className={`w-10 h-10 rounded-lg ${card.color}/10 flex items-center justify-center`}>
                {card.icon}
              </div>
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
