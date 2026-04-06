import { env } from "@/env";
import { auth } from "@f/auth/lib/auth";

async function seed() {
  const res = await auth.api.createUser({
    body: {
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD,
      name: env.ADMIN_NAME,
      role: "admin",
    },
  });

  console.log(`User ${res.user.name} created with role: ${res.user.role}`);
}

seed();
