export default function SocialMediaSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-border">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground text-sm">Instagram</h4>
                <p className="text-xs text-muted-foreground mt-1">Feed, Stories e Reels</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-border">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground text-sm">Facebook</h4>
                <p className="text-xs text-muted-foreground mt-1">Posts e Anúncios</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-border">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground text-sm">Design Gráfico</h4>
                <p className="text-xs text-muted-foreground mt-1">Identidade Visual</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-border">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2m0 2a2 2 0 012 2v1a2 2 0 01-2 2 2 2 0 01-2-2V6a2 2 0 012-2zm0 10v2m0-2a2 2 0 01-2-2v-1a2 2 0 012-2 2 2 0 012 2v1a2 2 0 01-2 2zM17 4v2m0-2a2 2 0 00-2 2v1a2 2 0 002 2 2 2 0 002-2V6a2 2 0 00-2-2zm0 10v2m0-2a2 2 0 002-2v-1a2 2 0 00-2-2 2 2 0 00-2 2v1a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground text-sm">Conteúdo</h4>
                <p className="text-xs text-muted-foreground mt-1">Planejamento Mensal</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block px-3 py-1 bg-secondary/20 text-primary text-sm font-medium rounded-full mb-4">
              Social Media & Design
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Sua marca com{" "}
              <span className="text-primary">presença profissional</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Criação de conteúdo, identidade visual e gestão de redes sociais
              para sua marca se destacar e conectar com seu público.
            </p>
            <ul className="space-y-3">
              {[
                "Criação de posts, stories e reels",
                "Identidade visual e logotipo",
                "Planejamento de conteúdo mensal",
                "Relatórios de desempenho",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                  <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
