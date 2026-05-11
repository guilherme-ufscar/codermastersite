import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const client = await prisma.user.findUnique({
    where: { id },
    include: { hostingLimits: true },
  });

  if (!client) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(client);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const client = await prisma.user.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
      active: body.active,
    },
  });

  if (body.hostingLimits) {
    await prisma.clientHostingLimits.upsert({
      where: { userId: id },
      update: body.hostingLimits,
      create: { userId: id, ...body.hostingLimits },
    });
  }

  return NextResponse.json(client);
}
