"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string | null;
  featured: boolean;
  category: { id: string; name: string; slug: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function PortfolioGrid({
  items,
  categories,
}: {
  items: PortfolioItem[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? items.filter((item) => item.category.id === activeCategory)
    : items;

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <span className="text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full">
                {item.category.name}
              </span>
              <h3 className="text-lg font-semibold text-foreground mt-3 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {item.description}
              </p>
              {item.link && (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light transition-colors"
                >
                  {item.link.endsWith(".pdf") ? "Ver Projeto (PDF)" : "Visitar Site"}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          Nenhum projeto encontrado nesta categoria.
        </p>
      )}
    </>
  );
}
