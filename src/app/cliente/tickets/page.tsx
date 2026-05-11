"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ClienteTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: "", category: "SUPPORT", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/tickets")
      .then((r) => r.json())
      .then(setTickets)
      .catch(() => {});
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newTicket = await res.json();
      setTickets([newTicket, ...tickets]);
      setForm({ subject: "", category: "SUPPORT", message: "" });
      setShowForm(false);
    }
    setLoading(false);
  }

  const statusLabels: Record<string, string> = {
    OPEN: "Aberto",
    IN_PROGRESS: "Em Andamento",
    AWAITING_CLIENT: "Aguardando Você",
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Meus Tickets</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light"
        >
          + Novo Ticket
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 border border-border mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Assunto"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="SUPPORT">Suporte</option>
              <option value="MAINTENANCE">Manutenção</option>
              <option value="BUG">Bug</option>
              <option value="REQUEST">Solicitação</option>
              <option value="OTHER">Outro</option>
            </select>
          </div>
          <textarea
            rows={4}
            required
            placeholder="Descreva sua solicitação..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Abrir Ticket"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-border text-sm font-semibold rounded-lg hover:bg-muted"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {tickets.length === 0 ? (
        <div className="bg-white rounded-xl p-8 border border-border text-center">
          <p className="text-muted-foreground">Nenhum ticket encontrado.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/cliente/tickets/${ticket.id}`}
              className="block bg-white rounded-xl p-5 border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{ticket.subject}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ticket.category} | {new Date(ticket.updatedAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${statusStyles[ticket.status]}`}>
                  {statusLabels[ticket.status]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
