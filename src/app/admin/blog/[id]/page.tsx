"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TipTapEditor from "@/components/blog/TipTapEditor";

export default function BlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === "novo";

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    published: false,
    metaTitle: "",
    metaDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/blog/${params.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data) setForm(data);
          setLoadingPost(false);
        })
        .catch(() => setLoadingPost(false));
    }
  }, [isNew, params.id]);

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/blog" : `/api/blog/${params.id}`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/blog");
      router.refresh();
    }
  }

  if (loadingPost) {
    return <p className="text-muted-foreground">Carregando...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        {isNew ? "Novo Post" : "Editar Post"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Título
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                    slug: form.slug || generateSlug(e.target.value),
                  })
                }
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Conteúdo
              </label>
              <TipTapEditor
                content={form.content}
                onChange={(html) => setForm({ ...form, content: html })}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-border space-y-4">
              <h3 className="font-semibold text-foreground">Publicação</h3>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Slug
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Resumo
                </label>
                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Imagem de Capa (URL)
                </label>
                <input
                  type="text"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-foreground">
                  Publicar
                </span>
              </label>
            </div>

            <div className="bg-white rounded-xl p-5 border border-border space-y-4">
              <h3 className="font-semibold text-foreground">SEO</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={form.metaTitle}
                  onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={form.metaDescription}
                  onChange={(e) =>
                    setForm({ ...form, metaDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
