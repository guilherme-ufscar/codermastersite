import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";

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

  const data: any = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.email !== undefined) data.email = body.email;
  if (body.active !== undefined) data.active = body.active;

  if (body.password) {
    data.password = await bcrypt.hash(body.password, 12);
  }

  const client = await prisma.user.update({
    where: { id },
    data,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.ticketMessage.deleteMany({ where: { userId: id } });
  await prisma.ticket.deleteMany({ where: { userId: id } });
  await prisma.invoice.deleteMany({ where: { userId: id } });
  await prisma.clientHostingLimits.deleteMany({ where: { userId: id } });
  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
