"use client";
// Framework
import { useRouter } from "next/navigation";
import { useState } from "react";
// Utils
import { authClient } from "@f/auth/lib/auth-client";
import { useAuthContext } from "@f/auth/components/auth-provider";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { signUpSchema, signInSchema } from "@f/auth/lib/schemas";
// UI
import Link from "next/link";
import { Label } from "@c/ui/label";
import { Button } from "@c/ui/button";
import { Input } from "@c/ui/input";
import { LoadingSpinner } from "@c/ui/loading-spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { User, Mail, Lock, CircleCheckBig } from "lucide-react";
import { toast } from "sonner";

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
      <Button
        type="submit"
        disabled={isLoading}
      >
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
          href="/sign-up"
          className="underline text-blue-500"
        >
          Sign up
        </Link>
      </p>
      <Button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : "Sign in"}
      </Button>
    </form>
  );
}

export function UpdateNameForm() {
  const { data, isPending } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string>();
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get("name") as string;

    const res = await authClient.updateUser({
      name,
    });
    setIsLoading(false);
    if (res.error) setFormError(res.error?.message);
    else toast.success("Name updated.");
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 capitalize">
          <User className="size-4" />
          display name
        </CardTitle>
        <CardDescription>
          This is how others will see you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <FormLoading />
        ) : (
          <form
            className="grid gap-2"
            onSubmit={handleSubmit}
          >
            <Label htmlFor="update-name">Name</Label>
            <Input
              id="update-name"
              name="name"
              placeholder={data?.user.name}
              required
            />
            {formError && <FormError>{formError}</FormError>}
            <Button
              className="mt-2"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Save name"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export function UpdateEmailForm() {
  const { data, isPending } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string>();
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData(e.target as HTMLFormElement);
    const email = form.get("email") as string;

    const res = await authClient.changeEmail({
      newEmail: email,
    });

    setIsLoading(false);
    if (res.error) setFormError(res.error?.message);
    else toast.success("Email updated.");
  }
  return (
    <Card className={cn(!data?.user.emailVerified && "pb-0")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 capitalize">
          <Mail className="size-4" />
          Email address{" "}
          <span
            className={cn(
              "text-xs border rounded-full",
              !data?.user.emailVerified
                ? "px-2 py-0.5 text-blue-500 bg-blue-50 border-blue-500"
                : "text-lime-600 bg-lime-50",
            )}
          >
            {data?.user.emailVerified ? (
              <CircleCheckBig className="size-4" />
            ) : (
              "Unverified"
            )}
          </span>
        </CardTitle>
        <CardDescription>
          Update or verify your email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <FormLoading />
        ) : (
          <form
            className="grid gap-2"
            onSubmit={handleSubmit}
          >
            <Label htmlFor="update-email">Email</Label>
            <Input
              id="update-email"
              name="email"
              placeholder={data?.user.email}
              required
            />
            {formError && <FormError>{formError}</FormError>}
            <Button
              className="mt-2"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Update email"}
            </Button>
          </form>
        )}
      </CardContent>
      {!data?.user.emailVerified && (
        <CardFooter className="bg-muted py-2 border">
          <Button>Verify email</Button>
        </CardFooter>
      )}
    </Card>
  );
}
export function UpdatePasswordForm() {
  const { data, isPending } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string>();
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData(e.target as HTMLFormElement);
    const old = form.get("password-old") as string;
    const password = form.get("password-new") as string;
    const confirm = form.get("password-confirm") as string;
    if (password !== confirm) {
      setIsLoading(false);
      setFormError("Passwords do not match.");
      return;
    }
    const res = await authClient.changePassword({
      currentPassword: old,
      newPassword: password,
    });

    setIsLoading(false);
    if (res.error) setFormError(res.error?.message);
    else toast.success("Password updated.");
  }
  return (
    <Card className={cn(!data?.user.emailVerified && "pb-0")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 capitalize">
          <Lock className="size-4" />
          Password
        </CardTitle>
        <CardDescription>
          Change or reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <FormLoading />
        ) : (
          <form
            className="grid gap-2"
            onSubmit={handleSubmit}
          >
            <Label htmlFor="update-password-old">
              Current password
            </Label>
            <Input
              id="update-password-old"
              name="password-old"
              type="password"
              required
            />
            <div className="my-2 bg-muted-foreground h-0.5" />
            <Label htmlFor="update-password-new">New password</Label>
            <Input
              id="update-password-new"
              name="password-new"
              className="mb-2"
              type="password"
              required
            />
            <Label htmlFor="update-password-confirm">
              Confirm new password
            </Label>
            <Input
              id="update-password-confirm"
              name="password-confirm"
              type="password"
              required
            />
            {formError && <FormError>{formError}</FormError>}
            <Button
              className="mt-2"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Change password"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
function FormLoading() {
  return (
    <div className="grid gap-2">
      <div className="flex gap-2">
        <div className="size-3 rounded-full bg-neutral-500 animate-pulse"></div>
        <div className="size-3 rounded-full bg-neutral-500/70 animate-pulse"></div>
        <div className="size-3 rounded-full bg-neutral-500/50 animate-pulse"></div>
      </div>
      <div className="h-9 rounded-md bg-neutral-300/50 animate-pulse"></div>
      <div className="h-9 rounded-md bg-neutral-300/50 animate-pulse"></div>
    </div>
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
