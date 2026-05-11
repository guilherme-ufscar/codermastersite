import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media & Design",
  description:
    "Gestão de redes sociais, criação de conteúdo, identidade visual e design gráfico. Sua marca com presença profissional nas redes.",
};

const socialServices = [
  {
    title: "Gestão de Instagram",
    description: "Feed, Stories, Reels e interação com seguidores. Conteúdo estratégico para engajar e vender.",
    includes: ["12-20 posts/mês", "Stories diários", "Reels semanais", "Interação com seguidores", "Relatório mensal"],
  },
  {
    title: "Gestão de Facebook",
    description: "Publicações, eventos e comunidade. Mantenha sua página ativa e relevante.",
    includes: ["12-16 posts/mês", "Gestão de comentários", "Eventos e promoções", "Integração com Instagram", "Relatório mensal"],
  },
  {
    title: "Gestão Completa",
    description: "Instagram + Facebook + LinkedIn. Presença consistente em todas as plataformas.",
    includes: ["Todas as redes", "Planejamento mensal", "Calendário editorial", "Copywriting", "Relatório completo"],
  },
];

const designServices = [
  { title: "Identidade Visual", desc: "Logo, paleta de cores, tipografia e manual de marca completo.", icon: "🎨" },
  { title: "Logotipo", desc: "Criação de logo profissional que representa a essência do seu negócio.", icon: "✨" },
  { title: "Cartão de Visita", desc: "Design de cartão de visita moderno e memorável.", icon: "💳" },
  { title: "Papelaria", desc: "Timbrado, envelope, pasta e materiais impressos.", icon: "📄" },
  { title: "Embalagens", desc: "Design de embalagens que destacam seu produto na prateleira.", icon: "📦" },
  { title: "Materiais Digitais", desc: "Banners, thumbnails, capas e materiais para redes sociais.", icon: "🖼️" },
];

export default function SocialMediaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-6">
                Social Media & Design
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Sua marca com{" "}
                <span className="text-secondary">presença profissional</span> nas redes
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
                Criação de conteúdo, identidade visual e gestão de redes sociais para
                sua marca se destacar, conectar com seu público e vender mais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contato" className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors text-center">
                  Quero Gestão de Redes
                </Link>
                <Link href="/portfolio" className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center">
                  Ver Trabalhos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Gestão de Redes Sociais
              </h2>
              <p className="text-muted-foreground text-lg">
                Conteúdo estratégico que engaja, conecta e converte seguidores em clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {socialServices.map((service, i) => (
                <div key={service.title} className={`rounded-2xl p-7 ${i === 2 ? "bg-primary text-white" : "border border-border"}`}>
                  {i === 2 && (
                    <span className="inline-block px-3 py-1 bg-secondary text-primary-dark text-xs font-bold rounded-full mb-4">
                      Mais Popular
                    </span>
                  )}
                  <h3 className={`text-xl font-bold mb-3 ${i === 2 ? "text-white" : "text-foreground"}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm mb-5 ${i === 2 ? "text-white/70" : "text-muted-foreground"}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <svg className={`w-4 h-4 flex-shrink-0 ${i === 2 ? "text-secondary" : "text-primary"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={i === 2 ? "text-white/90" : "text-foreground/80"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Design Gráfico & Identidade Visual
              </h2>
              <p className="text-muted-foreground text-lg">
                Uma marca forte começa com um design profissional. Criamos a identidade que seu negócio merece.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designServices.map((service) => (
                <div key={service.title} className="bg-white rounded-2xl p-6 border border-border hover:shadow-md transition-shadow">
                  <span className="text-3xl mb-3 block">{service.icon}</span>
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processo */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Por que investir em <span className="text-primary">redes sociais</span>?
                </h2>
                <div className="space-y-5">
                  {[
                    { title: "Visibilidade", desc: "Mais de 150 milhões de brasileiros estão nas redes sociais. Seu público está lá." },
                    { title: "Autoridade", desc: "Conteúdo consistente posiciona sua marca como referência no mercado." },
                    { title: "Relacionamento", desc: "Construa uma comunidade engajada que confia e compra de você." },
                    { title: "Vendas", desc: "Redes sociais são o novo ponto de venda. Quem não está, perde clientes." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl p-8">
                <h3 className="font-semibold text-foreground mb-6 text-center">O que entregamos</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Posts/mês", value: "12-20" },
                    { label: "Stories/semana", value: "15-30" },
                    { label: "Reels/mês", value: "4-8" },
                    { label: "Relatórios", value: "Mensal" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Pronto para profissionalizar suas redes?
            </h2>
            <p className="text-white/70 mb-8">
              Solicite uma proposta personalizada. Analisamos seu perfil e sugerimos a melhor estratégia.
            </p>
            <Link href="/contato" className="inline-block px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors">
              Solicitar Proposta
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
