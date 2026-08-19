export function requiresEscalation(input: {
  dueAt: Date;
  escalationAt: Date;
  checkedInAt?: Date;
  now: Date;
}): boolean {
  if (input.checkedInAt && input.checkedInAt.getTime() <= input.escalationAt.getTime()) return false;
  return input.now.getTime() >= input.escalationAt.getTime();
}
