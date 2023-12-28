export const exists = <T>(value: T | null | undefined): T => {
  if (value === undefined || value === null) throw new Error("Value does not exist");
  return value;
}
