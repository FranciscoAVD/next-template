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
import {
  Copy,
  Ellipse,
  ShieldUser,
  UnfoldVerticalIcon,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableCaption>A list of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Member since</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading />
            ) : (
              data?.data?.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.role === "admin" ? (
                        <ShieldUser className="size-4" />
                      ) : (
                        <User className="size-4" />
                      )}
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="w-[100px] text-ellipsis overflow-hidden">
                        {user.email}
                      </span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Copy className="size-4" />
                        </TooltipTrigger>
                        <TooltipContent>Copy email</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
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
    <>
      <TableRow>
        <TableCell
          colSpan={4}
          className="flex justify-center h-9 bg-muted"
        >
          <LoadingSpinner className="border-neutral-500 border-t-transparent" />
        </TableCell>
      </TableRow>
    </>
  );
}
