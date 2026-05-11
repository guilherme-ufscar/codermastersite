import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desenvolvimento de Aplicativos",
  description:
    "Desenvolvimento de aplicativos Android e iOS. Apps nativos e híbridos para levar seu negócio ao bolso dos seus clientes.",
};

const WA = "5519995476892";

const appTypes = [
  {
    title: "App Nativo",
    description: "Performance máxima com desenvolvimento específico para cada plataforma (Android e iOS).",
    pros: ["Melhor performance", "Acesso total ao hardware", "Experiência nativa", "Ideal para apps complexos"],
  },
  {
    title: "App Híbrido",
    description: "Um único código para Android e iOS. Mais rápido e econômico sem perder qualidade.",
    pros: ["Custo menor", "Desenvolvimento mais rápido", "Manutenção simplificada", "Ideal para MVPs e apps simples"],
  },
  {
    title: "PWA (Progressive Web App)",
    description: "App que funciona no navegador sem precisar baixar na loja. Leve e acessível.",
    pros: ["Sem download necessário", "Funciona offline", "Custo reduzido", "Ideal para catálogos e delivery"],
  },
];

const cases = [
  {
    title: "Delivery e Pedidos",
    desc: "Apps para restaurantes, farmacias e comercios com carrinho, pagamento e rastreio.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    title: "Marketplace",
    desc: "Plataformas que conectam compradores e vendedores com gestao de pedidos.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
  {
    title: "Agendamento",
    desc: "Apps para clinicas, saloes e profissionais com agenda, notificacoes e pagamento.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Gestao Interna",
    desc: "Apps para equipes com controle de tarefas, ponto eletronico e comunicacao.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: "Educacao",
    desc: "Plataformas de cursos, aulas ao vivo e gamificacao do aprendizado.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Saude e Fitness",
    desc: "Apps de acompanhamento, treinos, dietas e telemedicina.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

export default function AplicativosPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-40 left-1/2 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-6">
                Aplicativos
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Seu negócio no{" "}
                <span className="text-secondary">bolso do cliente</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
                Desenvolvemos aplicativos para Android e iOS que encantam usuários
                e geram resultados. Do MVP ao app completo, transformamos sua ideia em realidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Tenho uma ideia de aplicativo e gostaria de saber como vocês podem me ajudar.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors text-center"
                >
                  Quero Meu App
                </a>
                <Link href="/portfolio" className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center">
                  Ver Projetos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tipos de App */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Qual tipo de app é ideal para você?
              </h2>
              <p className="text-muted-foreground text-lg">
                Ajudamos você a escolher a melhor abordagem para seu projeto e orçamento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {appTypes.map((type) => (
                <div key={type.title} className="rounded-2xl p-7 border border-border hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-foreground mb-3">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{type.description}</p>
                  <ul className="space-y-2">
                    {type.pros.map((pro) => (
                      <li key={pro} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground/80">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Casos de Uso */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Apps para diversos segmentos
              </h2>
              <p className="text-muted-foreground text-lg">
                Já desenvolvemos apps para diferentes mercados. Veja alguns exemplos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((c) => (
                <div key={c.title} className="group bg-white rounded-2xl p-6 border border-border/50 hover:shadow-lg hover:border-primary/10 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {c.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processo */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Da ideia ao app publicado
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { n: "1", title: "Ideia", desc: "Entendemos sua visão" },
                { n: "2", title: "UX/UI", desc: "Desenhamos as telas" },
                { n: "3", title: "Código", desc: "Desenvolvemos o app" },
                { n: "4", title: "Testes", desc: "Validamos tudo" },
                { n: "5", title: "Lançamento", desc: "Publicamos nas lojas" },
              ].map((step) => (
                <div key={step.n} className="text-center p-5 rounded-2xl bg-muted">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mx-auto mb-3">
                    {step.n}
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Tem uma ideia de app?
            </h2>
            <p className="text-white/70 mb-8">
              Conte-nos sobre seu projeto. Fazemos uma análise gratuita de viabilidade e orçamento.
            </p>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Tenho uma ideia de app e gostaria de uma análise de viabilidade e orçamento.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors"
            >
              Falar Sobre Meu App
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
