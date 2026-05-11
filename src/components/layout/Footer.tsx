import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/favicon.svg"
                alt="Coder Master"
                width={32}
                height={32}
                className="w-8 h-8 brightness-0 invert"
              />
              <span className="text-lg font-bold">Coder Master</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Transformamos ideias em soluções digitais. Sites, sistemas,
              aplicativos e hospedagem para o seu negócio crescer online.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-secondary mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/#servicos" className="hover:text-white transition-colors">
                  Criação de Sites
                </Link>
              </li>
              <li>
                <Link href="/#servicos" className="hover:text-white transition-colors">
                  Sistemas Web
                </Link>
              </li>
              <li>
                <Link href="/#servicos" className="hover:text-white transition-colors">
                  Aplicativos
                </Link>
              </li>
              <li>
                <Link href="/#hospedagem" className="hover:text-white transition-colors">
                  Hospedagem
                </Link>
              </li>
              <li>
                <Link href="/#marketing" className="hover:text-white transition-colors">
                  Marketing Digital
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-secondary mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-secondary mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>contato@codermaster.com.br</li>
              <li>
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Coder Master. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <Link href="/privacidade" className="hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-white transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
