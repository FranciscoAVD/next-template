"use client";

import { authClient } from "@f/auth/lib/auth-client";
import { IsAdmin } from "@f/auth/components/auth";
import { ShieldUser, Settings, User, LogOut } from "lucide-react";
import { Button } from "@c/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverContent,
} from "@c/ui/popover";
import Link from "next/link";
import { useAuthContext } from "@f/auth/components/auth-provider";
import { useRouter } from "next/navigation";

export function UserButton() {
  const { data } = useAuthContext();
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="rounded-full"
        >
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>
            {data?.user.name}{" "}
            {data?.user.role === "admin" && (
              <span className="text-muted-foreground">
                &#40;Admin&#41;
              </span>
            )}
          </PopoverTitle>
          <PopoverDescription>{data?.user.email}</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <IsAdmin>
            <Button
              variant="ghost"
              className="justify-normal font-normal"
              asChild
            >
              <Link href="/dashboard/admin">
                <ShieldUser />
                Manage users
              </Link>
            </Button>
          </IsAdmin>
          <Button
            variant="ghost"
            className="justify-normal font-normal"
            asChild
          >
            <Link href="/dashboard/settings">
              <Settings />
              Account
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="justify-normal font-normal"
            onClick={async () => {
              await authClient.signOut();
              router.push("/sign-in");
            }}
          >
            <LogOut /> Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
