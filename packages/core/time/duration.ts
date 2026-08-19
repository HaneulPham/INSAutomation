export const seconds = (value: number): number => value * 1_000;
export const minutes = (value: number): number => seconds(value * 60);
export const hours = (value: number): number => minutes(value * 60);
