# Project Template
Starter template for web development. Comes with 
basic authentication, middleware, and ORM setup.

## Technologies

- **Next.js** - Framework
- **Tailwind CSS** - Style System
- **Shadcn UI** - UI/UX System
- **Better Auth** - Auth system
- **Tanstack Query** - Data fetching
- **Drizzle ORM** - ORM
- **PostgreSQL** - Database
- **Zod** - Data validation
- **T3 Env** - Environment variable management


## Getting Started
1. Create a .env file (note: T3 Env will not work 
with .env.local).
2. Copy environment variables from `env.example`. 
Feel free to change values.
3. `docker compose up -d` (note: Auth will not work 
without a database). Config is defined in 
`compose.yaml`.
4. Run `bun run db:push` for migrations.
5. (Optional) `bun run db:studio` to see table 
values.

## Considerations
Project includes the beta of Drizzle ORM because of 
the updated Relations api.
