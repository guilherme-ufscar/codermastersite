const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Dono de Restaurante",
    text: "Meu site ficou incrível e as vendas pelo delivery aumentaram 40% no primeiro mês. Recomendo demais!",
    rating: 5,
  },
  {
    name: "Ana Paula Silva",
    role: "Advogada",
    text: "Profissionais sérios e competentes. Meu site institucional ficou exatamente como eu imaginava. Atendimento nota 10.",
    rating: 5,
  },
  {
    name: "Roberto Almeida",
    role: "E-commerce de Roupas",
    text: "A loja virtual que fizeram para mim é rápida, bonita e fácil de gerenciar. Já recuperei o investimento.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/[0.02] rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-secondary/[0.03] rounded-full blur-3xl translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-primary text-xs font-semibold mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            DEPOIMENTOS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes <span className="text-primary">dizem</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Mais de 200 projetos entregues com satisfação garantida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative p-6 lg:p-7 rounded-2xl border border-border/50 bg-gradient-to-br from-white to-muted/30 hover:shadow-lg transition-shadow"
            >
              {/* Quote icon */}
              <svg className="absolute top-6 right-6 w-8 h-8 text-primary/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ))}
              </div>

              <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
