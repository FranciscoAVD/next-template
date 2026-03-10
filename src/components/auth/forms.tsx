"use client";
// Framework
import { useRouter } from "next/navigation";
import { useState } from "react";
// Utils
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { cn } from "@/lib/utils";
// UI
import Link from "next/link";
import { Label } from "@c/ui/label";
import { Button } from "@c/ui/button";
import { Input } from "@c/ui/input";
import { LoadingSpinner } from "@c/ui/loading-spinner";
import { toast } from "sonner";

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
});
const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<
    | z.core.$ZodErrorTree<z.infer<typeof signUpSchema>>["properties"]
    | undefined
  >();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const parse = signUpSchema.safeParse({ name, email, password });
    if (!parse.success) {
      setIsLoading(false);
      setFormErrors(z.treeifyError(parse.error).properties);
    } else {
      await authClient.signUp.email(parse.data, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          setFormErrors(undefined);
          toast.success("Signed in");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error("Sign up failed.", {
            description: ctx.error.message,
          });
        },
      });
    }
  }

  return (
    <form
      className={cn(`grid gap-4 ${className}`)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="space-y-2">
        <Label htmlFor="signup-name">Name</Label>
        <Input
          id="signup-name"
          name="name"
          type="text"
          placeholder="John Doe"
        />
        {formErrors?.name && (
          <FormError>{formErrors.name.errors[0]}</FormError>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          name="email"
          placeholder="john.doe@example.com"
        />
        {formErrors?.email && (
          <FormError>{formErrors.email.errors[0]}</FormError>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          name="password"
          type="password"
        />
        {formErrors?.password && (
          <FormError>{formErrors.password.errors[0]}</FormError>
        )}
      </div>
      <p className="text-sm">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="underline text-blue-500"
        >
          Sign in
        </Link>
      </p>
      <Button type="submit">
        {isLoading ? <LoadingSpinner /> : "Sign up"}
      </Button>
    </form>
  );
}

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<
    | z.core.$ZodErrorTree<z.infer<typeof signUpSchema>>["properties"]
    | undefined
  >();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const parse = signInSchema.safeParse({ email, password });
    if (!parse.success) {
      setIsLoading(false);
      setFormErrors(z.treeifyError(parse.error).properties);
    } else {
      await authClient.signIn.email(parse.data, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          setFormErrors(undefined);
          toast.success("Signed in");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error("Sign in failed.", {
            ...(ctx.error.message && {
              description: ctx.error.message,
            }),
          });
        },
      });
    }
  }

  return (
    <form
      className={cn(`grid gap-4 ${className}`)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          name="email"
          placeholder="john.doe@example.com"
        />
        {formErrors?.email && (
          <FormError>{formErrors.email.errors[0]}</FormError>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          name="password"
          type="password"
        />
        {formErrors?.password && (
          <FormError>{formErrors.password.errors[0]}</FormError>
        )}
      </div>
      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/"
          className="underline text-blue-500"
        >
          Sign up
        </Link>
      </p>
      <Button type="submit">
        {isLoading ? <LoadingSpinner /> : "Sign in"}
      </Button>
    </form>
  );
}
function FormError({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(`text-destructive text-sm ${className}`)}
    >
      {children}
    </p>
  );
}
