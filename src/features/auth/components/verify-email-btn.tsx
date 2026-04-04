"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@c/ui/button";
import { toast } from "sonner";

export function VerifyEmailButton({ email }: { email: string }) {
  return (
    <Button
      onClick={() => {
        authClient.sendVerificationEmail({
          email,
          callbackURL: "http://localhost:3000/verify-email",
        });
        toast(`Email sent to ${email}`);
      }}
    >
      Verify email
    </Button>
  );
}
