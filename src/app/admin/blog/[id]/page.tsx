"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import TipTapEditor from "@/components/blog/TipTapEditor";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function stripHtml(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.replace(/\s+/g, " ").trim();
}

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
  const [slugManual, setSlugManual] = useState(false);
  const [excerptManual, setExcerptManual] = useState(false);
  const [seoTitleManual, setSeoTitleManual] = useState(false);
  const [seoDescManual, setSeoDescManual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(!isNew);
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // AI states
  const [aiLoading, setAiLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{ title: string; description: string }[]>([]);
  const [showImproveForm, setShowImproveForm] = useState(false);
  const [improveTopic, setImproveTopic] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/blog/${params.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data) {
            setForm(data);
            if (data.slug) setSlugManual(true);
            if (data.excerpt) setExcerptManual(true);
            if (data.metaTitle) setSeoTitleManual(true);
            if (data.metaDescription) setSeoDescManual(true);
          }
          setLoadingPost(false);
        })
        .catch(() => setLoadingPost(false));
    }
  }, [isNew, params.id]);

  function handleTitleChange(title: string) {
    const updates: any = { title };
    if (!slugManual) updates.slug = generateSlug(title);
    if (!seoTitleManual) updates.metaTitle = title;
    setForm((f) => ({ ...f, ...updates }));
  }

  function handleContentChange(html: string) {
    const updates: any = { content: html };
    if (!excerptManual) {
      const text = stripHtml(html);
      updates.excerpt = text.slice(0, 160);
    }
    if (!seoDescManual) {
      const text = stripHtml(html);
      updates.metaDescription = text.slice(0, 160);
    }
    setForm((f) => ({ ...f, ...updates }));
  }

  function applyAiResult(result: { title?: string; content?: string }) {
    if (result.title && result.content) {
      setForm((f) => ({
        ...f,
        title: result.title!,
        slug: generateSlug(result.title!),
        content: result.content!,
        excerpt: stripHtml(result.content!).slice(0, 160),
        metaTitle: result.title!,
        metaDescription: stripHtml(result.content!).slice(0, 160),
      }));
      setSlugManual(false);
      setExcerptManual(false);
      setSeoTitleManual(false);
      setSeoDescManual(false);
    }
  }

  async function handleAiSuggest() {
    setAiLoading(true);
    setShowSuggestions(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "suggest" }),
      });
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      }
    } catch {}
    setAiLoading(false);
  }

  async function handleAiGenerate(topic: string) {
    setAiLoading(true);
    setShowSuggestions(false);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", topic }),
      });
      if (res.ok) {
        const data = await res.json();
        applyAiResult(data);
      }
    } catch {}
    setAiLoading(false);
  }

  async function handleAiImprove() {
    if (!improveTopic.trim()) return;
    setAiLoading(true);
    setShowImproveForm(false);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "improve",
          topic: improveTopic,
          content: form.content || undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        applyAiResult(data);
      }
    } catch {}
    setAiLoading(false);
    setImproveTopic("");
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        setForm((f) => ({ ...f, coverImage: url }));
      }
    } catch {}
    setUploadingCover(false);
  }

  async function handleSubmit(publish: boolean) {
    setLoading(true);
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/blog" : `/api/blog/${params.id}`;

    const payload = {
      ...form,
      published: publish,
      excerpt: (form.excerpt || "").slice(0, 160),
      metaDescription: (form.metaDescription || "").slice(0, 160),
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {isNew ? "Novo Post" : "Editar Post"}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAiSuggest}
            disabled={aiLoading}
            className="px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50"
          >
            {aiLoading ? "Gerando..." : "Gerar com IA"}
          </button>
          <button
            type="button"
            onClick={() => setShowImproveForm(!showImproveForm)}
            disabled={aiLoading}
            className="px-4 py-2 border border-violet-300 text-violet-700 text-sm font-semibold rounded-lg hover:bg-violet-50 transition-colors disabled:opacity-50"
          >
            Aprimorar texto
          </button>
        </div>
      </div>

      {/* AI Suggestions modal */}
      {showSuggestions && (
        <div className="bg-violet-50 rounded-xl p-5 border border-violet-200 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-violet-900">Sugestões de tópicos</h3>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-sm text-violet-600 hover:text-violet-800"
            >
              Fechar
            </button>
          </div>
          {aiLoading ? (
            <p className="text-sm text-violet-700">Consultando tendências...</p>
          ) : suggestions.length === 0 ? (
            <p className="text-sm text-violet-700">Nenhuma sugestão encontrada.</p>
          ) : (
            <div className="space-y-2">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white rounded-lg p-3 border border-violet-100"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.description}</p>
                  </div>
                  <button
                    onClick={() => handleAiGenerate(s.title)}
                    className="ml-3 px-3 py-1.5 text-xs bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex-shrink-0"
                  >
                    Gerar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Improve form */}
      {showImproveForm && (
        <div className="bg-violet-50 rounded-xl p-5 border border-violet-200 mb-6">
          <h3 className="font-semibold text-violet-900 mb-3">Aprimorar texto com IA</h3>
          <p className="text-xs text-violet-700 mb-3">
            Informe o tópico e contexto. A IA vai gerar título e conteúdo completo.
            {form.content && " O conteúdo atual será usado como base."}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={improveTopic}
              onChange={(e) => setImproveTopic(e.target.value)}
              placeholder="Ex: Por que minha empresa precisa de um site profissional"
              className="flex-1 px-4 py-2.5 rounded-lg border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white"
            />
            <button
              onClick={handleAiImprove}
              disabled={!improveTopic.trim() || aiLoading}
              className="px-4 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 disabled:opacity-50"
            >
              Gerar
            </button>
            <button
              onClick={() => setShowImproveForm(false)}
              className="px-4 py-2.5 border border-violet-200 text-sm rounded-lg hover:bg-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
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
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Conteúdo
              </label>
              <TipTapEditor
                content={form.content}
                onChange={handleContentChange}
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.slug}
                    readOnly={!slugManual}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      !slugManual ? "bg-muted text-muted-foreground" : "bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (slugManual) {
                        setSlugManual(false);
                        setForm((f) => ({ ...f, slug: generateSlug(f.title) }));
                      } else {
                        setSlugManual(true);
                      }
                    }}
                    className="px-2 py-1 text-xs border border-border rounded hover:bg-muted"
                    title={slugManual ? "Voltar ao automático" : "Editar manualmente"}
                  >
                    {slugManual ? "Auto" : "Editar"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Resumo
                </label>
                <textarea
                  rows={3}
                  value={form.excerpt}
                  readOnly={!excerptManual}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none ${
                    !excerptManual ? "bg-muted text-muted-foreground" : "bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (excerptManual) {
                      setExcerptManual(false);
                      setForm((f) => ({ ...f, excerpt: stripHtml(f.content).slice(0, 160) }));
                    } else {
                      setExcerptManual(true);
                    }
                  }}
                  className="mt-1 text-xs text-primary hover:text-primary-light"
                >
                  {excerptManual ? "Voltar ao automático" : "Editar manualmente"}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Imagem de Capa
                </label>
                {form.coverImage && (
                  <div className="mb-2 relative">
                    <img
                      src={form.coverImage}
                      alt="Capa"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, coverImage: "" })}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-700"
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={uploadingCover}
                  className="w-full px-3 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                >
                  {uploadingCover ? "Enviando..." : "Fazer upload de imagem"}
                </button>
              </div>
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
                  readOnly={!seoTitleManual}
                  onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    !seoTitleManual ? "bg-muted text-muted-foreground" : "bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (seoTitleManual) {
                      setSeoTitleManual(false);
                      setForm((f) => ({ ...f, metaTitle: f.title }));
                    } else {
                      setSeoTitleManual(true);
                    }
                  }}
                  className="mt-1 text-xs text-primary hover:text-primary-light"
                >
                  {seoTitleManual ? "Voltar ao automático" : "Editar manualmente"}
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={form.metaDescription}
                  readOnly={!seoDescManual}
                  onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none ${
                    !seoDescManual ? "bg-muted text-muted-foreground" : "bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (seoDescManual) {
                      setSeoDescManual(false);
                      setForm((f) => ({ ...f, metaDescription: stripHtml(f.content).slice(0, 160) }));
                    } else {
                      setSeoDescManual(true);
                    }
                  }}
                  className="mt-1 text-xs text-primary hover:text-primary-light"
                >
                  {seoDescManual ? "Voltar ao automático" : "Editar manualmente"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={loading || !form.title || !form.content}
            className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar Rascunho"}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={loading || !form.title || !form.content}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar e Publicar"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-6 py-3 text-muted-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
