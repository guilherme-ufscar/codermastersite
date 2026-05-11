"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/tickets")
      .then((r) => r.json())
      .then(setTickets)
      .catch(() => {});
  }, []);

  const statusLabels: Record<string, string> = {
    OPEN: "Aberto",
    IN_PROGRESS: "Em Andamento",
    AWAITING_CLIENT: "Aguardando Cliente",
    RESOLVED: "Resolvido",
    CLOSED: "Fechado",
  };

  const statusStyles: Record<string, string> = {
    OPEN: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    AWAITING_CLIENT: "bg-purple-100 text-purple-700",
    RESOLVED: "bg-green-100 text-green-700",
    CLOSED: "bg-gray-100 text-gray-700",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Tickets</h1>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {tickets.length === 0 ? (
          <p className="p-6 text-center text-muted-foreground">
            Nenhum ticket aberto.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Assunto</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Cliente</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Categoria</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Msgs</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {ticket.user?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {ticket.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${statusStyles[ticket.status]}`}>
                      {statusLabels[ticket.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {ticket._count?.messages || 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/tickets/${ticket.id}`}
                      className="text-sm text-primary hover:text-primary-light font-medium"
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
