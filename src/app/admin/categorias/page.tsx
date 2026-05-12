"use client";

import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  isRevenue: boolean;
}

const emptyForm = { name: "", isRevenue: true };

export default function AdminCategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function loadCategories() {
    setLoading(true);
    fetch("/api/categorias/faturas")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function openEdit(cat: Category) {
    setEditingId(cat.id);
    setForm({ name: cat.name, isRevenue: cat.isRevenue });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      const res = await fetch("/api/categorias/faturas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
      if (res.ok) {
        setEditingId(null);
        setForm(emptyForm);
        loadCategories();
      }
    } else {
      const res = await fetch("/api/categorias/faturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm(emptyForm);
        loadCategories();
      }
    }
    setSaving(false);
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
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 border border-border mb-6"
      >
        <h3 className="font-semibold text-foreground mb-4">
          {editingId ? "Editar Categoria" : "Nova Categoria"}
        </h3>
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
              onChange={(e) =>
                setForm({ ...form, isRevenue: e.target.checked })
              }
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-foreground">Conta como receita</span>
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light disabled:opacity-50"
            >
              {saving
                ? "Salvando..."
                : editingId
                ? "Atualizar"
                : "Adicionar"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2.5 border border-border text-sm font-semibold rounded-lg hover:bg-muted"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Categorias marcadas como &ldquo;nao conta como receita&rdquo; (ex:
          Dominio) aparecem nas faturas do cliente mas nao entram no financeiro.
        </p>
      </form>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-muted-foreground">Carregando...</p>
        ) : categories.length === 0 ? (
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
                  Acoes
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
                      {cat.isRevenue ? "Sim" : "Nao (informativo)"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => openEdit(cat)}
                      className="text-sm text-primary hover:text-primary-light font-medium"
                    >
                      Editar
                    </button>
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
