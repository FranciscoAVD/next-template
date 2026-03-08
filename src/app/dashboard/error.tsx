"use client";

import Link from "next/link";

export default function DashboardError() {
  return (
    <main>
      Something went wrong. Click <Link href="/">here</Link> to go
      home.
    </main>
  );
}
