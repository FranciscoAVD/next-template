"use client";
// Utils
import { cn } from "@/lib/utils";
//Components
import Link from "next/link";
import { Container } from "@c/container";
import { Button } from "@c/ui/button";
import {
  AuthLoading,
  SignedIn,
  SignedOut,
} from "@f/auth/components/auth";
import { UserButton } from "@f/auth/components/user-btn";
import { usePathname } from "next/navigation";

export function Header({
  className,
  ...props
}: React.ComponentProps<"header">) {
  const path = usePathname();
  return (
    <header
      {...props}
      className={cn(`sticky top-0 bg-background shadow ${className}`)}
    >
      <Container className="flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-light"
        >
          Project<span className="font-semibold">Template</span>
        </Link>
        <nav className="space-x-2">
          <AuthLoading>
            <SignedIn>
              {path.includes("/dashboard") ? (
                <UserButton />
              ) : (
                <Link href="/dashboard">Dashboard</Link>
              )}
            </SignedIn>
            <SignedOut>
              <Button
                variant="secondary"
                asChild
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </SignedOut>
          </AuthLoading>
        </nav>
      </Container>
    </header>
  );
}
