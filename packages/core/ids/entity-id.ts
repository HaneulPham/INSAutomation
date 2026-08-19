export type EntityId<T extends string> = string & { readonly __entity: T };

export function entityId<T extends string>(value: string): EntityId<T> {
  if (!value.trim()) throw new Error('Entity ID cannot be empty');
  return value as EntityId<T>;
}
