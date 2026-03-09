import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(`container mx-auto px-4 sm:px-0 ${className}`)}
    >
      {children}
    </div>
  );
}
