export default function MarketingSection() {
  return (
    <section id="marketing" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-secondary/20 text-primary text-sm font-medium rounded-full mb-4">
              Marketing Digital
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Atraia mais clientes com{" "}
              <span className="text-primary">estratégias digitais</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Não basta ter um site bonito. Você precisa que as pessoas certas
              encontrem seu negócio. Cuidamos do tráfego pago, SEO e presença
              digital para você focar no que importa.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Google Ads & Meta Ads",
                  desc: "Campanhas otimizadas para trazer clientes qualificados",
                },
                {
                  title: "SEO",
                  desc: "Apareça nas primeiras posições do Google organicamente",
                },
                {
                  title: "Gestão de Tráfego",
                  desc: "Investimento inteligente com retorno mensurável",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-primary-dark"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl p-8 lg:p-12">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Visitantes do Site
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      +127%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary rounded-full" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Conversões
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      +85%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-secondary rounded-full" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Posição no Google
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      Top 3
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[90%] bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
