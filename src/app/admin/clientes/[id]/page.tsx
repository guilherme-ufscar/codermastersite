"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function AdminClienteDetailPage() {
  const params = useParams();
  const [client, setClient] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    categoryId: "",
    description: "",
    amount: "",
    dueDate: "",
    recurrence: "ONE_TIME",
    recurrenceCount: "1",
    paymentMethod: "PIX",
    pixCode: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/clientes/${params.id}`)
      .then((r) => r.json())
      .then(setClient)
      .catch(() => {});

    fetch(`/api/faturas?userId=${params.id}`)
      .then((r) => r.json())
      .then(setInvoices)
      .catch(() => {});

    fetch("/api/categorias/faturas")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, [params.id]);

  async function handleCreateInvoice(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/faturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: params.id,
        categoryId: form.categoryId,
        description: form.description,
        amount: parseFloat(form.amount),
        dueDate: form.dueDate,
        recurrence: form.recurrence,
        recurrenceCount: parseInt(form.recurrenceCount),
        paymentMethod: form.paymentMethod,
        pixCode: form.pixCode,
      }),
    });
    if (res.ok) {
      const updated = await fetch(`/api/faturas?userId=${params.id}`);
      setInvoices(await updated.json());
      setShowInvoiceForm(false);
      setForm({
        categoryId: "",
        description: "",
        amount: "",
        dueDate: "",
        recurrence: "ONE_TIME",
        recurrenceCount: "1",
        paymentMethod: "PIX",
        pixCode: "",
      });
    }
    setLoading(false);
  }

  if (!client) return <p className="text-muted-foreground">Carregando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
          <p className="text-muted-foreground text-sm">{client.email}</p>
        </div>
        <button
          onClick={() => setShowInvoiceForm(!showInvoiceForm)}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light"
        >
          + Nova Fatura
        </button>
      </div>

      {showInvoiceForm && (
        <form
          onSubmit={handleCreateInvoice}
          className="bg-white rounded-xl p-6 border border-border mb-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Categoria</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} {!cat.isRevenue ? "(informativo)" : ""}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Valor (R$)"
              required
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="date"
              required
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <select
              value={form.recurrence}
              onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="ONE_TIME">Única</option>
              <option value="MONTHLY">Mensal</option>
              <option value="ANNUAL">Anual</option>
            </select>
            {form.recurrence !== "ONE_TIME" && (
              <input
                type="number"
                min="1"
                placeholder="Qtd. recorrências"
                value={form.recurrenceCount}
                onChange={(e) => setForm({ ...form, recurrenceCount: e.target.value })}
                className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
            <select
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="PIX">PIX</option>
              <option value="BOLETO">Boleto</option>
            </select>
            {form.paymentMethod === "PIX" && (
              <input
                type="text"
                placeholder="Código PIX"
                value={form.pixCode}
                onChange={(e) => setForm({ ...form, pixCode: e.target.value })}
                className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg disabled:opacity-50"
            >
              {loading ? "Criando..." : "Criar Fatura"}
            </button>
            <button
              type="button"
              onClick={() => setShowInvoiceForm(false)}
              className="px-4 py-2 border border-border text-sm font-semibold rounded-lg hover:bg-muted"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <h3 className="px-6 py-4 font-semibold text-foreground border-b border-border">
          Faturas
        </h3>
        {invoices.length === 0 ? (
          <p className="p-6 text-center text-muted-foreground">
            Nenhuma fatura cadastrada.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Categoria</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Valor</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Vencimento</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Pagamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv: any) => (
                <tr key={inv.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm">{inv.category?.name}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    R$ {Number(inv.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(inv.dueDate).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {inv.paymentMethod || "-"}
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-green-100 text-green-700",
    OVERDUE: "bg-red-100 text-red-700",
    CANCELLED: "bg-gray-100 text-gray-700",
  };
  const labels: Record<string, string> = {
    PENDING: "Pendente",
    PAID: "Pago",
    OVERDUE: "Vencido",
    CANCELLED: "Cancelado",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${styles[status] || ""}`}>
      {labels[status] || status}
    </span>
  );
}
