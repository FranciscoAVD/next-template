import { auth } from "@f/auth/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  return (
    <main className="grid place-content-center pt-18 text-center">
      <h1 className="mb-4">
        <span className="font-light">dashboard</span> page
      </h1>
      <p>
        Welcome, {session.user.name} &#40;
        {session.user.role ?? "user"}&#41;!
      </p>
    </main>
  );
}
