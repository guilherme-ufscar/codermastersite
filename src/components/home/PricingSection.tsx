import Link from "next/link";

const plans = [
  {
    name: "Site Institucional",
    price: "1.497",
    description: "Ideal para quem está começando e precisa de presença online",
    features: [
      "Até 5 páginas",
      "Design responsivo",
      "Otimizado para Google (SEO)",
      "Formulário de contato",
      "Integração com WhatsApp",
      "Entrega em até 15 dias",
    ],
    highlighted: false,
  },
  {
    name: "Loja Virtual",
    price: "2.997",
    description: "Para quem quer vender produtos ou serviços online",
    features: [
      "Catálogo ilimitado",
      "Carrinho e checkout",
      "Pagamento online (Pix, cartão, boleto)",
      "Painel administrativo",
      "Controle de estoque",
      "Integração com correios",
      "Design responsivo",
      "SEO otimizado",
    ],
    highlighted: true,
  },
  {
    name: "Sistema Web",
    price: "Sob consulta",
    description: "Soluções personalizadas para automatizar seu negócio",
    features: [
      "Análise de requisitos",
      "Desenvolvimento sob medida",
      "Painel administrativo",
      "Relatórios e dashboards",
      "Integrações com APIs",
      "Suporte e manutenção",
      "Treinamento incluso",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="precos" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Investimento que{" "}
            <span className="text-primary">cabe no seu bolso</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Planos transparentes, sem surpresas. Escolha o que melhor se encaixa
            no seu momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 lg:p-8 ${
                plan.highlighted
                  ? "bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02] lg:scale-105"
                  : "bg-white border border-border"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-primary-dark text-xs font-bold rounded-full">
                  Mais Vendido
                </span>
              )}

              <h3
                className={`text-xl font-bold mb-2 ${
                  plan.highlighted ? "text-white" : "text-foreground"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  plan.highlighted ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price !== "Sob consulta" && (
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      R$
                    </span>
                  )}
                  <span
                    className={`text-3xl font-bold ${
                      plan.highlighted ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <svg
                      className={`w-4 h-4 flex-shrink-0 ${
                        plan.highlighted ? "text-secondary" : "text-primary"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className={
                        plan.highlighted ? "text-white/90" : "text-foreground/80"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contato"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-secondary text-primary-dark hover:bg-secondary-dark"
                    : "bg-primary text-white hover:bg-primary-light"
                }`}
              >
                {plan.price === "Sob consulta" ? "Solicitar Orçamento" : "Começar Agora"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
