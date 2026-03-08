// import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas/*",
  dbCredentials: {
    url: "postgres://user:password@localhost:5432/db",
  },
});
