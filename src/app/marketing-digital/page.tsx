import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Digital",
  description:
    "Gestão de tráfego pago, SEO e Google Ads. Atraia clientes qualificados e aumente suas vendas com estratégias digitais comprovadas.",
};

const services = [
  {
    title: "Google Ads",
    description: "Apareça no topo do Google quando seus clientes pesquisarem por seus produtos ou serviços.",
    benefits: ["Resultados imediatos", "Segmentação precisa", "Controle total do orçamento", "Relatórios detalhados"],
    icon: "🎯",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    description: "Alcance seu público ideal nas redes sociais com anúncios visuais e envolventes.",
    benefits: ["Alcance massivo", "Segmentação por interesses", "Remarketing", "Formatos criativos"],
    icon: "📱",
  },
  {
    title: "SEO (Otimização para Google)",
    description: "Apareça nas primeiras posições do Google de forma orgânica e gratuita, sem pagar por clique.",
    benefits: ["Tráfego gratuito e constante", "Credibilidade", "Resultados de longo prazo", "Menor custo por lead"],
    icon: "🔍",
  },
  {
    title: "Gestão de Tráfego",
    description: "Estratégia completa de mídia paga com otimização contínua para maximizar seu retorno.",
    benefits: ["Estratégia personalizada", "Otimização diária", "Testes A/B", "Relatórios semanais"],
    icon: "📊",
  },
];

const results = [
  { metric: "+127%", label: "Aumento médio em tráfego" },
  { metric: "+85%", label: "Mais leads qualificados" },
  { metric: "3.5x", label: "Retorno sobre investimento" },
  { metric: "-40%", label: "Redução no custo por lead" },
];

export default function MarketingDigitalPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-6">
                Marketing Digital
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Atraia clientes certos com{" "}
                <span className="text-secondary">estratégias que funcionam</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
                Não basta ter um site bonito. Você precisa que as pessoas certas encontrem
                seu negócio. Cuidamos do tráfego pago e SEO para você focar no que importa: vender.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contato" className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors text-center">
                  Quero Mais Clientes
                </Link>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center">
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section className="py-12 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((r) => (
                <div key={r.label} className="text-center">
                  <p className="text-3xl lg:text-4xl font-bold text-primary">{r.metric}</p>
                  <p className="text-sm text-muted-foreground mt-1">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Nossos serviços de marketing
              </h2>
              <p className="text-muted-foreground text-lg">
                Estratégias comprovadas para cada etapa do funil de vendas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div key={service.title} className="rounded-2xl p-7 border border-border hover:shadow-lg transition-shadow">
                  <span className="text-3xl mb-4 block">{service.icon}</span>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground/80">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Como trabalhamos
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { n: "01", title: "Diagnóstico", desc: "Analisamos seu mercado, concorrentes e público-alvo para definir a melhor estratégia." },
                { n: "02", title: "Execução", desc: "Criamos campanhas, otimizamos palavras-chave e gerenciamos seu investimento diariamente." },
                { n: "03", title: "Resultados", desc: "Relatórios transparentes com métricas claras. Você acompanha cada real investido." },
              ].map((step) => (
                <div key={step.n} className="bg-white rounded-2xl p-8 border border-border text-center">
                  <span className="text-5xl font-bold text-primary/10">{step.n}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-3 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {[
                { q: "Quanto preciso investir em anúncios?", a: "Recomendamos um mínimo de R$1.000/mês em mídia para ter resultados consistentes. O valor ideal depende do seu mercado e objetivos." },
                { q: "Em quanto tempo vejo resultados?", a: "Tráfego pago: resultados em 7-14 dias. SEO: resultados consistentes em 3-6 meses. Combinamos ambos para curto e longo prazo." },
                { q: "Vocês garantem resultados?", a: "Não prometemos números mágicos, mas garantimos transparência total e otimização contínua. Nossos clientes têm em média 3.5x de retorno." },
                { q: "Como funciona o relatório?", a: "Enviamos relatórios semanais com métricas de performance (cliques, conversões, custo por lead) e reuniões mensais de alinhamento." },
              ].map((faq) => (
                <div key={faq.q} className="bg-muted rounded-xl p-6">
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
              Pronto para atrair mais clientes?
            </h2>
            <p className="text-white/70 mb-8">
              Diagnóstico gratuito do seu marketing digital. Descubra onde você está perdendo clientes.
            </p>
            <Link href="/contato" className="inline-block px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors">
              Quero o Diagnóstico Grátis
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
