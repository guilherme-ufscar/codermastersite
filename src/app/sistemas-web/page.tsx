import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistemas Web Personalizados",
  description:
    "Desenvolvimento de sistemas web sob medida para automatizar processos, gerenciar dados e aumentar a produtividade do seu negócio.",
};

const WA = "5519995476892";

const solutions = [
  {
    title: "CRM e Gestão de Clientes",
    description: "Organize seus contatos, acompanhe negociações e automatize o relacionamento com clientes.",
    icon: "👥",
  },
  {
    title: "ERP e Gestão Empresarial",
    description: "Integre finanças, estoque, vendas e RH em um único sistema personalizado.",
    icon: "📊",
  },
  {
    title: "Agendamento Online",
    description: "Sistema de agendamento para clínicas, salões, consultórios e prestadores de serviço.",
    icon: "📅",
  },
  {
    title: "Painel Administrativo",
    description: "Dashboards e painéis de controle para visualizar métricas e tomar decisões.",
    icon: "📈",
  },
  {
    title: "Automação de Processos",
    description: "Elimine tarefas repetitivas com workflows automatizados e integrações.",
    icon: "⚡",
  },
  {
    title: "Portal do Cliente",
    description: "Área exclusiva para seus clientes acessarem documentos, faturas e suporte.",
    icon: "🔐",
  },
];

const techs = [
  "React / Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB",
  "REST APIs", "Docker", "AWS / Cloud", "Integrações (PIX, NFe, WhatsApp)",
];

export default function SistemasWebPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-10 left-20 w-80 h-80 bg-secondary rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-6">
                Sistemas Web
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Sistemas sob medida que{" "}
                <span className="text-secondary">automatizam seu negócio</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
                Chega de planilhas e processos manuais. Desenvolvemos sistemas web
                personalizados que resolvem problemas reais e aumentam sua produtividade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Preciso de um sistema web personalizado para meu negócio. Podemos conversar?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors text-center"
                >
                  Solicitar Orçamento
                </a>
                <Link href="/portfolio" className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center">
                  Ver Projetos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Soluções */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Soluções que desenvolvemos
              </h2>
              <p className="text-muted-foreground text-lg">
                Cada sistema é único, mas aqui estão alguns dos tipos mais comuns que criamos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((sol) => (
                <div key={sol.title} className="group p-6 rounded-2xl border border-border hover:border-primary/20 hover:shadow-lg transition-all">
                  <span className="text-3xl mb-4 block">{sol.icon}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{sol.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{sol.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Do problema à solução em <span className="text-primary">4 etapas</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { n: "1", title: "Análise", desc: "Mapeamos seus processos atuais e identificamos gargalos e oportunidades de automação." },
                    { n: "2", title: "Prototipação", desc: "Criamos protótipos navegáveis para você validar antes de desenvolver." },
                    { n: "3", title: "Desenvolvimento", desc: "Construímos o sistema com tecnologias modernas, escaláveis e seguras." },
                    { n: "4", title: "Implantação", desc: "Colocamos no ar, treinamos sua equipe e oferecemos suporte contínuo." },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                        {step.n}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Tecnologias que usamos</h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-primary/5 text-primary text-sm font-medium rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Investimento:</strong> Cada projeto é orçado individualmente com base na complexidade. Solicite uma proposta sem compromisso.
                  </p>
                </div>
              </div>
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
                { q: "Quanto custa um sistema web?", a: "Depende da complexidade. Sistemas simples começam em R$ 5.000 e podem chegar a R$ 50.000+ para ERPs completos. Fazemos orçamento detalhado após entender suas necessidades." },
                { q: "Quanto tempo leva para desenvolver?", a: "Sistemas simples: 30-60 dias. Sistemas médios: 60-120 dias. Sistemas complexos: 3-6 meses. Entregamos em sprints para você acompanhar a evolução." },
                { q: "Vocês fazem manutenção e suporte?", a: "Sim! Oferecemos contratos de manutenção mensal que incluem correções, atualizações de segurança e pequenas melhorias." },
                { q: "O sistema fica hospedado onde?", a: "Hospedamos em servidores cloud (AWS, Google Cloud ou nossos próprios servidores) com backup automático e alta disponibilidade." },
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
              Tem um processo que precisa ser automatizado?
            </h2>
            <p className="text-white/70 mb-8">
              Conte-nos o problema e propomos a solução. Orçamento gratuito e sem compromisso.
            </p>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Tenho um processo que preciso automatizar. Podem me ajudar com um sistema web?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-dark transition-colors"
            >
              Solicitar Proposta
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
