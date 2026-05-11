import Link from "next/link";

const WA = "5519995476892";

export default function HeroSection() {
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#000d4d]" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 right-[5%] w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-[150px]" />

        {/* Floating geometric shapes */}
        <svg className="absolute top-32 right-[15%] w-16 h-16 text-secondary/20 animate-[spin_20s_linear_infinite]" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
        <svg className="absolute bottom-20 left-[12%] w-10 h-10 text-white/10 animate-[bounce_3s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
        <svg className="absolute top-40 left-[30%] w-6 h-6 text-secondary/30" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 22,20 2,20" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-secondary text-sm font-medium rounded-full mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Seu negócio no mundo digital
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6">
              Crie seu site profissional e{" "}
              <span className="relative">
                <span className="text-secondary">venda mais</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/30" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 150 4 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              na internet
            </h1>

            <p className="text-base lg:text-lg text-white/70 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Sites, lojas virtuais, sistemas e aplicativos sob medida para o seu
              negócio. Do primeiro passo ao sucesso online, a gente cuida de tudo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Quero criar meu site profissional. Podem me ajudar?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-secondary text-primary-dark font-bold rounded-xl hover:bg-secondary-dark transition-all hover:shadow-lg hover:shadow-secondary/20 text-center inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Quero Meu Site
              </a>
              <Link
                href="/#servicos"
                className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all text-center backdrop-blur-sm"
              >
                Ver Serviços
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { value: "+200", label: "Sites criados" },
                { value: "+50", label: "Clientes ativos" },
                { value: "+5", label: "Anos no mercado" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl lg:text-3xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Browser mockup */}
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-1 shadow-2xl">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/10 rounded-lg px-3 py-1.5 text-xs text-white/40 flex items-center gap-2">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      seusite.com.br
                    </div>
                  </div>
                </div>
                {/* Content area */}
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-5/6" />
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="h-20 bg-secondary/10 rounded-lg border border-secondary/20" />
                    <div className="h-20 bg-white/5 rounded-lg border border-white/10" />
                    <div className="h-20 bg-white/5 rounded-lg border border-white/10" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <div className="h-10 bg-secondary/20 rounded-lg flex-1" />
                    <div className="h-10 bg-white/10 rounded-lg w-24" />
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-xl animate-[bounce_4s_ease-in-out_infinite]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50">Vendas</p>
                    <p className="text-xs font-bold text-green-400">+127%</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-xl animate-[bounce_5s_ease-in-out_infinite_0.5s]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50">Visitantes</p>
                    <p className="text-xs font-bold text-secondary">2.4k/dia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
          <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
