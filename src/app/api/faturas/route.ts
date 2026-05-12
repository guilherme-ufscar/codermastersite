import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateRecurrenceDates } from "@/lib/recurrence";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const role = (session.user as any)?.role;

  const where: any = {};
  if (role === "CLIENT") {
    where.userId = (session.user as any).id;
  } else if (userId) {
    where.userId = userId;
  }

  const invoices = await prisma.invoice.findMany({
    where,
    include: { category: true, user: { select: { name: true, email: true } } },
    orderBy: { dueDate: "desc" },
  });

  return NextResponse.json(invoices);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    userId,
    categoryId,
    description,
    amount,
    dueDate,
    recurrence,
    recurrenceCount,
    paymentMethod,
    pixCode,
  } = body;

  const mainInvoice = await prisma.invoice.create({
    data: {
      userId,
      categoryId,
      description: description || null,
      amount,
      dueDate: new Date(dueDate),
      recurrence: recurrence || "ONE_TIME",
      recurrenceCount: recurrenceCount || 1,
      paymentMethod: paymentMethod || null,
      pixCode: pixCode || null,
    },
  });

  if (recurrence && recurrence !== "ONE_TIME" && recurrenceCount > 0) {
    const futureDates = generateRecurrenceDates(
      new Date(dueDate),
      recurrence,
      recurrenceCount
    );

    for (const date of futureDates) {
      await prisma.invoice.create({
        data: {
          userId,
          categoryId,
          description: description || null,
          amount,
          dueDate: date,
          recurrence,
          recurrenceCount: 0,
          recurrenceParentId: mainInvoice.id,
          paymentMethod: paymentMethod || null,
          pixCode: pixCode || null,
        },
      });
    }
  }

  return NextResponse.json(mainInvoice, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const invoice = await prisma.invoice.update({
    where: { id },
    data: {
      description: data.description || null,
      amount: data.amount,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      status: data.status,
      paymentMethod: data.paymentMethod || null,
      pixCode: data.pixCode || null,
      boletoFile: data.boletoFile || null,
      paidAt: data.status === "PAID" ? new Date() : null,
    },
  });

  return NextResponse.json(invoice);
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.invoice.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
