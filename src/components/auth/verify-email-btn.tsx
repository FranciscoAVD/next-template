"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@c/ui/button";
import { toast } from "sonner";

export function VerifyEmailButton({
  email,
  callback,
}: {
  email: string;
  callback: string;
}) {
  return (
    <Button
      onClick={() => {
        authClient.sendVerificationEmail({
          email,
          callbackURL: callback,
        });
        toast(`Email sent to ${email}`);
      }}
    >
      Verify email
    </Button>
  );
}
