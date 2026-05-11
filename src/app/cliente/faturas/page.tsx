"use client";

import { useState, useEffect } from "react";

export default function ClienteFaturasPage() {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/faturas")
      .then((r) => r.json())
      .then(setInvoices)
      .catch(() => {});
  }, []);

  function copyPix(code: string) {
    navigator.clipboard.writeText(code);
    alert("Código PIX copiado!");
  }

  const statusLabels: Record<string, string> = {
    PENDING: "Pendente",
    PAID: "Pago",
    OVERDUE: "Vencido",
    CANCELLED: "Cancelado",
  };

  const statusStyles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-green-100 text-green-700",
    OVERDUE: "bg-red-100 text-red-700",
    CANCELLED: "bg-gray-100 text-gray-700",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Minhas Faturas</h1>

      {invoices.length === 0 ? (
        <div className="bg-white rounded-xl p-8 border border-border text-center">
          <p className="text-muted-foreground">Nenhuma fatura encontrada.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground text-sm">
                    {inv.category?.name}
                  </h3>
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${statusStyles[inv.status]}`}>
                    {statusLabels[inv.status]}
                  </span>
                </div>
                {inv.description && (
                  <p className="text-xs text-muted-foreground">{inv.description}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Vencimento: {new Date(inv.dueDate).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-foreground">
                  R$ {Number(inv.amount).toFixed(2)}
                </span>

                <div className="flex gap-2">
                  {inv.paymentMethod === "PIX" && inv.pixCode && (
                    <button
                      onClick={() => copyPix(inv.pixCode)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-lg hover:bg-primary/10"
                      title="Copiar código PIX"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      PIX
                    </button>
                  )}
                  {inv.paymentMethod === "BOLETO" && inv.boletoFile && (
                    <a
                      href={inv.boletoFile}
                      download
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-lg hover:bg-primary/10"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Boleto
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
