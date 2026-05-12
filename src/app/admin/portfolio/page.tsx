"use client";

import { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string | null;
  featured: boolean;
  order: number;
  category: { id: string; name: string } | null;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

const emptyForm = {
  title: "",
  description: "",
  image: "",
  link: "",
  linkType: "url" as "url" | "pdf",
  categoryId: "",
};

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function loadData() {
    setLoading(true);
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setCategories(data.categories || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(item: PortfolioItem) {
    setEditingId(item.id);
    const isPdf = item.link?.endsWith(".pdf") || false;
    setForm({
      title: item.title,
      description: item.description,
      image: item.image,
      link: item.link || "",
      linkType: isPdf ? "pdf" : "url",
      categoryId: item.categoryId || item.category?.id || "",
    });
    setShowForm(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        setForm((f) => ({ ...f, image: url }));
      }
    } catch {}
    setUploadingImage(false);
  }

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPdf(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        setForm((f) => ({ ...f, link: url }));
      }
    } catch {}
    setUploadingPdf(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      image: form.image,
      link: form.link || null,
      featured: false,
      categoryId: form.categoryId,
      order: editingId ? undefined : items.length,
    };

    if (editingId) {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...payload }),
      });
      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        loadData();
      }
    } else {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    if (!confirm("Excluir este item do portfólio?")) return;
    await fetch(`/api/portfolio?id=${id}`, { method: "DELETE" });
    loadData();
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);

    const updates = reordered.map((item, index) => ({ id: item.id, order: index }));
    await fetch("/api/portfolio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: updates }),
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Portfólio</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
        >
          + Novo Item
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-6 border border-border mb-6 space-y-4"
        >
          <h3 className="font-semibold text-foreground">
            {editingId ? "Editar Item" : "Novo Item"}
          </h3>

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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Imagem
            </label>
            {form.image && (
              <div className="mb-2 relative inline-block">
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-40 h-24 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, image: "" })}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-700"
                >
                  X
                </button>
              </div>
            )}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              disabled={uploadingImage}
              className="px-4 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              {uploadingImage ? "Enviando..." : "Fazer upload de imagem"}
            </button>
          </div>

          {/* Link type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Link do projeto
            </label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, linkType: "url", link: "" })}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  form.linkType === "url"
                    ? "bg-primary text-white border-primary"
                    : "border-border hover:bg-muted"
                }`}
              >
                URL externa
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, linkType: "pdf", link: "" })}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  form.linkType === "pdf"
                    ? "bg-primary text-white border-primary"
                    : "border-border hover:bg-muted"
                }`}
              >
                Upload PDF
              </button>
            </div>
            {form.linkType === "url" ? (
              <input
                type="url"
                placeholder="https://exemplo.com"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            ) : (
              <div>
                {form.link && (
                  <p className="text-sm text-green-600 mb-2">
                    PDF enviado: {form.link}
                  </p>
                )}
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => pdfInputRef.current?.click()}
                  disabled={uploadingPdf}
                  className="px-4 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                >
                  {uploadingPdf ? "Enviando..." : "Fazer upload do PDF"}
                </button>
              </div>
            )}
          </div>

          <textarea
            placeholder="Descrição"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            rows={3}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving || !form.image}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg disabled:opacity-50"
            >
              {saving ? "Salvando..." : editingId ? "Atualizar" : "Criar Item"}
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

      {loading ? (
        <p className="text-center text-muted-foreground py-8">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          Nenhum item no portfólio.
        </p>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mb-3">
            Arraste os itens para reordenar. A ordem é salva automaticamente.
          </p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onEdit={() => openEdit(item)}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}
    </div>
  );
}

function SortableItem({
  item,
  onEdit,
  onDelete,
}: {
  item: PortfolioItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl border border-border p-4 flex items-center gap-4"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1"
        title="Arrastar para reordenar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </button>

      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-12 rounded object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
        <p className="text-xs text-muted-foreground">
          {item.category?.name || "Sem categoria"}
          {item.link && (
            <span className="ml-2">
              {item.link.endsWith(".pdf") ? "• PDF" : "• Link"}
            </span>
          )}
        </p>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={onEdit}
          className="text-sm text-primary hover:text-primary-light font-medium"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
