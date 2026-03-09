"use client";

import { authClient } from "@/lib/auth-client";

interface AuthProps {
  children?: React.ReactNode;
}

export function SignedIn({ children }: AuthProps) {
  const { data, isPending } = authClient.useSession();
  if (isPending || !data) return null;
  return <>{children}</>;
}

export function SignedOut({ children }: AuthProps) {
  const { data, isPending } = authClient.useSession();
  if (isPending || data) return null;
  return <>{children}</>;
}

export function AuthLoading({ children }: AuthProps) {
  const { isPending } = authClient.useSession();
  if (!isPending) return null;
  return <>{children ?? <Fallback />}</>;
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
