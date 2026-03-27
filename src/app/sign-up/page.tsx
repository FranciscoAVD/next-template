import Image from "next/image";
import { SignUpForm } from "@c/auth/forms";
import vercel from "@p/vercel.svg";

export default function SignUp() {
  return (
    <main className="grid place-content-center pt-18">
      <h1 className="mb-2 ">
        <span className="font-light">Sign up</span> page
      </h1>
      <p className="mb-6 text-justify text-sm text-muted-foreground">
        Built with Next.js, Better Auth, Tanstack Query, and Drizzle
        ORM.
      </p>
      <SignUpForm />
    </main>
  );
}
