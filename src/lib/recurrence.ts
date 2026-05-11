import { RecurrenceType } from "@prisma/client";

export function getNextDueDate(
  currentDate: Date,
  recurrence: RecurrenceType
): Date | null {
  if (recurrence === "ONE_TIME") return null;

  const next = new Date(currentDate);
  if (recurrence === "MONTHLY") {
    next.setMonth(next.getMonth() + 1);
  } else if (recurrence === "ANNUAL") {
    next.setFullYear(next.getFullYear() + 1);
  }
  return next;
}

export function generateRecurrenceDates(
  startDate: Date,
  recurrence: RecurrenceType,
  count: number
): Date[] {
  if (recurrence === "ONE_TIME" || count <= 0) return [];

  const dates: Date[] = [];
  let current = new Date(startDate);

  for (let i = 0; i < count; i++) {
    const next = getNextDueDate(current, recurrence);
    if (!next) break;
    dates.push(next);
    current = next;
  }

  return dates;
}
