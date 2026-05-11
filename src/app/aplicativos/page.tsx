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
  { title: "Delivery e Pedidos", desc: "Apps para restaurantes, farmácias e comércios com carrinho, pagamento e rastreio." },
  { title: "Marketplace", desc: "Plataformas que conectam compradores e vendedores com gestão de pedidos." },
  { title: "Agendamento", desc: "Apps para clínicas, salões e profissionais com agenda, notificações e pagamento." },
  { title: "Gestão Interna", desc: "Apps para equipes com controle de tarefas, ponto eletrônico e comunicação." },
  { title: "Educação", desc: "Plataformas de cursos, aulas ao vivo e gamificação do aprendizado." },
  { title: "Saúde e Fitness", desc: "Apps de acompanhamento, treinos, dietas e telemedicina." },
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
                <div key={c.title} className="bg-white rounded-2xl p-6 border border-border">
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
