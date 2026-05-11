"use client";

import { useState, useEffect } from "react";

export default function AdminFinanceiroPage() {
  const [data, setData] = useState<any>(null);
  const [period, setPeriod] = useState("month");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    recurrence: "ONE_TIME",
    recurrenceCount: "1",
    categoryName: "",
  });
  const [loading, setLoading] = useState(false);

  function loadData() {
    fetch(`/api/financeiro?period=${period}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }

  useEffect(() => {
    loadData();
  }, [period]);

  async function handleCreateExpense(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
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
      loadData();
      setShowExpenseForm(false);
      setForm({ description: "", amount: "", date: "", recurrence: "ONE_TIME", recurrenceCount: "1", categoryName: "" });
    }
    setLoading(false);
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
            <option value="month">Este Mês</option>
            <option value="year">Este Ano</option>
          </select>
          <button
            onClick={() => setShowExpenseForm(!showExpenseForm)}
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700"
          >
            + Despesa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Receitas</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            R$ {data?.totalRevenue?.toFixed(2) || "0.00"}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Despesas</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            R$ {data?.totalExpenses?.toFixed(2) || "0.00"}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <p className="text-sm text-muted-foreground">Balanço</p>
          <p
            className={`text-2xl font-bold mt-1 ${
              (data?.balance || 0) >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            R$ {data?.balance?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>

      {showExpenseForm && (
        <form
          onSubmit={handleCreateExpense}
          className="bg-white rounded-xl p-6 border border-border mb-6 space-y-4"
        >
          <h3 className="font-semibold text-foreground">Nova Despesa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Descrição"
              required
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
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="text"
              placeholder="Categoria"
              value={form.categoryName}
              onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
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
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Despesa"}
            </button>
            <button
              type="button"
              onClick={() => setShowExpenseForm(false)}
              className="px-4 py-2 border border-border text-sm font-semibold rounded-lg hover:bg-muted"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <h3 className="px-6 py-4 font-semibold text-foreground border-b border-border">
            Receitas Recentes
          </h3>
          {!data?.revenues?.length ? (
            <p className="p-6 text-center text-muted-foreground text-sm">Nenhuma receita no período.</p>
          ) : (
            <div className="divide-y divide-border max-h-80 overflow-y-auto">
              {data.revenues.slice(0, 10).map((r: any) => (
                <div key={r.id} className="px-6 py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.category?.name}</p>
                    <p className="text-xs text-muted-foreground">{r.description}</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    +R$ {Number(r.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <h3 className="px-6 py-4 font-semibold text-foreground border-b border-border">
            Despesas Recentes
          </h3>
          {!data?.expenses?.length ? (
            <p className="p-6 text-center text-muted-foreground text-sm">Nenhuma despesa no período.</p>
          ) : (
            <div className="divide-y divide-border max-h-80 overflow-y-auto">
              {data.expenses.slice(0, 10).map((exp: any) => (
                <div key={exp.id} className="px-6 py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">{exp.description}</p>
                    <p className="text-xs text-muted-foreground">{exp.categoryName}</p>
                  </div>
                  <span className="text-sm font-medium text-red-600">
                    -R$ {Number(exp.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
