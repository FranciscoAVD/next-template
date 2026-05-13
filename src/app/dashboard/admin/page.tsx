import { auth } from "@f/auth/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { UserTable } from "@/features/admin/components/user-table";
export default async function Admin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  if (session.user.role !== "admin") redirect("/dashboard");

  return (
    <main className="pt-18">
      <Container className="space-y-8 max-w-2xl">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex gap-2 items-center text-muted-foreground mb-4"
          >
            <ArrowLeft className="size-4" /> Dashboard
          </Link>
          <h1 className="mb-2">manage users</h1>
          <p>Manage user permissions and account status.</p>
        </div>
        <section>
          <UserTable />
        </section>
      </Container>
    </main>
  );
}
