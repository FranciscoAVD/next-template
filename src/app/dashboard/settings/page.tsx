import { auth } from "@f/auth/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import {
  UpdateNameForm,
  UpdateEmailForm,
  UpdatePasswordForm,
} from "@/features/auth/components/forms";
import { ArrowLeft } from "lucide-react";

export default async function Settings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");

  return (
    <main className="pt-18 pb-24">
      <Container className="max-w-2xl space-y-8">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex gap-2 items-center text-muted-foreground mb-4"
          >
            <ArrowLeft className="size-4" /> Dashboard
          </Link>
          <h1 className="mb-2">account settings</h1>
          <p>Manage your profile and security preferences.</p>
        </div>
        <section className="space-y-8">
          <UpdateNameForm />
          <UpdateEmailForm />
          <UpdatePasswordForm />
        </section>
      </Container>
    </main>
  );
}
