export function assertOccurrenceIndex(index: number): void {
  if (!Number.isInteger(index) || index < 0) {
    throw new Error('Occurrence index must be a non-negative integer');
  }
}
