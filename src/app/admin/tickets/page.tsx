"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: { name: string; email: string } | null;
  _count: { messages: number };
}

const STATUS_OPTIONS = [
  { value: "OPEN", label: "Aberto" },
  { value: "IN_PROGRESS", label: "Em Andamento" },
  { value: "AWAITING_CLIENT", label: "Aguardando Cliente" },
  { value: "RESOLVED", label: "Resolvido" },
  { value: "CLOSED", label: "Fechado" },
];

const statusStyles: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  AWAITING_CLIENT: "bg-purple-100 text-purple-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-700",
};

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [changingStatus, setChangingStatus] = useState<string | null>(null);
  const [statusForm, setStatusForm] = useState({ status: "", message: "" });

  function loadTickets() {
    setLoading(true);
    fetch("/api/tickets")
      .then((r) => r.json())
      .then((data) => setTickets(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadTickets();
  }, []);

  function openStatusChange(ticket: Ticket) {
    setChangingStatus(ticket.id);
    setStatusForm({ status: ticket.status, message: "" });
  }

  async function handleStatusChange(e: React.FormEvent) {
    e.preventDefault();
    if (!changingStatus) return;

    await fetch("/api/tickets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: changingStatus,
        status: statusForm.status,
        message: statusForm.message || undefined,
      }),
    });

    setChangingStatus(null);
    setStatusForm({ status: "", message: "" });
    loadTickets();
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este ticket?")) return;
    await fetch(`/api/tickets/${id}`, { method: "DELETE" });
    loadTickets();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Tickets</h1>

      {/* Status change modal */}
      {changingStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleStatusChange}
            className="bg-white rounded-xl p-6 w-full max-w-md space-y-4"
          >
            <h3 className="font-semibold text-foreground">Alterar Status</h3>
            <select
              value={statusForm.status}
              onChange={(e) =>
                setStatusForm({ ...statusForm, status: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Mensagem para o cliente (opcional)"
              value={statusForm.message}
              onChange={(e) =>
                setStatusForm({ ...statusForm, message: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setChangingStatus(null)}
                className="px-4 py-2 border border-border text-sm font-semibold rounded-lg hover:bg-muted"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-muted-foreground">Carregando...</p>
        ) : tickets.length === 0 ? (
          <p className="p-6 text-center text-muted-foreground">
            Nenhum ticket aberto.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Assunto
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Cliente
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Categoria
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Msgs
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Atualizado
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {ticket.user?.name || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {ticket.category}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        statusStyles[ticket.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {STATUS_OPTIONS.find((o) => o.value === ticket.status)
                        ?.label || ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {ticket._count?.messages || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(ticket.updatedAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      href={`/admin/tickets/${ticket.id}`}
                      className="text-sm text-primary hover:text-primary-light font-medium"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => openStatusChange(ticket)}
                      className="text-sm text-primary hover:text-primary-light font-medium"
                    >
                      Status
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Excluir
                    </button>
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
