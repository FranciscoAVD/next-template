"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@c/container";
import { AuthLoading, SignedIn, SignedOut } from "@c/auth/auth";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

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
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="font-light"
        >
          Project<span className="font-semibold">Template</span>
        </Link>
        <nav className="space-x-2">
          <AuthLoading />
          <SignedIn>
            <Button asChild>
              <Link
                href="/dashboard"
                className={cn(
                  path === "/dashboard" && "text-blue-500",
                )}
              >
                Dashboard
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button
              variant="secondary"
              asChild
            >
              <Link
                href="/sign-in"
                className={cn(path === "/sign-in" && "text-blue-500")}
              >
                Sign in
              </Link>
            </Button>
          </SignedOut>
        </nav>
      </Container>
    </header>
  );
}
