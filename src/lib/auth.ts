import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { db } from "@/db/index";
import { email } from "@f/mail";
import * as authSchema from "@/db/schemas/auth-schema";
import {
  ResetPasswordTemplate,
  SignUpTemplate,
} from "@f/mail/components/templates";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      email.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Email verification",
        react: ResetPasswordTemplate({ name: user.name, url }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      email.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Email verification",
        react: SignUpTemplate({ name: user.name, url }),
      });
    },
  },
  plugins: [admin()],
});
