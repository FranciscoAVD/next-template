import { authClient } from "@f/auth/lib/auth-client";

export type Session = ReturnType<typeof authClient.useSession>;
