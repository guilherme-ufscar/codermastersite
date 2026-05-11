import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ClienteDashboard() {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  let stats = { pendingInvoices: 0, openTickets: 0 };
  let limits: any = null;

  try {
    const [invoices, tickets, hostingLimits] = await Promise.all([
      prisma.invoice.count({ where: { userId, status: "PENDING" } }),
      prisma.ticket.count({ where: { userId, status: { in: ["OPEN", "IN_PROGRESS"] } } }),
      prisma.clientHostingLimits.findUnique({ where: { userId } }),
    ]);
    stats = { pendingInvoices: invoices, openTickets: tickets };
    limits = hostingLimits;
  } catch {}

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Olá, {session?.user?.name}!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link
          href="/cliente/faturas"
          className="bg-white rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
        >
          <p className="text-sm text-muted-foreground">Faturas Pendentes</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            {stats.pendingInvoices}
          </p>
        </Link>
        <Link
          href="/cliente/tickets"
          className="bg-white rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
        >
          <p className="text-sm text-muted-foreground">Tickets Abertos</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            {stats.openTickets}
          </p>
        </Link>
        <Link
          href="/cliente/hospedagem"
          className="bg-white rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
        >
          <p className="text-sm text-muted-foreground">Hospedagem</p>
          <p className="text-lg font-bold text-foreground mt-1">
            {limits ? "Ver Limites" : "Sem plano"}
          </p>
        </Link>
      </div>

      {limits && (
        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">Seus Limites de Hospedagem</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Emails</p>
              <p className="text-lg font-bold text-foreground">{limits.maxEmails}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Bancos de Dados</p>
              <p className="text-lg font-bold text-foreground">{limits.maxDatabases}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sites</p>
              <p className="text-lg font-bold text-foreground">{limits.maxSites}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Disco</p>
              <p className="text-lg font-bold text-foreground">{limits.diskSpaceMB} MB</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Banda</p>
              <p className="text-lg font-bold text-foreground">{limits.bandwidthGB} GB</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
