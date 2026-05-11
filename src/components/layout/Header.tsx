"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const WA = "5519995476892";

const services = [
  { href: "/criacao-de-sites", label: "Criação de Sites" },
  { href: "/sistemas-web", label: "Sistemas Web" },
  { href: "/aplicativos", label: "Aplicativos" },
  { href: "/hospedagem", label: "Hospedagem e Domínio" },
  { href: "/marketing-digital", label: "Marketing Digital" },
  { href: "/social-media", label: "Social Media & Design" },
];

const navLinks = [
  { href: "/", label: "Início" },
  { href: "#servicos", label: "Serviços", dropdown: services },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.svg"
              alt="Coder Master"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <span className="text-xl font-bold text-primary hidden sm:block">
              Coder Master
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 py-2">
                    {link.label}
                    <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 pt-1 w-56">
                      <div className="bg-white rounded-xl shadow-lg border border-border py-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Entrar
            </Link>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento gratuito.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
            >
              Orçamento Grátis
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-4 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block py-2 text-base font-medium text-foreground/80 hover:text-primary">
              Início
            </Link>
            <div className="py-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Serviços</p>
              {services.map((s) => (
                <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)} className="block py-2 pl-3 text-sm text-foreground/80 hover:text-primary">
                  {s.label}
                </Link>
              ))}
            </div>
            <Link href="/portfolio" onClick={() => setMobileOpen(false)} className="block py-2 text-base font-medium text-foreground/80 hover:text-primary">
              Portfólio
            </Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="block py-2 text-base font-medium text-foreground/80 hover:text-primary">
              Blog
            </Link>
            <Link href="/contato" onClick={() => setMobileOpen(false)} className="block py-2 text-base font-medium text-foreground/80 hover:text-primary">
              Contato
            </Link>
            <div className="pt-3 border-t border-border space-y-3">
              <Link href="/login" className="block text-base font-medium text-primary">
                Entrar
              </Link>
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento gratuito.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-2.5 bg-primary text-white font-semibold rounded-lg"
              >
                Orçamento Grátis
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
