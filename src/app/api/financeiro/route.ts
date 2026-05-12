import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "month";

  const now = new Date();
  let startDate: Date;

  if (period === "year") {
    startDate = new Date(now.getFullYear(), 0, 1);
  } else {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  const [revenues, expenses] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        status: "PAID",
        paidAt: { gte: startDate },
        category: { isRevenue: true },
      },
      include: { category: true },
    }),
    prisma.expense.findMany({
      where: { date: { gte: startDate } },
    }),
  ]);

  const totalRevenue = revenues.reduce(
    (sum, inv) => sum + Number(inv.amount),
    0
  );
  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return NextResponse.json({
    totalRevenue,
    totalExpenses,
    balance: totalRevenue - totalExpenses,
    revenues,
    expenses,
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { description, amount, date, recurrence, recurrenceCount, categoryName } = body;

  const expense = await prisma.expense.create({
    data: {
      description,
      amount,
      date: new Date(date),
      recurrence: recurrence || "ONE_TIME",
      recurrenceCount: recurrenceCount || 1,
      categoryName: categoryName || null,
    },
  });

  if (recurrence && recurrence !== "ONE_TIME" && recurrenceCount > 0) {
    const { generateRecurrenceDates } = await import("@/lib/recurrence");
    const futureDates = generateRecurrenceDates(
      new Date(date),
      recurrence,
      recurrenceCount
    );

    for (const futureDate of futureDates) {
      await prisma.expense.create({
        data: {
          description,
          amount,
          date: futureDate,
          recurrence,
          recurrenceCount: 0,
          recurrenceParentId: expense.id,
          categoryName: categoryName || null,
        },
      });
    }
  }

  return NextResponse.json(expense, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const expense = await prisma.expense.update({
    where: { id },
    data: {
      description: data.description,
      amount: data.amount,
      date: data.date ? new Date(data.date) : undefined,
      categoryName: data.categoryName || null,
    },
  });

  return NextResponse.json(expense);
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.expense.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
