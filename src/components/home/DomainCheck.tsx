"use client";

import { useState } from "react";

export default function DomainCheck() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<{
    available: boolean;
    domain: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `/api/domain-check?domain=${encodeURIComponent(domain.trim())}`
      );
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Encontre o domínio{" "}
            <span className="text-primary">perfeito</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Verifique se o domínio que você quer está disponível. Registramos
            .com.br, .com, .net e muito mais.
          </p>

          <form
            onSubmit={handleCheck}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="seudominio.com.br"
              className="flex-1 px-5 py-4 rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Verificar"}
            </button>
          </form>

          {result && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                result.available
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {result.available ? (
                <p className="text-green-700 font-medium">
                  <span className="font-bold">{result.domain}</span> está
                  disponível! Entre em contato para registrar.
                </p>
              ) : (
                <p className="text-red-700 font-medium">
                  <span className="font-bold">{result.domain}</span> já está
                  registrado. Tente outra opção.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
