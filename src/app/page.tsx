import Image from "next/image";
import { SignUpForm } from "@c/auth/forms";
import vercel from "@p/vercel.svg";

export default function Home() {
  return (
    <main className="grid place-content-center pt-18">
      <h1 className="inline-flex items-center gap-2">
        <span className="font-light">Home</span> page
      </h1>
    </main>
  );
}
