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

/**
 * Determines if a path is included in an array of route strings.
 * Supports:
 * - Exact matches: "/settings"
 * - Wildcards: "/dashboard/*" (matches /dashboard and all sub-paths)
 */
export function isPathInRoutes(
  path: string,
  routes: string[],
): boolean {
  // Remove the trailing slash
  const normalizedPath =
    path.length > 1 ? path.replace(/\/$/, "") : path;

  return routes.some((route) => {
    if (route.endsWith("/*")) {
      const baseRoute = route.slice(0, -2);
      const normalizedBase =
        baseRoute.length > 1
          ? baseRoute.replace(/\/$/, "")
          : baseRoute;

      return (
        normalizedPath === normalizedBase ||
        normalizedPath.startsWith(`${normalizedBase}/`)
      );
    }

    const normalizedRoute =
      route.length > 1 ? route.replace(/\/$/, "") : route;
    return normalizedPath === normalizedRoute;
  });
}
