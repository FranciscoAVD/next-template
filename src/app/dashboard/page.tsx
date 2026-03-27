import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  return (
    <main className="grid place-content-center pt-18">
      <h1 className="inline-flex items-center gap-2">
        <span className="font-light">dashboard</span> page
      </h1>
    </main>
  );
}
