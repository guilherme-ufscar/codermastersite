import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-6">
            Seu negócio no mundo digital
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Crie seu site profissional e{" "}
            <span className="text-secondary">venda mais</span> na internet
          </h1>

          <p className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed">
            Sites, lojas virtuais, sistemas e aplicativos sob medida para o seu
            negócio. Do primeiro passo ao sucesso online, a gente cuida de tudo
            para você.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contato"
              className="w-full sm:w-auto px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors text-center"
            >
              Quero Meu Site
            </Link>
            <Link
              href="/#servicos"
              className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              Ver Serviços
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold text-secondary">+200</p>
              <p className="text-xs lg:text-sm text-white/60 mt-1">Sites criados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold text-secondary">+50</p>
              <p className="text-xs lg:text-sm text-white/60 mt-1">Clientes ativos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold text-secondary">+5</p>
              <p className="text-xs lg:text-sm text-white/60 mt-1">Anos no mercado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
