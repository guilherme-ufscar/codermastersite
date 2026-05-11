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
