"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ClienteTicketDetailPage() {
  const params = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/tickets/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setTicket(data);
        setMessages(data.messages || []);
      })
      .catch(() => {});
  }, [params.id]);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!reply.trim()) return;
    setLoading(true);

    await fetch(`/api/tickets/${params.id}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: reply }),
    });

    const updated = await fetch(`/api/tickets/${params.id}`);
    const data = await updated.json();
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
          Categoria: {ticket.category} | Status: {ticket.status}
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

      {ticket.status !== "CLOSED" && ticket.status !== "RESOLVED" && (
        <form onSubmit={handleReply} className="bg-white rounded-xl p-6 border border-border space-y-4">
          <textarea
            rows={3}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Escreva sua mensagem..."
            className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>
      )}
    </div>
  );
}
