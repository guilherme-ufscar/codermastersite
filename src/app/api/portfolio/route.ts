import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const [items, categories] = await Promise.all([
    prisma.portfolioItem.findMany({
      include: { category: true },
      orderBy: { order: "asc" },
    }),
    prisma.portfolioCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  return NextResponse.json({ items, categories });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const item = await prisma.portfolioItem.create({
    data: {
      title: body.title,
      description: body.description,
      image: body.image,
      link: body.link || null,
      featured: body.featured || false,
      order: body.order || 0,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(item, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.portfolioItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
