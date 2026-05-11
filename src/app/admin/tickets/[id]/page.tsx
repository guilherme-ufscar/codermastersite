"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function AdminTicketDetailPage() {
  const params = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/tickets/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setTicket(data);
        setMessages(data.messages || []);
        setStatus(data.status);
      })
      .catch(() => {});
  }, [params.id]);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!reply.trim() && status === ticket?.status) return;
    setLoading(true);

    await fetch("/api/tickets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: params.id,
        status,
        message: reply || undefined,
      }),
    });

    const updated = await fetch(`/api/tickets/${params.id}`);
    const data = await updated.json();
    setTicket(data);
    setMessages(data.messages || []);
    setReply("");
    setLoading(false);
  }

  if (!ticket) return <p className="text-muted-foreground">Carregando...</p>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{ticket.subject}</h1>
        <p className="text-sm text-muted-foreground">
          Cliente: {ticket.user?.name} | Categoria: {ticket.category}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border mb-6">
        <div className="divide-y divide-border max-h-96 overflow-y-auto">
          {messages.map((msg: any) => (
            <div key={msg.id} className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground">
                  {msg.user?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.createdAt).toLocaleString("pt-BR")}
                </span>
              </div>
              <p className="text-sm text-foreground/80">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleReply} className="bg-white rounded-xl p-6 border border-border space-y-4">
        <div className="flex gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-border"
          >
            <option value="OPEN">Aberto</option>
            <option value="IN_PROGRESS">Em Andamento</option>
            <option value="AWAITING_CLIENT">Aguardando Cliente</option>
            <option value="RESOLVED">Resolvido</option>
            <option value="CLOSED">Fechado</option>
          </select>
        </div>
        <textarea
          rows={3}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Responder ao ticket..."
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Responder & Atualizar"}
        </button>
      </form>
    </div>
  );
}
