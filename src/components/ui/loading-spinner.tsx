import { cn } from "@/lib/utils";

export function LoadingSpinner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `size-6 rounded-full border-4 border-t-accent ${className}`,
      )}
    />
  );
}
