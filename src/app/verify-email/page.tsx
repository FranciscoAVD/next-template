"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function VerifyEmail() {
  const params = useSearchParams();
  const error = params.get("error");
  return (
    <main className="grid place-content-center pt-18 text-center">
      <h1 className="mb-4">{error ?? "Email verified!"}</h1>
      <p>
        Head back to the{" "}
        <Link
          href="/dashboard"
          className="underline text-blue-500"
        >
          dashboard
        </Link>
      </p>
    </main>
  );
}
