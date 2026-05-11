import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: { title: true, metaTitle: true, metaDescription: true, excerpt: true },
    });
    if (!post) return {};
    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || "",
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    });
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 pt-20 lg:pt-24">
        <article className="py-12 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {post.publishedAt && (
              <time className="text-sm text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-8">
              {post.title}
            </h1>

            {post.coverImage && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
