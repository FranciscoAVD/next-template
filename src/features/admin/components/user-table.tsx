"use client";
import { authClient } from "@f/auth/lib/auth-client";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableCaption,
} from "@c/ui/table";
import { Card, CardContent } from "@c/ui/card";
import { Button } from "@c/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserWithRole } from "better-auth/plugins";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function UserTable() {
  const [currPage, setCurrPage] = useState<number>(1);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      authClient.admin.listUsers({
        query: {
          limit: 15,
          offset: (currPage - 1) * 15,
        },
      }),
  });

  return (
    <Card className="pt-0">
      <CardContent className="p-0">
        <Table>
          <TableCaption>A list of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Member since</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading />
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={4}>{error.message}</TableCell>
              </TableRow>
            ) : (
              data?.data?.users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TableLoading() {
  return (
    <TableRow>
      <TableCell
        colSpan={4}
        className="flex justify-center bg-muted"
      >
        <LoadingSpinner className="border-neutral-500 border-t-transparent" />
      </TableCell>
    </TableRow>
  );
}

interface IUserRow extends React.ComponentProps<"tr"> {
  user: UserWithRole;
}
function UserRow({ user, className, ...props }: IUserRow) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <TableRow
          key={user.id}
          className={className}
        >
          <TableCell>{user.name}</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <span className="w-[120px] text-ellipsis overflow-hidden">
                {user.email}
              </span>
              <Tooltip>
                <TooltipTrigger
                  className="cursor-pointer"
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await navigator.clipboard.writeText(user.email);
                      toast("Copied to clipboard");
                    } catch {
                      toast.error("Failed to copy to clipboard");
                    }
                  }}
                >
                  <Copy className="size-4" />
                </TooltipTrigger>
                <TooltipContent>Copy email</TooltipContent>
              </Tooltip>
            </div>
          </TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>
            {user.createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </TableCell>
        </TableRow>
      </PopoverTrigger>
      <PopoverContent align="end"></PopoverContent>
    </Popover>
  );
}
