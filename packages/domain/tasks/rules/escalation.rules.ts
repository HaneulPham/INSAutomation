export function shouldEscalate(input: {
  escalationAt: Date;
  now: Date;
  completedAt?: Date;
  suspended: boolean;
}): boolean {
  if (input.suspended || input.completedAt) return false;
  return input.now.getTime() >= input.escalationAt.getTime();
}
