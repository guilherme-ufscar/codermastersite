import Link from "next/link";

const WA = "5519995476892";

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
            Seu site no ar 24h com velocidade, segurança e suporte técnico incluso.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="relative bg-primary text-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-primary/20">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-secondary text-primary-dark text-xs font-bold rounded-full">
              Plano Completo
            </span>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Hospedagem Profissional</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-white/70 text-lg">12x de</span>
                <span className="text-5xl font-bold text-secondary">R$ 29,99</span>
              </div>
              <p className="text-white/50 text-sm mt-2">
                no cartão + taxas da operadora | à vista R$ 310,00
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "SSL Grátis (HTTPS)",
                "Backup automático",
                "Painel cPanel",
                "Contas de e-mail profissional",
                "Banco de dados MySQL",
                "Suporte técnico incluso",
                "Uptime 99.9%",
                "Proteção contra DDoS",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/90">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Quero contratar o plano de hospedagem de 12x R$29,99.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 bg-secondary text-primary-dark font-bold rounded-xl hover:bg-secondary-dark transition-colors"
            >
              Contratar Hospedagem
            </a>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8">
          Precisa de algo mais robusto?{" "}
          <Link href="/contato" className="text-primary font-medium hover:underline">
            Fale conosco
          </Link>{" "}
          para um plano personalizado.
        </p>
      </div>
    </section>
  );
}
