const testimonials = [
  {
    name: "Maria Silva",
    role: "Proprietária - Loja de Roupas",
    content:
      "Minha loja virtual ficou incrível! As vendas online já representam 40% do meu faturamento. Recomendo demais a Coder Master.",
  },
  {
    name: "Carlos Oliveira",
    role: "Diretor - Clínica Médica",
    content:
      "O site ficou profissional e moderno. Nossos pacientes elogiam a facilidade de agendar consultas online. Excelente trabalho!",
  },
  {
    name: "Ana Rodrigues",
    role: "CEO - Startup de Tecnologia",
    content:
      "Desenvolveram nosso sistema em tempo recorde e com qualidade excepcional. O suporte é rápido e eficiente.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes{" "}
            <span className="text-primary">dizem</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A satisfação dos nossos clientes é o nosso maior resultado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div>
                <p className="font-semibold text-foreground text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
