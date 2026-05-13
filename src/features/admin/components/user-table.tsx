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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@c/ui/card";
import { Button } from "@c/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Copy,
  UserKey,
  Ban,
  CircleCheckBig,
  CircleX,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserWithRole } from "better-auth/plugins";
import { toast } from "sonner";
import { useAuthContext } from "@/features/auth/components/auth-provider";
import { cn } from "@/lib/utils";
export function UserTable() {
  const session = useAuthContext();
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
              <TableHead>Actions</TableHead>
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
  const [copied, setCopied] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(0), 3000);

    return () => clearTimeout(t);
  }, [copied]);
  return (
    <TableRow
      key={user.id}
      className={className}
      {...props}
    >
      <TableCell>{user.name}</TableCell>
      <TableCell>
        <div className="flex items-center">
          {!user.emailVerified && (
            <div className="size-1.5 rounded-full bg-destructive mr-1" />
          )}
          <span className="text-ellipsis overflow-hidden w-28">
            {user.email}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="cursor-pointer"
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    await navigator.clipboard.writeText(user.email);
                    toast("Copied to clipboard");
                    setCopied(1);
                  } catch {
                    toast.error("Failed to copy to clipboard");
                    setCopied(2);
                  }
                }}
              >
                {copied === 0 ? (
                  <Copy />
                ) : !(copied >> 1) ? (
                  <CircleCheckBig className="text-lime-700" />
                ) : (
                  <CircleX className="text-destructive" />
                )}
              </Button>
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
      <TableCell>
        <div className="space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
              >
                <UserKey />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Change role</TooltipContent>
          </Tooltip>
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="destructive"
                  >
                    <Ban />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Ban</TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ban User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to ban{" "}
                  <strong>{user.name}</strong>?
                </DialogDescription>
              </DialogHeader>
              <Button variant="destructive">Ban</Button>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
