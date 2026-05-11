import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <main className="h-screen grid place-content-center">
      <LoadingSpinner />
    </main>
  );
}
