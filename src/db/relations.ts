import { defineRelations } from "drizzle-orm";
import * as authSchema from "@/db/schemas/auth-schema";
import * as schema from "@/db/schemas/schema";

export const relations = defineRelations(
  { ...authSchema, ...schema },
  (r) => ({
    user: {
      sessions: r.many.session(),
      account: r.many.account(),
    },
    session: {
      user: r.one.user({
        from: r.session.userId,
        to: r.user.id,
      }),
    },
    account: {
      user: r.one.user({
        from: r.account.userId,
        to: r.user.id,
      }),
    },
  }),
);
