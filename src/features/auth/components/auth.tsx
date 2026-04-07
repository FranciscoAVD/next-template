"use client";
import { useAuthContext } from "@f/auth/components/auth-provider";

interface AuthProps {
  children?: React.ReactNode;
}

export function SignedIn({ children }: AuthProps) {
  const { data, isPending } = useAuthContext();
  if (isPending || !data) return null;
  return children;
}

export function SignedOut({ children }: AuthProps) {
  const { data, isPending } = useAuthContext();
  if (isPending || data) return null;
  return children;
}

export function IsAdmin({ children }: AuthProps) {
  const { data, isPending } = useAuthContext();
  if (data?.user.role !== "admin" || isPending) return null;
  return children;
}

export function AuthLoading({
  children,
  fallback,
}: AuthProps & { fallback?: React.ReactNode }) {
  const { isPending } = useAuthContext();
  return isPending ? (fallback ?? <Fallback />) : children;
}

function Fallback() {
  return (
    <div className="flex items-center gap-1">
      <div className="size-1.5 rounded-full bg-muted-foreground animate-pulse" />
      <div className="size-1.5 rounded-full bg-muted-foreground/70 animate-pulse" />
      <div className="size-1.5 rounded-full bg-muted-foreground/50 animate-pulse" />
    </div>
  );
}
