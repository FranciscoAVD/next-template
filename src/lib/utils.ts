import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function tryCatch<T>(
  pr: Promise<T> | (() => Promise<T>),
): Promise<[Awaited<T>, null] | [null, Error]> {
  try {
    const data = await (typeof pr === "function" ? pr() : pr);
    return [data, null];
  } catch (err: unknown) {
    return [
      null,
      err instanceof Error ? err : new Error(String(err)),
    ];
  }
}
