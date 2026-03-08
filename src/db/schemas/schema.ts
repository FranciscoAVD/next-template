import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});
