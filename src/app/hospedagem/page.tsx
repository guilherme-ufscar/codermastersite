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
  {
    title: "SSL Grátis (HTTPS)",
    desc: "Certificado de segurança incluso para seu site ter o cadeado verde.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Backup Automático",
    desc: "Seus dados protegidos com backups diários automáticos.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: "Painel cPanel",
    desc: "Gerencie emails, arquivos e bancos de dados com facilidade.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "E-mail Profissional",
    desc: "Contas de email com seu domínio (ex: contato@suaempresa.com.br).",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Uptime 99.9%",
    desc: "Seu site sempre no ar com servidores de alta disponibilidade.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Proteção DDoS",
    desc: "Firewall e proteção contra ataques para manter seu site seguro.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Suporte Técnico",
    desc: "Equipe pronta para ajudar via ticket, email ou WhatsApp.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: "Banco de Dados MySQL",
    desc: "Bancos de dados para seu site ou sistema funcionar perfeitamente.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
      </svg>
    ),
  },
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
                <div key={f.title} className="group p-5 rounded-2xl border border-border/50 bg-gradient-to-br from-white to-muted/30 hover:shadow-lg hover:border-primary/10 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {f.icon}
                  </div>
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
