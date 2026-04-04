"use client";
import { authClient } from "@f/auth/lib/auth-client";
import { Session } from "@f/auth/lib/types";
import { createContext, useContext } from "react";
const AuthContext = createContext<Session | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = authClient.useSession();
  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
}

// Internal helper to avoid code duplication
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "Auth components must be used within AuthProvider",
    );
  return context;
}
