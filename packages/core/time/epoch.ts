export const toEpochSeconds = (date: Date): number => Math.floor(date.getTime() / 1000);
export const fromEpochSeconds = (epoch: number): Date => new Date(epoch * 1000);
