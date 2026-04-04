"use client";
import { authClient } from "@f/auth/lib/auth-client";
import { Settings, User, LogOut } from "lucide-react";
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
import { useAuthContext } from "./auth-provider";
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
          <PopoverTitle>{data?.user.name}</PopoverTitle>
          <PopoverDescription>{data?.user.email}</PopoverDescription>
        </PopoverHeader>
        <Button
          variant="ghost"
          className="justify-normal font-normal"
          asChild
        >
          <Link href="/dashboard/settings">
            <Settings />
            Settings
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
      </PopoverContent>
    </Popover>
  );
}
