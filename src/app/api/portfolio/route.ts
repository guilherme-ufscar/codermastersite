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

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const item = await prisma.portfolioItem.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      link: data.link || null,
      featured: data.featured || false,
      order: data.order || 0,
      categoryId: data.categoryId,
    },
  });

  return NextResponse.json(item);
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items } = body;

  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await prisma.$transaction(
    items.map((item: { id: string; order: number }) =>
      prisma.portfolioItem.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );

  return NextResponse.json({ success: true });
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
