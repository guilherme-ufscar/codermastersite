"use client";

import { useState, useEffect } from "react";

export default function AdminCategoriasPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", isRevenue: true });
  const [loading, setLoading] = useState(false);

  function loadCategories() {
    fetch("/api/categorias/faturas")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/categorias/faturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      loadCategories();
      setForm({ name: "", isRevenue: true });
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
    await fetch(`/api/categorias/faturas?id=${id}`, { method: "DELETE" });
    loadCategories();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Categorias de Faturas
      </h1>

      <form
        onSubmit={handleCreate}
        className="bg-white rounded-xl p-6 border border-border mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Nome da categoria"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="flex-1 px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isRevenue}
              onChange={(e) => setForm({ ...form, isRevenue: e.target.checked })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-foreground">Conta como receita</span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light disabled:opacity-50"
          >
            Adicionar
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Categorias marcadas como &ldquo;não conta como receita&rdquo; (ex: Domínio) aparecem nas faturas do cliente mas não entram no financeiro.
        </p>
      </form>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {categories.length === 0 ? (
          <p className="p-6 text-center text-muted-foreground">
            Nenhuma categoria cadastrada.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Nome
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Receita
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {cat.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        cat.isRevenue
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cat.isRevenue ? "Sim" : "Não (informativo)"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(cat.id)}
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
