export function completionSuppressesEscalation(completedAt: Date, escalationAt: Date): boolean {
  return completedAt.getTime() <= escalationAt.getTime();
}
