"use client";

import Link from "next/link";

export default function DashboardError() {
  return (
    <main className="grid place-content-center pt-18 text-center">
      <h1 className="mb-4">something went wrong</h1>
      <p>
        Click{" "}
        <Link
          href="/"
          className="text-blue-500 underline"
        >
          here
        </Link>{" "}
        to go home.
      </p>
    </main>
  );
}
