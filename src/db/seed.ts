import { auth } from "@/lib/auth";

async function seed() {
  const userId = await auth.api.createUser({
    body: {
      email: "fvictoriano.dev@gmail.com",
      password: "Ba84116!",
      name: "Francisco",
      role: "admin",
    },
  });
}

seed();
