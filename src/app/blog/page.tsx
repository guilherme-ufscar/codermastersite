import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Dicas, tutoriais e novidades sobre criação de sites, marketing digital e tecnologia.",
};

async function getBlogPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Header />
      <main className="flex-1 pt-20 lg:pt-24">
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                <span className="text-primary">Blog</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Conteúdo gratuito para ajudar seu negócio a crescer online.
              </p>
            </div>

            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                Nenhum post publicado ainda. Volte em breve!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
                  >
                    {post.coverImage && (
                      <div className="aspect-[16/9] bg-muted overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      {post.publishedAt && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                      <h2 className="text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
