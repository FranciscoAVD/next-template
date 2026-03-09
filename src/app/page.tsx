import Image from "next/image";
import { SignUpForm } from "@c/auth/forms";
import vercel from "@p/vercel.svg";

export default function Home() {
  return (
    <main className="grid place-content-center pt-18">
      <h1 className="mb-2 inline-flex items-center gap-2">
        <div className="w-fit h-fit p-2 bg-black rounded-full">
          <Image
            src={vercel}
            className="size-4"
            alt="Vercel logo"
          />
        </div>
        template
      </h1>
      <p className="mb-6 text-justify text-sm text-muted-foreground">
        Built with Next.js, Better Auth, Tanstack Query, and Drizzle
        ORM.
      </p>
      <SignUpForm />
    </main>
  );
}
