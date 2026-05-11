import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const userId = (session.user as any)?.id;

  const ticket = await prisma.ticket.findUnique({ where: { id } });
  if (!ticket) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const role = (session.user as any)?.role;
  if (role === "CLIENT" && ticket.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const message = await prisma.ticketMessage.create({
    data: {
      ticketId: id,
      userId,
      content: body.content,
    },
  });

  await prisma.ticket.update({
    where: { id },
    data: { updatedAt: new Date() },
  });

  return NextResponse.json(message, { status: 201 });
}
