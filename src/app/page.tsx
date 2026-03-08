import Link from "next/link";
import { SignUpForm } from "@c/auth/forms";
export default function Home() {
  return (
    <>
      <header>
        <Link href="/dashboard">Dashboard</Link>
      </header>
      <main className="grid place-content-center h-screen">
        <SignUpForm className="min-w-sm" />
      </main>
    </>
  );
}
