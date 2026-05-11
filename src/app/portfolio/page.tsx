import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Conheça os projetos desenvolvidos pela Coder Master. Sites, lojas virtuais, sistemas e aplicativos para diversos segmentos.",
};

async function getPortfolioData() {
  try {
    const [items, categories] = await Promise.all([
      prisma.portfolioItem.findMany({
        include: { category: true },
        orderBy: { order: "asc" },
      }),
      prisma.portfolioCategory.findMany({
        orderBy: { name: "asc" },
      }),
    ]);
    return { items, categories };
  } catch {
    return { items: [], categories: [] };
  }
}

export default async function PortfolioPage() {
  const { items, categories } = await getPortfolioData();

  return (
    <>
      <Header />
      <main className="flex-1 pt-20 lg:pt-24">
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Nosso <span className="text-primary">Portfólio</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Projetos reais que entregam resultados. Conheça o trabalho que
                fazemos para nossos clientes.
              </p>
            </div>

            <PortfolioGrid items={items} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
