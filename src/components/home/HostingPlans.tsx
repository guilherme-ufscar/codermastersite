import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "29,99",
    priceNote: "12x no cartão",
    priceAnnual: "R$ 310",
    features: [
      "1 Site",
      "5 Contas de E-mail",
      "5 GB de Armazenamento",
      "SSL Grátis",
      "Backup Semanal",
      "Painel cPanel",
    ],
    highlighted: false,
  },
  {
    name: "Business",
    price: "49,99",
    priceNote: "12x no cartão",
    priceAnnual: "R$ 520",
    features: [
      "5 Sites",
      "20 Contas de E-mail",
      "20 GB de Armazenamento",
      "SSL Grátis",
      "Backup Diário",
      "Painel cPanel",
      "CDN Incluso",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "89,99",
    priceNote: "12x no cartão",
    priceAnnual: "R$ 940",
    features: [
      "20 Sites",
      "50 Contas de E-mail",
      "50 GB de Armazenamento",
      "SSL Grátis",
      "Backup Diário",
      "Painel cPanel",
      "CDN Incluso",
      "IP Dedicado",
      "Suporte Prioritário",
    ],
    highlighted: false,
  },
];

export default function HostingPlans() {
  return (
    <section id="hospedagem" className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Hospedagem rápida e{" "}
            <span className="text-primary">segura</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Servidores otimizados para seu site carregar em segundos. SSL grátis,
            backup automático e suporte técnico incluso.
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
                  Mais Popular
                </span>
              )}

              <h3
                className={`text-xl font-bold mb-2 ${
                  plan.highlighted ? "text-white" : "text-foreground"
                }`}
              >
                {plan.name}
              </h3>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    R$
                  </span>
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlighted ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    /mês
                  </span>
                </div>
                <p
                  className={`text-xs mt-1 ${
                    plan.highlighted ? "text-white/50" : "text-muted-foreground/70"
                  }`}
                >
                  {plan.priceNote} + taxas | à vista {plan.priceAnnual}
                </p>
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
                Contratar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
