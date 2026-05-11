import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DomainCheck from "@/components/home/DomainCheck";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospedagem e Domínio",
  description:
    "Hospedagem profissional com SSL grátis, backup automático e suporte técnico. Plano completo por 12x de R$29,99. Registro de domínios .com.br, .com e mais.",
};

const WA = "5519995476892";

const features = [
  { title: "SSL Grátis (HTTPS)", desc: "Certificado de segurança incluso para seu site ter o cadeado verde.", icon: "🔒" },
  { title: "Backup Automático", desc: "Seus dados protegidos com backups diários automáticos.", icon: "💾" },
  { title: "Painel cPanel", desc: "Gerencie emails, arquivos e bancos de dados com facilidade.", icon: "⚙️" },
  { title: "E-mail Profissional", desc: "Contas de email com seu domínio (ex: contato@suaempresa.com.br).", icon: "📧" },
  { title: "Uptime 99.9%", desc: "Seu site sempre no ar com servidores de alta disponibilidade.", icon: "🟢" },
  { title: "Proteção DDoS", desc: "Firewall e proteção contra ataques para manter seu site seguro.", icon: "🛡️" },
  { title: "Suporte Técnico", desc: "Equipe pronta para ajudar via ticket, email ou WhatsApp.", icon: "🎧" },
  { title: "Banco de Dados MySQL", desc: "Bancos de dados para seu site ou sistema funcionar perfeitamente.", icon: "🗄️" },
];

const domainExtensions = [
  { ext: ".com.br", desc: "Ideal para empresas brasileiras" },
  { ext: ".com", desc: "Presença global" },
  { ext: ".net", desc: "Tecnologia e redes" },
  { ext: ".store", desc: "Lojas virtuais" },
  { ext: ".app", desc: "Aplicativos" },
  { ext: ".dev", desc: "Desenvolvedores" },
];

export default function HospedagemPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-6">
                  Hospedagem + Domínio
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  Hospedagem rápida e segura por{" "}
                  <span className="text-secondary">12x de R$ 29,99</span>
                </h1>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  Tudo que você precisa para manter seu site no ar: velocidade, segurança,
                  email profissional e suporte técnico. Sem surpresas.
                </p>
                <a
                  href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Quero contratar o plano de hospedagem de 12x R$29,99. Como faço?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors"
                >
                  Contratar Agora
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-2">Plano Completo</p>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-white/70 text-lg">12x de</span>
                    <span className="text-5xl font-bold text-secondary">R$ 29,99</span>
                  </div>
                  <p className="text-white/40 text-xs mb-6">no cartão + taxas da operadora | à vista R$ 310,00</p>
                  <div className="space-y-2 text-left">
                    {["SSL Grátis", "Backup diário", "cPanel", "E-mail profissional", "MySQL", "Suporte técnico", "Uptime 99.9%", "Anti-DDoS"].map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white/90 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Tudo incluso no plano
              </h2>
              <p className="text-muted-foreground text-lg">
                Sem pegadinhas, sem custos extras. Tudo que seu site precisa em um único plano.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div key={f.title} className="p-5 rounded-2xl border border-border hover:shadow-md transition-shadow">
                  <span className="text-2xl mb-3 block">{f.icon}</span>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Domain Check */}
        <DomainCheck />

        {/* Extensões */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Registramos todas as extensões
              </h2>
              <p className="text-muted-foreground text-lg">
                Encontre o domínio perfeito para sua marca.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {domainExtensions.map((d) => (
                <div key={d.ext} className="bg-white rounded-xl p-4 text-center border border-border">
                  <p className="text-xl font-bold text-primary">{d.ext}</p>
                  <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
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
                { q: "O que está incluso no plano de hospedagem?", a: "SSL, backup, cPanel, contas de email, banco de dados MySQL, proteção DDoS e suporte técnico. Tudo por 12x de R$29,99." },
                { q: "Posso migrar meu site de outra hospedagem?", a: "Sim! Fazemos a migração gratuitamente. Basta nos fornecer os dados de acesso da hospedagem atual." },
                { q: "Quantos emails posso criar?", a: "O plano inclui contas de email com seu domínio. A quantidade depende do espaço contratado. Fale conosco para detalhes." },
                { q: "E se eu precisar de mais recursos?", a: "Montamos planos personalizados para quem precisa de mais espaço, banda ou recursos dedicados. Entre em contato!" },
                { q: "Como funciona o registro de domínio?", a: "Registramos o domínio em seu nome (você é o titular). O valor do domínio é cobrado separadamente, a partir de R$40/ano para .com.br." },
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
              Coloque seu site no ar hoje mesmo
            </h2>
            <p className="text-white/70 mb-8">
              Hospedagem profissional por apenas 12x de R$29,99. Migração gratuita inclusa.
            </p>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Quero contratar a hospedagem profissional. Podem me ajudar com a migração?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors"
            >
              Contratar Hospedagem
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
