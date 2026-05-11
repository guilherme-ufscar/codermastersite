import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminBlogPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        publishedAt: true,
        createdAt: true,
      },
    });
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Blog</h1>
        <Link
          href="/admin/blog/novo"
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
        >
          + Novo Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {posts.length === 0 ? (
          <p className="p-6 text-center text-muted-foreground">
            Nenhum post criado ainda.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Título
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Data
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {post.title}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-sm text-primary hover:text-primary-light font-medium"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
