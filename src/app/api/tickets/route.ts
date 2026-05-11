import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getResend, FROM_EMAIL } from "@/lib/resend";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any)?.role;
  const where: any = {};

  if (role === "CLIENT") {
    where.userId = (session.user as any).id;
  }

  const tickets = await prisma.ticket.findMany({
    where,
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { messages: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(tickets);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { subject, category, message } = body;
  const userId = (session.user as any).id;

  const ticket = await prisma.ticket.create({
    data: {
      userId,
      subject,
      category: category || "SUPPORT",
      messages: {
        create: {
          userId,
          content: message,
        },
      },
    },
    include: { user: true },
  });

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: "contato@codermaster.com.br",
      subject: `Novo ticket: ${subject}`,
      html: `
        <h2>Novo ticket aberto</h2>
        <p><strong>Cliente:</strong> ${ticket.user.name}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Categoria:</strong> ${category}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });
  } catch {}

  return NextResponse.json(ticket, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { ticketId, status, message } = body;

  const ticket = await prisma.ticket.update({
    where: { id: ticketId },
    data: { status },
    include: { user: true },
  });

  if (message) {
    await prisma.ticketMessage.create({
      data: {
        ticketId,
        userId: (session.user as any).id,
        content: message,
      },
    });
  }

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: ticket.user.email,
      subject: `Ticket atualizado: ${ticket.subject}`,
      html: `
        <h2>Seu ticket foi atualizado</h2>
        <p><strong>Assunto:</strong> ${ticket.subject}</p>
        <p><strong>Novo status:</strong> ${status}</p>
        ${message ? `<p><strong>Resposta:</strong></p><p>${message}</p>` : ""}
        <p>Acesse: ${process.env.NEXT_PUBLIC_APP_URL}/cliente/tickets</p>
      `,
    });
  } catch {}

  return NextResponse.json(ticket);
}
