import Link from "next/link";
import { SignInForm } from "@c/auth/forms";
export default function SignIn() {
  return (
    <>
      <header>
        <Link href="/">Home</Link>
      </header>
      <main className="grid place-content-center h-screen">
        <SignInForm className="min-w-sm" />
      </main>
    </>
  );
}
