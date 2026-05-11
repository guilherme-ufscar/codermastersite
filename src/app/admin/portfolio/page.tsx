"use client";

import { useState, useEffect } from "react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string | null;
  featured: boolean;
  order: number;
  category: { id: string; name: string };
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    featured: false,
    categoryId: "",
    order: 0,
  });
  const [loading, setLoading] = useState(false);

  function loadData() {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setCategories(data.categories || []);
      })
      .catch(() => {});
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      loadData();
      setForm({ title: "", description: "", image: "", link: "", featured: false, categoryId: "", order: 0 });
      setShowForm(false);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este item do portfólio?")) return;
    await fetch(`/api/portfolio?id=${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Portfólio</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light"
        >
          + Novo Item
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 border border-border mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Título"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Categoria</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="URL da imagem"
              required
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="text"
              placeholder="Link (URL ou caminho PDF)"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="number"
              placeholder="Ordem"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              className="px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary"
              />
              <span className="text-sm">Destaque</span>
            </label>
          </div>
          <textarea
            placeholder="Descrição"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            rows={2}
          />
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg disabled:opacity-50">
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-border text-sm rounded-lg hover:bg-muted">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="aspect-[16/10] bg-muted overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-primary font-medium">{item.category?.name}</span>
                {item.featured && <span className="text-xs bg-secondary/20 text-primary px-2 py-0.5 rounded-full">Destaque</span>}
              </div>
              <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
