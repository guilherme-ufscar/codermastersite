import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criação de Sites Profissionais",
  description:
    "Criação de sites institucionais, landing pages e lojas virtuais. Design moderno, responsivo e otimizado para Google. Transforme visitantes em clientes.",
};

const WA = "5519995476892";

const types = [
  {
    title: "Site Institucional",
    description: "Apresente sua empresa de forma profissional na internet. Ideal para quem está começando e precisa de credibilidade online.",
    features: ["Até 5 páginas", "Design exclusivo", "Responsivo (celular e desktop)", "Formulário de contato", "Integração WhatsApp", "Otimizado para Google"],
    price: "A partir de R$ 1.497",
  },
  {
    title: "Landing Page",
    description: "Página única focada em conversão. Perfeita para campanhas de marketing, lançamentos e captação de leads.",
    features: ["1 página otimizada", "Foco em conversão", "Carregamento ultra-rápido", "A/B testing ready", "Integração com ferramentas", "Entrega em 7 dias"],
    price: "A partir de R$ 897",
  },
  {
    title: "Loja Virtual",
    description: "Venda seus produtos 24h por dia. E-commerce completo com carrinho, pagamento online e gestão de estoque.",
    features: ["Catálogo ilimitado", "Carrinho e checkout", "Pix, cartão e boleto", "Controle de estoque", "Painel administrativo", "Integração com correios"],
    price: "A partir de R$ 2.997",
  },
];

const process_steps = [
  { step: "01", title: "Briefing", description: "Entendemos seu negócio, público-alvo e objetivos para criar a estratégia ideal." },
  { step: "02", title: "Design", description: "Criamos o layout visual do seu site com base nas melhores práticas de UX/UI." },
  { step: "03", title: "Desenvolvimento", description: "Transformamos o design em código, com performance e SEO otimizados." },
  { step: "04", title: "Lançamento", description: "Publicamos seu site, configuramos domínio, SSL e fazemos os ajustes finais." },
];

export default function CriacaoDeSitesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-6">
                Criação de Sites
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Seu site profissional que{" "}
                <span className="text-secondary">converte visitantes em clientes</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
                Desenvolvemos sites modernos, rápidos e otimizados para o Google.
                Do institucional à loja virtual, criamos a presença online que seu
                negócio merece.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Tenho interesse em criar um site profissional. Gostaria de saber mais sobre valores e prazos.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors text-center"
                >
                  Solicitar Orçamento
                </a>
                <Link href="/portfolio" className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center">
                  Ver Portfólio
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tipos de Site */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Qual tipo de site você precisa?
              </h2>
              <p className="text-muted-foreground text-lg">
                Cada negócio tem uma necessidade diferente. Escolha o formato ideal para o seu momento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {types.map((type, i) => (
                <div key={type.title} className={`rounded-2xl p-7 ${i === 2 ? "bg-primary text-white" : "bg-white border border-border"}`}>
                  <h3 className={`text-xl font-bold mb-3 ${i === 2 ? "text-white" : "text-foreground"}`}>
                    {type.title}
                  </h3>
                  <p className={`text-sm mb-5 leading-relaxed ${i === 2 ? "text-white/70" : "text-muted-foreground"}`}>
                    {type.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {type.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <svg className={`w-4 h-4 flex-shrink-0 ${i === 2 ? "text-secondary" : "text-primary"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={i === 2 ? "text-white/90" : "text-foreground/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={`text-lg font-bold ${i === 2 ? "text-secondary" : "text-primary"}`}>{type.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processo */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Como funciona
              </h2>
              <p className="text-muted-foreground text-lg">
                Um processo simples e transparente do início ao lançamento.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process_steps.map((step) => (
                <div key={step.step} className="bg-white rounded-2xl p-6 border border-border">
                  <span className="text-4xl font-bold text-primary/10">{step.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Por que escolher a <span className="text-primary">Coder Master</span>?
                </h2>
                <div className="space-y-5">
                  {[
                    { title: "Design Exclusivo", desc: "Nada de templates prontos. Cada site é criado do zero para o seu negócio." },
                    { title: "Otimizado para Google", desc: "SEO técnico aplicado desde o início para você aparecer nas buscas." },
                    { title: "Responsivo", desc: "Funciona perfeitamente em celulares, tablets e computadores." },
                    { title: "Suporte Contínuo", desc: "Não te abandonamos após a entrega. Suporte técnico incluso." },
                    { title: "Entrega Rápida", desc: "Sites prontos em 7 a 15 dias úteis, dependendo da complexidade." },
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
              <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl p-10 text-center">
                <p className="text-6xl font-bold text-primary mb-2">+200</p>
                <p className="text-muted-foreground">sites entregues</p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-2xl font-bold text-primary">98%</p>
                    <p className="text-xs text-muted-foreground">satisfação</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-2xl font-bold text-primary">15d</p>
                    <p className="text-xs text-muted-foreground">prazo médio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {[
                { q: "Quanto tempo leva para criar um site?", a: "Sites institucionais ficam prontos em 7 a 15 dias úteis. Lojas virtuais podem levar de 15 a 30 dias, dependendo da complexidade." },
                { q: "Preciso ter domínio e hospedagem?", a: "Não se preocupe! Cuidamos de tudo: registro de domínio, hospedagem e configuração. Você só precisa aprovar o design." },
                { q: "O site fica responsivo (funciona no celular)?", a: "Sim! Todos os nossos sites são 100% responsivos e testados em diversos dispositivos." },
                { q: "Vocês fazem manutenção depois?", a: "Sim! Oferecemos planos de manutenção mensal para atualizações, backups e suporte técnico contínuo." },
              ].map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Pronto para ter seu site profissional?
            </h2>
            <p className="text-white/70 mb-8">
              Solicite um orçamento gratuito e sem compromisso. Respondemos em até 24h.
            </p>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Quero criar meu site profissional. Podem me passar um orçamento?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors"
            >
              Quero Meu Site
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
