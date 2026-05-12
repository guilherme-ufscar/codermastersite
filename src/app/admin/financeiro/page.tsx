"use client";

import { useState, useEffect } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  categoryName: string | null;
  recurrence: string;
  recurrenceCount: number;
}

const emptyForm = {
  description: "",
  amount: "",
  date: "",
  recurrence: "ONE_TIME",
  recurrenceCount: "1",
  categoryName: "",
};

export default function AdminFinanceiroPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [period, setPeriod] = useState("month");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function loadData() {
    setLoading(true);
    fetch(`/api/financeiro?period=${period}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadData();
  }, [period]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(expense: Expense) {
    setEditingId(expense.id);
    setForm({
      description: expense.description,
      amount: String(expense.amount),
      date: expense.date ? expense.date.split("T")[0] : "",
      recurrence: expense.recurrence || "ONE_TIME",
      recurrenceCount: String(expense.recurrenceCount || 1),
      categoryName: expense.categoryName || "",
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      const res = await fetch("/api/financeiro", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          description: form.description,
          amount: parseFloat(form.amount),
          date: form.date,
          categoryName: form.categoryName,
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        loadData();
      }
    } else {
      const res = await fetch("/api/financeiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
          recurrenceCount: parseInt(form.recurrenceCount),
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setForm(emptyForm);
        loadData();
      }
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta despesa?")) return;
    await fetch(`/api/financeiro?id=${id}`, { method: "DELETE" });
    loadData();
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
        <div className="flex gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-border"
          >
            <option value="month">Este Mes</option>
            <option value="year">Este Ano</option>
          </select>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            + Despesa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Receitas</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {formatCurrency(data?.totalRevenue || 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Despesas</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {formatCurrency(data?.totalExpenses || 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Balanco</p>
          <p
            className={`text-2xl font-bold mt-1 ${
              (data?.balance || 0) >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(data?.balance || 0)}
          </p>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-6 border border-border mb-6 space-y-4"
        >
          <h3 className="font-semibold text-foreground">
            {editingId ? "Editar Despesa" : "Nova Despesa"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Descricao"
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="text"
              placeholder="Categoria"
              value={form.categoryName}
              onChange={(e) =>
                setForm({ ...form, categoryName: e.target.value })
              }
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {!editingId && (
              <>
                <select
                  value={form.recurrence}
                  onChange={(e) =>
                    setForm({ ...form, recurrence: e.target.value })
                  }
                  className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="ONE_TIME">Unica</option>
                  <option value="MONTHLY">Mensal</option>
                  <option value="ANNUAL">Anual</option>
                </select>
                {form.recurrence !== "ONE_TIME" && (
                  <input
                    type="number"
                    min="1"
                    placeholder="Qtd. recorrencias"
                    value={form.recurrenceCount}
                    onChange={(e) =>
                      setForm({ ...form, recurrenceCount: e.target.value })
                    }
                    className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                )}
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg disabled:opacity-50"
            >
              {saving
                ? "Salvando..."
                : editingId
                ? "Atualizar"
                : "Salvar Despesa"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="px-4 py-2 border border-border text-sm font-semibold rounded-lg hover:bg-muted"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenues */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <h3 className="px-6 py-4 font-semibold text-foreground border-b border-border">
            Receitas Recentes
          </h3>
          {loading ? (
            <p className="p-6 text-center text-muted-foreground text-sm">
              Carregando...
            </p>
          ) : !data?.revenues?.length ? (
            <p className="p-6 text-center text-muted-foreground text-sm">
              Nenhuma receita no periodo.
            </p>
          ) : (
            <div className="divide-y divide-border max-h-80 overflow-y-auto">
              {data.revenues.map((r: any) => (
                <div
                  key={r.id}
                  className="px-6 py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {r.category?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    +{formatCurrency(Number(r.amount))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expenses */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <h3 className="px-6 py-4 font-semibold text-foreground border-b border-border">
            Despesas
          </h3>
          {loading ? (
            <p className="p-6 text-center text-muted-foreground text-sm">
              Carregando...
            </p>
          ) : !data?.expenses?.length ? (
            <p className="p-6 text-center text-muted-foreground text-sm">
              Nenhuma despesa no periodo.
            </p>
          ) : (
            <div className="divide-y divide-border max-h-96 overflow-y-auto">
              {data.expenses.map((exp: any) => (
                <div
                  key={exp.id}
                  className="px-6 py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {exp.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {exp.categoryName || "Sem categoria"} &middot;{" "}
                      {new Date(exp.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-red-600">
                      -{formatCurrency(Number(exp.amount))}
                    </span>
                    <button
                      onClick={() => openEdit(exp)}
                      className="text-xs text-primary hover:text-primary-light font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
