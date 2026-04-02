import { env } from "@/env";
import { auth } from "@/lib/auth";

async function seed() {
  await auth.api.createUser({
    body: {
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD,
      name: env.ADMIN_NAME,
      role: "admin",
    },
  });
}

seed();
